<template>
  <v-dialog v-model="addFormula" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn slot="activator" color="primary" dark>Добавить</v-btn>
    <v-card>
      <v-toolbar dark color="indigo darken-1">
        <v-btn icon dark @click="addFormula = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Настройки</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="addFormula = false">Сохранить</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-layout>
          <v-flex>
            <h2 class="mb-2">Название</h2>
            <v-text-field
              label="Название формулы"
              solo
            ></v-text-field>
            <h2 class="mb-2">Формула</h2>
            <v-card class="grey lighten-3 pa-3" @click="focusInputFormula">
              <span>= </span>{{ formula }}
            </v-card>
            <input type="text" ref="formula" v-model="formula" class="hidden">
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        formula: '',
        addFormula: false
      };
    },
    methods: {
      focusInputFormula() {
        this.$refs.formula.focus();
      }
    }
  };
</script>

<style scoped>
  .hidden {
    position: absolute;
    left: -1000px;
  }
</style>
