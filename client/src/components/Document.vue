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
        <v-toolbar-title>Всего: {{ totalCount }}</v-toolbar-title>
      </v-toolbar>
      <v-container grid-list-md>
        <v-layout>
          <v-flex>
            <h2 class="mb-2">Название</h2>
            <v-form v-model="nameValid">
              <v-text-field
                label="Название документа"
                solo
                v-model="documentName"
                @keydown="haveChange = true"
                required
                :rules="nameRules"
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
                  :menu-props="{zIndex:'203'}"
                >
                  <template
                    slot="item"
                    slot-scope="{ item }"
                  >
                    <v-list-tile-content>
                      {{ item.name }}
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-list-tile-action @click.stop>
                      <v-btn
                        icon
                        @click.stop.prevent="deletePositionsQuestion(item._id, item.name)"
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
              :disabled="!formulaSelected || !positionSelected"
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
            <v-card v-for="(item, index) in options" :key="index" class="mb-2">
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ item.position }}</h3>
                  <div>{{ item.formulaName }}</div>
                </div>
                <v-spacer></v-spacer>
                <div>
                  <h4 class="headline mb-0">
                    <span class="grey--text font-weight-light caption text-lowercase">{{ item.formulaString }} =</span>
                    {{ item.count }}
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
                              v-model="item.variables[key.value.toLocaleLowerCase()]"
                              @keypress="inputCheck"
                              @keyup="countFormula(item)"
                              @keydown="haveChange = true"
                            ></v-text-field>
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
            color="green darken-1"
            flat="flat"
            @click="save"
          >
            Сохранить
          </v-btn>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="$emit('closeDocument', documentId)"
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

  export default {
    created() {
      if (!this.documentParams) {
        return false;
      }

      this.documentId = this.documentParams._id;
      this.documentName = this.documentParams.name;
      this.options = JSON.parse(JSON.stringify(this.documentParams.options));
    },
    props: ['documentParams', 'showDocumentDialog'],
    data() {
      return {
        documentId: 'newDocument',
        documentName: '',
        nameRules: [
          v => !!v || 'Имя должено быть указано',
          v => /^[\w\dа-яА-Я .\-ё#№]{3,}$/.test(v) || 'Имя должено быть валидным'
        ],
        nameValid: false,
        formulaSelected: '',
        positionSelected: '',
        options: [],
        snackbarDocument: false,
        snackbarDocumentStatus: '',
        snackbarDocumentText: '',
        deleteDialog: false,
        deletePositionsDialog: false,
        deleteDialogId: '',
        deleteDialogName: '',
        haveChange: false,
        saveChangeDialog: false
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
          count += parseFloat(item.count);
        }

        return count.toFixed(2);
      }
    },
    watch: {
      showDocumentDialog() {
        this.haveChange = false;
      }
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

        this.$emit('openDocument', this.documentId);
      },
      async save() {
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
        this.haveChange = true;

        await this.$store.dispatch('formulas/getFormula', this.formulaSelected._id);
        let variables = {};
        let formulaString = '';

        for (let item of this.$store.getters['formulas/formula'].formula) {
          if (/\w/.test(item.value)) {
            variables[item.value.toLocaleLowerCase()] = '';
          }
          formulaString += item.value;
        }

        this.options.unshift({
          position: this.positionSelected.name ? this.positionSelected.name : this.positionSelected,
          formulaName: this.formulaSelected.name,
          count: 0,
          formula: this.$store.getters['formulas/formula'].formula,
          formulaString,
          variables,
          comment: ''
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
        this.deleteDialogId = id;
        this.deleteDialogName = name;
        this.deletePositionsDialog = true;
      },
      async deletePositions(id, name) {
        await this.$store.dispatch('documents/deletePositions', id);
        await this.$store.dispatch('documents/getPositions');

        this.deletePositionsDialog = false;
        this.snackbarDocument = true;
        this.snackbarDocumentStatus = 'info';
        this.snackbarDocumentText = `Параметр позиции ${name} удалён.`;
      },
      countFormula(item) {
        let expression = Parser.parse(item.formulaString.toLocaleLowerCase());

        if (Object.keys(item.variables).length === 1) {
          item.count = expression.evaluate(item.variables);
          item.count = parseFloat(item.count).toFixed(2);
        } else {
          item.count = expression.evaluate(item.variables).toFixed(2);
        }

        if (!isFinite(item.count)) {
          item.count = 0;
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
