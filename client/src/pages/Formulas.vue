<template>
  <div>
    <header-component></header-component>
    <v-container class="mt-3">
      <v-layout>
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
                maxlength="100"
                counter
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
              no-results-text="Формулы не найдены"
            >
              <template slot="no-data">
                <v-alert :value="true" color="info" icon="info" outline>
                  Ни одной формулы не создано.
                </v-alert>
              </template>
              <template slot="items" slot-scope="props">
                <tr :key="props.item._id" @click.prevent="openFormula(props.item._id)">
                  <td>{{ props.item.name }}</td>
                  <td>{{ dateFormat(props.item.createDate) }}</td>
                  <td class="justify-center layout">
                    <formula-component
                      :showFormulaDialog = 'formulasDialogOptions[props.item._id]'
                      :formulaParams = 'props.item'
                      @updateFormulasList="updateFormulasList"
                      @userNotConfirmMail="userNotConfirmMail"
                      @openFormula = 'openFormula($event)'
                      @closeFormula = 'closeFormula($event)'
                    ></formula-component>
                    <v-btn color="error" @click="removeFormulaQuestion(props.item._id, props.item.name)">
                      <v-icon small>
                        delete
                      </v-icon>
                    </v-btn>
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
    <formula-component
      :showFormulaDialog = 'formulasDialogOptions.newFormula'
      @updateFormulasList="updateFormulasList"
      @userNotConfirmMail="userNotConfirmMail"
      @userNotPremium="userNotPremium"
      @openFormula = 'openFormula($event)'
      @closeFormula = 'closeFormula($event)'
    ></formula-component>
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
            @click="removeFormula(deleteDialogId, deleteDialogName)"
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
  import Vue from 'vue';
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
        deleteDialogName: '',
        formulasDialogOptions: {}
      };
    },
    computed: {
      formulasList() {
        return this.$store.getters['formulas/list'];
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
            this.updateFormulasList();
          }
        },
        deep: true
      }
    },
    methods: {
      async updateFormulasList() {
        await this.$store.dispatch('formulas/getFormulas', this.pagination);

        for (let formula of this.$store.getters['formulas/list']) {
          console.log(formula);
          Vue.set(this.formulasDialogOptions, formula._id, false);
        }
        Vue.set(this.formulasDialogOptions, 'newFormula', false);
      },
      removeFormulaQuestion(id, name) {
        this.deleteDialogId = id;
        this.deleteDialogName = name;
        this.deleteDialog = true;
      },
      async removeFormula(id, name) {
        await this.$store.dispatch('formulas/removeFormula', id);
        await this.$store.dispatch('formulas/getFormulas', this.pagination);

        this.deleteDialog = false;
        this.userRules = true;
        this.userRulesStatus = 'info';
        this.userRulesText = `Формула ${name} удалёна.`;
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
      },
      dateFormat(date) {
        return moment(date).format('DD.MM.YYYY HH:mm');
      },
      openFormula(id) {
        this.formulasDialogOptions[id] = true;
      },
      closeFormula(id) {
        this.formulasDialogOptions[id] = false;
      }
    }
  };
</script>

<style scoped>

</style>
