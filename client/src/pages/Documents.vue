<template>
  <div>
    <header-component>
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
                  Документы
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
                  Данные для отображения недоступны.
                </v-alert>
              </template>
              <template slot="items" slot-scope="props">
                <tr :key="props.item._id">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.createDate }}</td>
                  <td class="justify-center layout">
                    <document-component
                      :documentParams = 'props.item'
                      @updateDocumentsList="updateDocumentsList"
                      @userNotConfirmMail="userNotConfirmMail"
                    ></document-component>
                    <v-btn color="error" @click="removeDocument(props.item._id)">
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
  </div>
</template>

<script>
  import headerComponent from '../components/Header';
  import documentComponent from '../components/Document';
  import moment from 'moment';

  export default {
    created() {
      this.$store.commit('setCatalogSelected');
      this.pagination.catalogSelected = this.$store.getters.catalogSelected;
    },
    async beforeMount() {
      this.$store.commit('setBreadcrumbs', {
        add: true,
        clear: true,
        item: {
          text: 'Документы',
          disabled: false,
          href: '/documents'
        }
      });
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
        userRulesText: ''
      };
    },
    computed: {
      breadcrumbs() {
        return this.$store.getters.breadcrumbs;
      },
      documentsList() {
        let list = JSON.parse(JSON.stringify(this.$store.getters['documents/list']));

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
      }
    },
    watch: {
      pagination: {
        async handler() {
          if (this.$store.getters.serverStatus) {
            await this.$store.dispatch('documents/getDocuments', this.pagination);
          }
        },
        deep: true
      }
    },
    methods: {
      async removeDocument(id) {
        if (!confirm('Вы уверены, что хотите удалить документ?')) {
          return false;
        }
        await this.$store.dispatch('documents/removeDocument', id);
        await this.$store.dispatch('documents/getDocuments', this.pagination);
      },
      async updateDocumentsList() {
        await this.$store.dispatch('documents/getDocuments', this.pagination);
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
      }
    }
  };
</script>

<style scoped>

</style>
