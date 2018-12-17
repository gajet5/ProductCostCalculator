<template>
  <div>
    <lock-screen-component></lock-screen-component>
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
                v-model="search"
                append-icon="search"
                label="Поиск"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="formulasHeaders"
              :items="formulasList"
              :search="search"
              rows-per-page-text="Формул на страницу"
              :rows-per-page-items="rowsPerPageItems"
              :loading="loading"
              :pagination.sync="pagination"
              :total-items="totalCount"
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
                    <formula-component :functionParams = 'props.item'></formula-component>
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
    <formula-component></formula-component>
  </div>
</template>

<script>
  import lockScreenComponent from '../components/LockScreen';
  import headerComponent from '../components/Header';
  import formulaComponent from '../components/Formula';
  import moment from 'moment';

  export default {
    async beforeMount() {
      await this.$store.dispatch('getServerStatus');
      await this.$store.dispatch('getTokenStatus');
      await this.$store.dispatch('formulas/getFormulas');

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
      lockScreenComponent,
      formulaComponent
    },
    data() {
      return {
        search: '',
        formulasHeaders: [
          { text: 'Имя', value: 'name' },
          { text: 'Дата создания', value: 'createDate' },
          { text: 'Действия', value: 'name', sortable: false }
        ],
        rowsPerPageItems: [ 10, 20, 30, {
          'text': 'Все',
          'value': -1
        }],
        pagination: {}
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
      totalCount() {
        return this.$store.getters['formulas/totalCount'];
      },
      loading() {
        return this.$store.getters['formulas/loading'];
      }
    },
    methods: {
      async removeFormula(id) {
        await this.$store.dispatch('formulas/removeFormula', id);
      }
    }
  };
</script>

<style scoped>

</style>
