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
                  Формулы
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
              :headers="formulasHeaders"
              :items="formulasList"
              :pagination.sync="pagination"
              :total-items="totalItems"
              rows-per-page-text="Формул на страницу"
              :rows-per-page-items="rowsPerPageItems"
              :loading="loading"
            >
              <template slot="no-data">
                <v-alert :value="true" color="info" icon="info" outline>
                  Ни одной формулы не создано.
                </v-alert>
              </template>
              <template slot="items" slot-scope="props">
                <tr :key="props.item._id">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.createDate }}</td>
                  <td class="justify-center layout">
                    <formula-component
                      :formulaParams = 'props.item'
                      @updateFormulasList="updateFormulasList"
                      @userNotConfirmMail="userNotConfirmMail"
                    ></formula-component>
                    <v-btn color="error" @click="removeFormula(props.item._id)">
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
    <formula-component
      @updateFormulasList="updateFormulasList"
      @userNotConfirmMail="userNotConfirmMail"
      @userNotPremium="userNotPremium"
    ></formula-component>
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
  import formulaComponent from '../components/Formula';
  import moment from 'moment';

  export default {
    components: {
      headerComponent,
      formulaComponent
    },
    data() {
      return {
        formulasHeaders: [
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
        return this.$route.meta.breadcrumb;
      },
      formulasList() {
        let list = JSON.parse(JSON.stringify(this.$store.getters['formulas/list']));

        for (let item of list) {
          item.createDate = moment(item.createDate).format('DD.MM.YYYY HH:mm');
        }

        return list;
      },
      totalItems() {
        return this.$store.getters['formulas/totalItems'];
      },
      loading() {
        return this.$store.getters['formulas/loading'];
      }
    },
    watch: {
      pagination: {
        async handler() {
          if (this.$store.getters.serverStatus) {
            await this.$store.dispatch('formulas/getFormulas', this.pagination);
          }
        },
        deep: true
      }
    },
    methods: {
      async removeFormula(id) {
        if (!confirm('Вы уверены, что хотите удалить формулу?')) {
          return false;
        }
        await this.$store.dispatch('formulas/removeFormula', id);
        await this.$store.dispatch('formulas/getFormulas', this.pagination);
      },
      async updateFormulasList() {
        await this.$store.dispatch('formulas/getFormulas', this.pagination);
      },
      userNotConfirmMail() {
        this.userRules = true;
        this.userRulesStatus = 'warning';
        this.userRulesText = 'Email не поддтверждён, функционал ограничен.';
      },
      userNotPremium() {
        this.userRules = true;
        this.userRulesStatus = 'info';
        this.userRulesText = 'В демо режиме допускается создание одной формулы.';
      }
    }
  };
</script>

<style scoped>

</style>
