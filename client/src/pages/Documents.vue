<template>
  <div>
    <header-component>
      <v-tooltip bottom>
        <v-btn
          slot="activator"
          color="primary"
          dark
          @click="goToFormulas"
        >
          Формулы
        </v-btn>
        <span>Перейти к созданию формул</span>
      </v-tooltip>
    </header-component>
    <v-container>
      <v-layout>
        <v-flex>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </v-flex>
      </v-layout>
      <v-layout class="mt-3">
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  {{ catalogName }}
                </h3>
              </div>
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Поиск"
                single-line
                hide-details
                v-model="pagination.search"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="documentsHeaders"
              :items="documentsList"
              :pagination.sync="pagination"
              :total-items="totalItems"
              rows-per-page-text="Документов на страницу"
              :rows-per-page-items="rowsPerPageItems"
              :loading="loading"
            >
              <template slot="no-data">
                <v-alert :value="true" color="info" icon="info" outline>
                  Ни одного документа не создано.
                </v-alert>
              </template>
              <template slot="items" slot-scope="props">
                <tr :key="props.item._id">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.createDate }}</td>
                  <td>{{ props.item.totalCount }}</td>
                  <td class="justify-center layout">
                    <document-component
                      :documentParams = 'props.item'
                      @updateDocumentsList="updateDocumentsList"
                      @userNotConfirmMail="userNotConfirmMail"
                    ></document-component>
                    <v-btn color="error" @click="removeDocumentQuestion(props.item._id, props.item.name)">
                      <v-icon small>
                        delete
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <document-component
      @updateDocumentsList="updateDocumentsList"
      @userNotConfirmMail="userNotConfirmMail"
      @userNotPremium="userNotPremium"
    ></document-component>
    <v-snackbar
      v-model="userRules"
      :color="userRulesStatus"
      :timeout="6000"
    >
      {{ userRulesText }}
      <v-btn
        dark
        flat
        @click="userRules = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
    <v-dialog
      v-model="deleteDialog"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline yellow"
        >
          <v-icon large class="mr-1" color="red">
            warning
          </v-icon>
          Удалить документ?
        </v-card-title>
        <v-card-text>
          Вы собираетесь удалить документ: <b>{{ deleteDialogName }}</b>.<br>
          Удаляем?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="removeDocument(deleteDialogId, deleteDialogName)"
          >
            ОК
          </v-btn>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="deleteDialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';
  import documentComponent from '../components/Document';
  import moment from 'moment';

  export default {
    created() {
      this.$store.commit('documents/setCatalogId');
      if (!this.$store.getters['documents/catalogId']) {
        this.$router.push('/catalogs');
        return;
      }
      this.pagination.catalogId = this.$store.getters['documents/catalogId'];
    },
    components: {
      headerComponent,
      documentComponent
    },
    data() {
      return {
        documentsHeaders: [
          { text: 'Имя', value: 'name' },
          { text: 'Дата создания', value: 'createDate' },
          { text: 'Сумма', value: 'totalCount', sortable: false },
          { text: 'Действия', value: 'name', sortable: false }
        ],
        rowsPerPageItems: [10, 20, 30, 50],
        pagination: {
          sortBy: 'createDate',
          descending: false,
          search: ''
        },
        userRules: false,
        userRulesStatus: '',
        userRulesText: '',
        deleteDialog: false,
        deleteDialogId: '',
        deleteDialogName: ''
      };
    },
    computed: {
      breadcrumbs() {
        return this.$route.meta.breadcrumb;
      },
      documentsList() {
        let list = JSON.parse(JSON.stringify(this.$store.getters['documents/documents']));

        for (let item of list) {
          item.createDate = moment(item.createDate).format('DD.MM.YYYY HH:mm');
        }

        return list;
      },
      totalItems() {
        return this.$store.getters['documents/totalItems'];
      },
      loading() {
        return this.$store.getters['documents/loading'];
      },
      catalogName() {
        return this.$store.getters['documents/catalogName'];
      }
    },
    watch: {
      pagination: {
        async handler() {
          if (this.$store.getters.serverStatus) {
            await this.updateDocumentsList();
          }
        },
        deep: true
      }
    },
    methods: {
      removeDocumentQuestion(id, name) {
        this.deleteDialogId = id;
        this.deleteDialogName = name;
        this.deleteDialog = true;
      },
      async removeDocument(id, name) {
        await this.$store.dispatch('documents/removeDocument', id);
        await this.getDocuments();

        this.deleteDialog = false;
        this.userRules = true;
        this.userRulesStatus = 'info';
        this.userRulesText = `Документ ${name} удалён.`;
      },
      async updateDocumentsList() {
        await this.$store.dispatch('documents/getPositions');
        await this.$store.dispatch('formulas/getFormulasName');
        await this.getDocuments();
      },
      userNotConfirmMail() {
        this.userRules = true;
        this.userRulesStatus = 'warning';
        this.userRulesText = 'Email не поддтверждён, функционал ограничен.';
      },
      userNotPremium() {
        this.userRules = true;
        this.userRulesStatus = 'info';
        this.userRulesText = 'В демо режиме допускается создание одного документа.';
      },
      async getDocuments() {
        await this.$store.dispatch('documents/getDocuments', this.pagination);
      },
      goToFormulas() {
        this.$router.push('/formulas');
      }
    }
  };
</script>

<style scoped>

</style>
