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
            <v-card class="grey lighten-3 pa-3">
              <span>= </span>{{ formula }}
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout class="ma-2">
          <v-spacer></v-spacer>
          <v-btn fab dark small color="primary">
            <v-icon dark>add</v-icon>
          </v-btn>
          <v-btn fab dark small color="primary">
            <v-icon dark>remove</v-icon>
          </v-btn>
          <v-btn fab dark small color="primary">
            <v-icon dark>*</v-icon>
          </v-btn>
          <v-btn fab dark small color="primary">
            <v-icon dark class="btn-possition-fix">/</v-icon>
          </v-btn>
          <v-btn fab dark small color="primary">
            <v-icon dark class="btn-possition-fix">(</v-icon>
          </v-btn>
          <v-btn fab dark small color="primary">
            <v-icon dark class="btn-possition-fix">)</v-icon>
          </v-btn>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-card>
              <v-card-title>Операнды</v-card-title>
              <v-layout wrap v-for="(item, index) in operands" :key="index">
                <v-flex sm2>
                  <span>{{ item.letter }}</span>
                </v-flex>
                <v-flex sm10>
                  <v-text-field
                    label="Имя"
                    box
                    v-model="item.name"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-btn flat color="primary" @click="addOperand" :disabled="limitVariations">Добавить</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import getLetter from '../helper/getLetter';

  export default {
    data() {
      return {
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        usedLetters: [],
        operands: [],
        formula: '',
        addFormula: false,
        limitVariations: false
      };
    },
    methods: {
      addOperand() {
        if (this.letters.length * this.letters.length === this.usedLetters.length) {
          return false;
        }

        let letter = getLetter(this.usedLetters, this.letters);
        this.usedLetters.push(letter);

        this.operands.push({
          letter,
          name: ''
        });
      }
    }
  };
</script>

<style scoped>
  .btn-possition-fix {
    position: relative;
    top: -4px;
    left: -1px;
  }
</style>
