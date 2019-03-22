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
      fab
      fixed
      bottom
      right
      v-else
      dark
      @click.stop="userRules"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar dark color="indigo darken-1">
        <v-btn icon dark @click="close">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Всего: {{ moneyFormat(totalCount) }}</v-toolbar-title>
      </v-toolbar>
      <v-container grid-list-md>
        <v-layout>
          <v-flex>
            <h2 class="mb-2">Название</h2>
            <v-form v-model="nameValid" @submit.prevent="save">
              <v-text-field
                label="Название документа"
                solo
                v-model="documentName"
                @keydown="haveChange = true"
                required
                :rules="nameRules"
                maxlength="100"
                counter
              ></v-text-field>
            </v-form>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex sm12 md6>
            <v-card>
              <v-card-title>
                Позиция
              </v-card-title>
              <v-card-text>
                <v-combobox
                  v-model="positionSelected"
                  :items="positionsList"
                  color="indigo darken-1"
                  placeholder="Выберите позицию или введите свою."
                  item-text="name"
                  item-value="_id"
                  maxlength="50"
                  counter
                  :menu-props="{ value: comboboxVisible }"
                  @click="comboboxVisible = !comboboxVisible"
                >
                  <template
                    slot="item"
                    slot-scope="{ item }"
                  >
                    <v-list-tile-content>
                      {{ item.name }}
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-list-tile-action>
                      <v-btn
                        icon
                        @click.stop="deletePositionsQuestion(item._id, item.name)"
                      >
                        <v-icon color="red">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </template>
                </v-combobox>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex sm12 md6>
            <v-card>
              <v-card-title>
                Формула
              </v-card-title>
              <v-card-text>
                <v-autocomplete
                  v-model="formulaSelected"
                  :items="formulasName"
                  item-text="name"
                  return-object
                  color="indigo darken-1"
                  placeholder="Выберите формулу."
                >
                </v-autocomplete>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex sm12>
            <v-btn
              outline
              block
              color="success"
              :disabled="addOptionsBtn"
              @click="addOptions"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card v-for="(item, itemIndex) in options" :key="itemIndex" class="mb-2">
              <template v-if="item.new">
                <v-card-title primary-title>
                  <h3 class="headline mb-0">{{ item.position }}</h3>
                  <v-spacer></v-spacer>
                  <div v-show="showAdditionalItem(item)">
                    <h4 class="headline mb-0">
                      <span class="grey--text font-weight-light caption text-lowercase">Расчёт позиции =</span>
                      {{ moneyFormat(item.cardCount) }}
                    </h4>
                  </div>
                </v-card-title>
                <v-card-text v-for="(formulas, formulasIndex) in item.formulas" :key="formulasIndex">
                  <v-layout class="mb-1">
                    <v-flex xs12 class="d-flex">
                      <div>
                        <v-btn flat icon color="error" class="ma-0"
                               @click="deleteFormulaQuestion(item, formulas, formulas.formulaName)"
                               v-show="showAdditionalItem(item)">
                          <v-icon>
                            remove
                          </v-icon>
                        </v-btn>
                        {{ formulas.formulaName }}
                      </div>
                      <v-spacer></v-spacer>
                      <div class="text-xs-right">
                        <h4 class="headline mb-0">
                          <span class="grey--text font-weight-light caption text-lowercase">{{ formulas.formulaString }} =</span>
                          {{ moneyFormat(formulas.count) }}
                        </h4>
                      </div>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex xs6>
                      <div v-for="(formula, formulaIndex) in formulas.formula" :key="formulaIndex">
                        <template v-if="formula.name">
                          <v-layout>
                            <v-flex xs1 class="letter-wrapper">
                              <span class="letter orange darken-1 white--text">{{ formula.value }}</span>
                            </v-flex>
                            <v-flex xs11>
                              <v-text-field
                                :label="formula.name"
                                color="indigo darken-1"
                                v-model="formulas.variables[formula.value.toLowerCase()]"
                                @keypress="inputCheck"
                                @keyup="countFormula(item)"
                                @keydown="haveChange = true"
                                maxlength="25"
                                counter
                              >
                                <soft-calc-component
                                  slot="append"
                                  :current="formulas.variables[formula.value.toLowerCase()]"
                                  @bringIn="bringIn($event, formulas.variables, formula.value.toLowerCase(), item)"
                                >
                                </soft-calc-component>
                              </v-text-field>
                            </v-flex>
                          </v-layout>
                        </template>
                      </div>
                    </v-flex>
                    <v-flex xs6 class="ml-3">
                      <v-textarea
                        label="Комментарий"
                        v-model="formulas.comment"
                        auto-grow
                        box
                        color="indigo darken-1"
                        maxlength="5000"
                        counter
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                </v-card-text>
                <v-card-actions>
                  <v-spacer class="hidden-sm-and-down"></v-spacer>
                  <v-btn flat icon color="success" @click="addFormulaDialogInit(item)">
                    <v-icon>
                      add
                    </v-icon>
                  </v-btn>
                  <v-btn flat icon color="indigo" v-show="showAdditionalItem(item)"
                         @click="formulaRelationDialogInit(item)">
                    <v-icon>
                      settings
                    </v-icon>
                  </v-btn>
                  <v-btn flat icon color="error" @click="deleteOptionQuestion(item, item.position)">
                    <v-icon>
                      delete
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </template>
              <template v-else>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{ item.position }}</h3>
                    <div>{{ item.formulaName }}</div>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h4 class="headline mb-0">
                      <span
                        class="grey--text font-weight-light caption text-lowercase">{{ item.formulaString }} =</span>
                      {{ moneyFormat(item.count) }}
                    </h4>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-layout>
                    <v-flex xs6>
                      <div v-for="(key, i) in item.formula" :key="i">
                        <template v-if="key.name">
                          <v-layout>
                            <v-flex xs1 class="letter-wrapper">
                              <span class="letter orange darken-1 white--text">{{ key.value }}</span>
                            </v-flex>
                            <v-flex xs11>
                              <v-text-field
                                :label="key.name"
                                color="indigo darken-1"
                                v-model="item.variables[key.value.toLowerCase()]"
                                @keypress="inputCheck"
                                @keyup="countFormula(item)"
                                @keydown="haveChange = true"
                                maxlength="25"
                                counter
                              >
                                <soft-calc-component
                                  slot="append"
                                  :current="item.variables[key.value.toLowerCase()]"
                                  @bringIn="bringIn($event, item.variables, key.value.toLowerCase(), item)"
                                >

                                </soft-calc-component>
                              </v-text-field>
                            </v-flex>
                          </v-layout>
                        </template>
                      </div>
                    </v-flex>
                    <v-flex xs6 class="ml-3">
                      <v-textarea
                        label="Комментарий"
                        v-model="item.comment"
                        auto-grow
                        box
                        color="indigo darken-1"
                        maxlength="5000"
                        counter
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-spacer class="hidden-sm-and-down"></v-spacer>
                  <v-btn flat icon color="error" @click="deleteOptionQuestion(item, item.position)">
                    <v-icon>
                      delete
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </template>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-btn
      color="success"
      fab
      @click="save"
      :disabled="!nameValid"
      fixed
      bottom
      right
    >
      <v-icon>save</v-icon>
    </v-btn>
    <v-snackbar
      v-model="snackbarDocument"
      :color="snackbarDocumentStatus"
      :timeout="3000"
    >
      {{ snackbarDocumentText }}
      <v-btn
        dark
        flat
        @click="snackbarDocument = false"
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
          Удалить позицию?
        </v-card-title>
        <v-card-text>
          Вы собираетесь удалить позицию: <b>{{ deleteDialogName }}</b>.<br>
          Удаляем?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteOption(deleteDialogId, deleteDialogName)"
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
    <v-dialog
      v-model="deletePositionsDialog"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline yellow"
        >
          <v-icon large class="mr-1" color="red">
            warning
          </v-icon>
          Удалить параметр позиции?
        </v-card-title>
        <v-card-text>
          Вы собираетесь удалить параметр позиции: <b>{{ deleteDialogName }}</b>.<br>
          Удаляем?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deletePositions(deleteDialogId, deleteDialogName)"
          >
            ОК
          </v-btn>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="deletePositionsDialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="saveChangeDialog"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline info white--text"
        >
          <v-icon large class="mr-1" color="white">
            info
          </v-icon>
          Сохранить изменения?
        </v-card-title>
        <v-card-text>
          В документе были совершены изменения, вы хотите их сохранить?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            flat="flat"
            @click="save"
            :disabled="!nameValid"
          >
            Сохранить
          </v-btn>
          <v-btn
            color="warning"
            flat="flat"
            @click="$emit('closeDocument', documentId)"
          >
            Не сохранять
          </v-btn>
          <v-btn
            color="error"
            flat="flat"
            @click="saveChangeDialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteFormulaDialog"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline yellow"
        >
          <v-icon large class="mr-1" color="red">
            warning
          </v-icon>
          Удалить формулу?
        </v-card-title>
        <v-card-text>
          <p>
            Вы собираетесь удалить формулу: <b>{{ deleteFormulaDialogName }}</b>.<br>
            Удаляем?
          </p>
          <p>
            Если в позиции не будет формул, позиция будет удалена.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteFormula(deleteFormulaDialogItem, deleteFormulaDialogFormula)"
          >
            ОК
          </v-btn>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="deleteFormulaDialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="addFormulaDialog"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline success white--text"
        >
          Добавление формулы
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="addFormulaDialogFormula"
            :items="formulasName"
            item-text="name"
            return-object
            color="indigo darken-1"
            placeholder="Выберите формулу."
          >
          </v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="addFormula(addFormulaDialogItem)"
            :disabled="addFormulaDialogBtn"
          >
            ОК
          </v-btn>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="addFormulaDialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="formulaRelationDialog"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline white--text indigo darken-1"
        >
          Настройка зависимости
        </v-card-title>
        <v-card-text>
          <template v-if="formulaRelationDialogItem">
            <v-list two-line>
              <template v-for="(formula, index) of formulaRelationDialogItem.formulas">
                <div :key="index">
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>формула</v-list-tile-sub-title>
                      <v-list-tile-title>
                        <h3>
                          {{ formula.formulaName }}
                        </h3>
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <template v-if="formulaRelationDialogItem.formulaRelation[index]">
                    <v-list-tile
                      height="80px"
                    >
                      <v-list-tile-content class="pt-2">
                        <v-select
                          :items="['+', '-', '*', '/']"
                          label="Зависимость"
                          v-model="formulaRelationDialogItem.formulaRelation[index]"
                          outline
                          color="indigo darken-1"
                          height="50px"
                        ></v-select>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </template>
                </div>
              </template>
            </v-list>
          </template>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="setFormulaRelation"
          >
            ОК
          </v-btn>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="formulaRelationDialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
  import { Parser } from 'expr-eval';
  import softCalcComponent from './SoftCalc';

  export default {
    created() {
      this.init();
    },
    props: ['documentParams', 'showDocumentDialog'],
    components: {
      softCalcComponent
    },
    data() {
      return {
        documentId: 'newDocument',
        documentName: '',
        nameRules: [
          v => !!v || 'Имя должно быть указано',
          v => /^[\w\dа-яА-Я .\-ё#№]{3,}$/.test(v) || 'Имя должено быть валидным'
        ],
        nameValid: false,
        formulaSelected: '',
        positionSelected: '',
        comboboxVisible: false,
        options: [],
        snackbarDocument: false,
        snackbarDocumentStatus: '',
        snackbarDocumentText: '',
        deleteDialog: false,
        deletePositionsDialog: false,
        deleteDialogId: null,
        deleteDialogName: '',
        haveChange: false,
        saveChangeDialog: false,
        addFormulaDialog: false,
        addFormulaDialogFormula: null,
        addFormulaDialogItem: null,
        addFormulaDialogBtn: false,
        deleteFormulaDialog: false,
        deleteFormulaDialogName: '',
        deleteFormulaDialogItem: null,
        deleteFormulaDialogFormula: null,
        formulaRelationDialog: false,
        formulaRelationDialogItem: null,
        addOptionsBtn: true
      };
    },
    computed: {
      formulasName() {
        return this.$store.getters['formulas/namesList'];
      },
      positionsList() {
        return this.$store.getters['documents/positions'];
      },
      totalCount() {
        let count = 0;
        for (let item of this.options) {
          if (item.new) {
            count += parseFloat(item.cardCount);
          } else {
            count += parseFloat(item.count);
          }
        }

        return count.toFixed(2);
      }
    },
    watch: {
      showDocumentDialog() {
        this.haveChange = false;
        this.init();
      },
      positionSelected() {
        this.comboboxVisible = false;
        this.addOptionsBtn = !this.formulaSelected || !this.positionSelected;
      },
      addFormulaDialogFormula() {
        this.addFormulaDialogBtn = false;
      },
      formulaSelected() {
        this.addOptionsBtn = !this.formulaSelected || !this.positionSelected;
      }
    },
    methods: {
      init() {
        if (!this.documentParams) {
          return false;
        }

        this.documentId = this.documentParams._id;
        this.documentName = this.documentParams.name;
        this.options = JSON.parse(JSON.stringify(this.documentParams.options));
      },
      userRules() {
        if (!this.$store.getters['user/isActiveted']) {
          this.$emit('userNotConfirmMail');
          return false;
        }

        if (!this.$store.getters['user/premium'] && this.$store.getters['documents/totalItems'] >= 1 && !this.documentParams) {
          this.$emit('userNotPremium');
          return false;
        }

        this.$emit('openDocument', this.documentId);
      },
      async save() {
        if (!this.nameValid) {
          return false;
        }

        await this.$store.dispatch('getServerStatus');
        await this.$store.dispatch('getTokenStatus');

        if (!this.$store.getters.serverStatus) {
          return false;
        }

        if (this.documentId !== 'newDocument') {
          await this.$store.dispatch('documents/editDocument', {
            id: this.documentId,
            name: this.documentName,
            totalCount: this.totalCount,
            options: this.options
          });
        } else {
          await this.$store.dispatch('documents/addDocument', {
            catalogId: this.$store.getters['documents/catalogId'],
            name: this.documentName,
            totalCount: this.totalCount,
            options: this.options
          });

          this.documentName = '';
          this.options = [];
        }
        this.$emit('closeDocument', this.documentId);
        this.$emit('updateDocumentsList');
      },
      async addOptions() {
        this.addOptionsBtn = true;
        this.haveChange = true;

        await this.$store.dispatch('formulas/getFormula', this.formulaSelected._id);
        let variables = {};
        let formulaString = '';

        for (let item of this.$store.getters['formulas/formula'].formula) {
          if (/\w/.test(item.value)) {
            variables[item.value.toLowerCase()] = '';
          }
          formulaString += item.value;
        }

        this.options.unshift({
          new: true,
          position: this.positionSelected.name ? this.positionSelected.name : this.positionSelected,
          cardCount: 0,
          formulaRelation: [],
          formulas: [{
            formulaName: this.formulaSelected.name,
            count: 0,
            formula: this.$store.getters['formulas/formula'].formula,
            formulaString,
            variables,
            comment: ''
          }]
        });

        await this.addPositions();

        this.positionSelected = '';
        this.formulaSelected = '';
      },
      async addPositions() {
        let duplicate = false;

        for (let item of this.$store.getters['documents/positions']) {
          if (item.name === this.positionSelected.name) {
            duplicate = true;
          }
        }

        if (!duplicate) {
          await this.$store.dispatch('documents/addPositions', this.positionSelected);
          await this.$store.dispatch('documents/getPositions');
        }
      },
      deleteOptionQuestion(id, name) {
        this.deleteDialogId = id;
        this.deleteDialogName = name;
        this.deleteDialog = true;
      },
      deleteOption(option, name) {
        this.haveChange = true;

        let indexOption = this.options.indexOf(option);
        this.options.splice(indexOption, 1);

        this.deleteDialog = false;
        this.snackbarDocument = true;
        this.snackbarDocumentStatus = 'info';
        this.snackbarDocumentText = `Позиция ${name} удалёна.`;
      },
      deletePositionsQuestion(id, name) {
        this.comboboxVisible = false;
        this.deleteDialogId = id;
        this.deleteDialogName = name;
        this.deletePositionsDialog = true;
      },
      async deletePositions(id, name) {
        this.haveChange = true;
        await this.$store.dispatch('documents/deletePositions', id);
        await this.$store.dispatch('documents/getPositions');

        this.deletePositionsDialog = false;
        this.deleteDialogId = null;
        this.deleteDialogName = '';
        this.snackbarDocument = true;
        this.snackbarDocumentStatus = 'info';
        this.snackbarDocumentText = `Параметр позиции ${name} удалён.`;
      },
      countFormula(item) {
        for (let formula of item.formulas) {
          let expression = Parser.parse(formula.formulaString.toLowerCase());

          if (Object.keys(formula.variables).length === 1) {
            formula.count = expression.evaluate(formula.variables);
            formula.count = parseFloat(formula.count).toFixed(2);
          } else {
            formula.count = expression.evaluate(formula.variables).toFixed(2);
          }

          if (!isFinite(formula.count)) {
            formula.count = 0;
          }
        }

        if (item.formulaRelation.length) {
          let countString = '';

          for (let i = 0; i < item.formulas.length; i += 1) {
            countString += item.formulas[i].count;
            if (item.formulaRelation[i]) {
              countString += item.formulaRelation[i];
            }
          }

          item.cardCount = Parser.parse(countString).evaluate();
        } else {
          for (let formula of item.formulas) {
            item.cardCount = 0;
            item.cardCount += parseFloat(formula.count);
          }
        }
      },
      inputCheck(e) {
        let inputValue = e.target.value;

        if (inputValue.split(/\./).length === 2 && (e.key === '.' || e.key === ',')) {
          e.preventDefault();
        }
        if (!/[0-9\-.,]/.test(e.key)) {
          e.preventDefault();
        }

        e.target.value = inputValue.replace(/,/gi, '.', 'gi');
      },
      close() {
        if (this.haveChange) {
          this.saveChangeDialog = true;
        } else {
          this.$emit('closeDocument', this.documentId);
        }
      },
      moneyFormat(count) {
        return Intl.NumberFormat('ru-RU').format(count).replace(/,/, '.');
      },
      bringIn(value, variables, letter, item) {
        variables[letter] = value;
        this.countFormula(item);
      },
      addFormulaDialogInit(item) {
        this.addFormulaDialogBtn = true;
        this.addFormulaDialogItem = item;
        this.addFormulaDialog = true;
      },
      async addFormula(item) {
        this.addFormulaDialogBtn = true;
        await this.$store.dispatch('formulas/getFormula', this.addFormulaDialogFormula._id);
        let variables = {};
        let formulaString = '';

        for (let item of this.$store.getters['formulas/formula'].formula) {
          if (/\w/.test(item.value)) {
            variables[item.value.toLowerCase()] = '';
          }
          formulaString += item.value;
        }

        item.formulas.push({
          formulaName: this.addFormulaDialogFormula.name,
          count: 0,
          formula: this.$store.getters['formulas/formula'].formula,
          formulaString,
          variables,
          comment: ''
        });

        this.setDefaultFormulaRelation(item);

        this.addFormulaDialog = false;
        this.addFormulaDialogFormula = null;
        this.addFormulaDialogItem = null;
      },
      deleteFormulaQuestion(item, formula, name) {
        this.deleteFormulaDialog = true;
        this.deleteFormulaDialogName = name;
        this.deleteFormulaDialogItem = item;
        this.deleteFormulaDialogFormula = formula;
      },
      deleteFormula(item, formula) {
        this.haveChange = true;
        let indexOption = item.formulas.indexOf(formula);
        item.formulas.splice(indexOption, 1);

        this.snackbarDocument = true;
        this.snackbarDocumentStatus = 'info';
        this.snackbarDocumentText = `Формула ${formula.formulaName} удалёна.`;

        if (item.formulas.length === 1) {
          item.formulaRelation = [];
        }

        this.setDefaultFormulaRelation(item);
        this.countFormula(item);

        this.deleteFormulaDialog = false;
        this.deleteFormulaDialogName = '';
        this.deleteFormulaDialogItem = null;
        this.deleteFormulaDialogFormula = null;
      },
      formulaRelationDialogInit(item) {
        this.formulaRelationDialog = true;
        this.formulaRelationDialogItem = item;
      },
      setFormulaRelation() {
        this.countFormula(this.formulaRelationDialogItem);
        this.formulaRelationDialog = false;
        this.formulaRelationDialogItem = null;
      },
      setDefaultFormulaRelation(item) {
        item.formulaRelation = [];

        for (let i = 0; i < item.formulas.length; i += 1) {
          if (item.formulas[i + 1]) {
            item.formulaRelation.push('+');
          }
        }
      },
      showAdditionalItem(item) {
        try {
          return item.formulaRelation.length;
        } catch (e) {
          return false;
        }
      }
    }
  };
</script>

<style scoped>
  .letter-wrapper {
    margin-top: 15px;
    margin-right: 10px;
  }

  .letter {
    padding: 10px;
  }

  @media only screen and (max-width: 959px) {
    .letter-wrapper {
      margin-right: 30px;
    }
  }
</style>
