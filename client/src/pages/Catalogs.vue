<template>
  <div>
    <header-component></header-component>
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
                  Каталоги
                </h3>
              </div>
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Поиск"
                single-line
                hide-details
                v-model="pagination.search"
                maxlength="100"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="catalogsHeaders"
              :items="catalogsList"
              :pagination.sync="pagination"
              :total-items="totalItems"
              rows-per-page-text="Каталогов на страницу"
              :rows-per-page-items="rowsPerPageItems"
              :loading="loading"
              no-results-text="Каталоги не найдены"
            >
              <template slot="no-data">
                <v-alert :value="true" color="info" icon="info" outline>
                  Ни одного каталога не создано.
                </v-alert>
              </template>
              <template slot="items" slot-scope="props">
                <tr :key="props.item._id" @click.stop="goToCatalog(props.item._id)">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.createDate }}</td>
                  <td>
                    <div class="hidden-md-and-up">
                      <v-menu @click.native.stop>
                        <v-btn
                          slot="activator"
                          icon
                        >
                          <v-icon>more_vert</v-icon>
                        </v-btn>
                        <v-btn color="success" @click.stop="goToCatalog(props.item._id)">
                          <v-icon small>
                            input
                          </v-icon>
                        </v-btn>
                        <catalog-component
                          :catalogParams = 'props.item'
                          @updateCatalogsList="updateCatalogsList"
                          @userNotConfirmMail="userNotConfirmMail"
                        ></catalog-component>
                        <v-btn color="error" @click.stop="removeCatalogQuestion(props.item._id, props.item.name)">
                          <v-icon small>
                            delete
                          </v-icon>
                        </v-btn>
                      </v-menu>
                    </div>
                    <div class="hidden-sm-and-down">
                      <v-btn color="success" @click.stop="goToCatalog(props.item._id)">
                        <v-icon small>
                          input
                        </v-icon>
                      </v-btn>
                      <catalog-component
                        :catalogParams = 'props.item'
                        @updateCatalogsList="updateCatalogsList"
                        @userNotConfirmMail="userNotConfirmMail"
                      ></catalog-component>
                      <v-btn color="error" @click.stop="removeCatalogQuestion(props.item._id, props.item.name)">
                        <v-icon small>
                          delete
                        </v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </template>
              <template slot="pageText" slot-scope="props">
                {{ props.pageStart }}-{{ props.pageStop }} из {{ props.itemsLength }}
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <catalog-component
      @updateCatalogsList="updateCatalogsList"
      @userNotConfirmMail="userNotConfirmMail"
      @userNotPremium="userNotPremium"
    ></catalog-component>
    <v-snackbar
      v-model="userRules"
      :color="userRulesStatus"
      :timeout="3000"
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
          Удалить каталог?
        </v-card-title>
        <v-card-text>
          Вы собираетесь удалить каталог: <b>{{ deleteDialogName }}</b>.<br>
          Удаляем?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="removeCatalog(deleteDialogId, deleteDialogName)"
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
  import catalogComponent from '../components/Catalog';
  import moment from 'moment';

  export default {
    components: {
      headerComponent,
      catalogComponent
    },
    data() {
      return {
        catalogsHeaders: [
          { text: 'Имя', value: 'name' },
          { text: 'Создано', value: 'createDate' },
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
      catalogsList() {
        let list = JSON.parse(JSON.stringify(this.$store.getters['catalogs/list']));

        for (let item of list) {
          item.createDate = moment(item.createDate).format('DD.MM.YYYY HH:mm');
        }

        return list;
      },
      totalItems() {
        return this.$store.getters['catalogs/totalItems'];
      },
      loading() {
        return this.$store.getters['catalogs/loading'];
      }
    },
    watch: {
      pagination: {
        async handler() {
          if (this.$store.getters.serverStatus) {
            await this.$store.dispatch('catalogs/getCatalogs', this.pagination);
          }
        },
        deep: true
      }
    },
    methods: {
      removeCatalogQuestion(id, name) {
        this.deleteDialogId = id;
        this.deleteDialogName = name;
        this.deleteDialog = true;
      },
      async removeCatalog(id, name) {
        await this.$store.dispatch('catalogs/removeCatalog', id);
        await this.$store.dispatch('catalogs/getCatalogs', this.pagination);
        this.$store.commit('documents/setCatalogId', 'delete');

        this.deleteDialog = false;
        this.userRules = true;
        this.userRulesStatus = 'info';
        this.userRulesText = `Каталог ${name} удалён.`;
      },
      async updateCatalogsList() {
        await this.$store.dispatch('catalogs/getCatalogs', this.pagination);
      },
      userNotConfirmMail() {
        this.userRules = true;
        this.userRulesStatus = 'warning';
        this.userRulesText = 'Email не поддтверждён, функционал ограничен.';
      },
      userNotPremium() {
        this.userRules = true;
        this.userRulesStatus = 'info';
        this.userRulesText = 'В демо режиме допускается создание одного каталога.';
      },
      goToCatalog(id) {
        this.$store.commit('documents/setCatalogId', id);
        this.$router.push('/documents');
      }
    }
  };
</script>

<style scoped>
  .v-menu__content {
    background-color: #fff;
  }
</style>
