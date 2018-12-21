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
      <v-layout>
        <v-flex>
          <v-alert
            :value="!shopWarningEmailConfirm"
            type="warning"
          >
            Email не поддтверждён, часть функционала недоступно.
          </v-alert>
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
                  Данные для отображения недоступны.
                </v-alert>
              </template>
              <template slot="items" slot-scope="props">
                <tr :key="props.item._id">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.createDate }}</td>
                  <td class="justify-center layout">
                    <formula-component
                      :functionParams = 'props.item'
                      @updateFormulasList="updateFormulasList"
                    ></formula-component>
                    <v-btn color="error">
                      <v-icon small @click="removeFormula(props.item._id)">
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
    <formula-component @updateFormulasList="updateFormulasList"></formula-component>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';
  import formulaComponent from '../components/Formula';
  import moment from 'moment';

  export default {
    async beforeMount() {
      this.$store.commit('setBreadcrumbs', {
        add: true,
        item: {
          text: 'Формулы',
          disabled: true,
          href: '/formulas'
        }
      });
    },
    beforeDestroy() {
      this.$store.commit('setBreadcrumbs', {
        remove: true
      });
    },
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
        }
      };
    },
    computed: {
      breadcrumbs() {
        return this.$store.getters.breadcrumbs;
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
      },
      shopWarningEmailConfirm() {
        return this.$store.getters['user/isActiveted'];
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
        await this.$store.dispatch('formulas/removeFormula', id);
        await this.$store.dispatch('formulas/getFormulas', this.pagination);
      },
      async updateFormulasList() {
        await this.$store.dispatch('formulas/getFormulas', this.pagination);
      }
    }
  };
</script>

<style scoped>

</style>
