<template>
  <v-dialog
    v-model="showCatalogDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-btn
      slot="activator"
      class="v-btn"
      color="warning"
      v-if="catalogParams"
      @click.stop="userRules"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn
      slot="activator"
      color="indigo darken-1"
      class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right"
      v-else
      dark
      @click.stop="userRules"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar dark color="indigo darken-1">
        <v-btn icon dark @click="showCatalogDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="save" :disabled="!nameValid">Сохранить</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-layout>
          <v-flex>
            <h2 class="mb-2">Название</h2>
            <v-form v-model="nameValid">
              <v-text-field
                label="Название каталога"
                solo
                v-model="catalogName"
                required
                :rules="nameRules"
              ></v-text-field>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    created() {
      if (!this.catalogParams) {
        return false;
      }

      this.catalogId = this.catalogParams._id;
      this.catalogName = this.catalogParams.name;
    },
    props: ['catalogParams'],
    data() {
      return {
        catalogId: '',
        showCatalogDialog: false,
        catalogName: '',
        nameRules: [
          v => !!v || 'Имя должено быть указано',
          v => /^[\w\dа-яА-Я .\-ё]{3,}$/.test(v) || 'Имя должено быть валидным'
        ],
        nameValid: false
      };
    },
    methods: {
      userRules() {
        if (!this.$store.getters['user/isActiveted']) {
          this.$emit('userNotConfirmMail');
          return false;
        }

        if (!this.$store.getters['user/premium'] && this.$store.getters['catalogs/totalItems'] >= 1 && !this.catalogParams) {
          this.$emit('userNotPremium');
          return false;
        }

        this.showCatalogDialog = true;
      },
      async save() {
        await this.$store.dispatch('getServerStatus');
        await this.$store.dispatch('getTokenStatus');

        if (!this.$store.getters.serverStatus) {
          return false;
        }

        if (this.catalogId) {
          await this.$store.dispatch('catalogs/editCatalog', {
            id: this.catalogId,
            name: this.catalogName
          });
          this.showCatalogDialog = false;
        } else {
          await this.$store.dispatch('catalogs/addCatalog', {
            name: this.catalogName
          });
          this.showCatalogDialog = false;
          this.catalogName = '';
        }
        this.$emit('updateCatalogsList');
      }
    }
  };
</script>

<style scoped>

</style>
