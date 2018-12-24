<template>
  <v-dialog
    v-model="showDocumentDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-btn
      slot="activator"
      class="v-btn"
      color="warning"
      v-if="documentParams"
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
        <v-btn icon dark @click="showDocumentDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Настройки</v-toolbar-title>
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
                v-model="documentName"
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
      if (!this.documentParams) {
        return false;
      }

      this.documentId = this.documentParams._id;
      this.documentName = this.documentParams.name;
    },
    props: ['documentParams'],
    data() {
      return {
        documentId: '',
        showDocumentDialog: false,
        documentName: '',
        nameRules: [
          v => !!v || 'Имя должено быть указано',
          v => /^[\w\dа-яА-Я .\-ё#№]{3,}$/.test(v) || 'Имя должено быть валидным'
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

        if (!this.$store.getters['user/premium'] && this.$store.getters['documents/totalItems'] >= 1 && !this.documentParams) {
          this.$emit('userNotPremium');
          return false;
        }

        this.showDocumentDialog = true;
      },
      async save() {
        await this.$store.dispatch('getServerStatus');
        await this.$store.dispatch('getTokenStatus');

        if (!this.$store.getters.serverStatus) {
          return false;
        }

        if (this.documentId) {
          await this.$store.dispatch('documents/editDocument', {
            id: this.documentId,
            name: this.documentName
          });
          this.showDocumentDialog = false;
        } else {
          await this.$store.dispatch('documents/addDocument', {
            catalogId: this.$store.getters.catalogSelected,
            name: this.documentName
          });
          this.showDocumentDialog = false;
          this.documentName = '';
        }
        this.$emit('updateDocumentsList');
      }
    }
  };
</script>

<style scoped>

</style>
