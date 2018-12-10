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
              <formula-component></formula-component>
            </v-card-title>
            <v-data-table
              :headers="formulasHeaders"
              :items="formulasList"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.createDate }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
        formulasHeaders: [
          { text: 'Имя', value: 'name' },
          { text: 'Дата создания', value: 'createDate' }
        ]
      };
    },
    computed: {
      breadcrumbs() {
        return this.$store.getters.breadcrumbs;
      },
      formulasList() {
        let list = this.$store.getters['formulas/list'];

        for (let item of list) {
          item.createDate = moment(item.createDate).format('DD.MM.YYYY HH:mm');
        }

        return list;
      }
    }
  };
</script>

<style scoped>

</style>
