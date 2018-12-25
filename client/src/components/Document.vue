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
      class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right"
      v-else
      dark
      @click.stop="userRules"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar dark color="indigo darken-1">
        <v-btn icon dark @click="showDocumentDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Всего: {{ totalCount }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="save" :disabled="!nameValid">Сохранить</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container grid-list-md>
        <v-layout>
          <v-flex>
            <h2 class="mb-2">Название</h2>
            <v-form v-model="nameValid">
              <v-text-field
                label="Название каталога"
                solo
                v-model="documentName"
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
                >
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
                              v-model="item.variables[key.value.toLocaleLowerCase()]"
                              @input="countFormula(item)"
                              color="indigo darken-1"
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
                <v-spacer></v-spacer>
                <v-btn flat color="error" @click="deleteOption(item)">Удалить</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import { Parser } from 'expr-eval';

  export default {
    created() {
      if (!this.documentParams) {
        return false;
      }

      console.log(this.documentParams);

      this.documentId = this.documentParams._id;
      this.documentName = this.documentParams.name;
      this.options = this.documentParams.options;
    },
    props: ['documentParams'],
    data() {
      return {
        documentId: '',
        showDocumentDialog: false,
        documentName: '',
        nameRules: [
          v => !!v || 'Имя должено быть указано',
          v => /^[\w\dа-яА-Я .\-ё#№]{3,}$/.test(v) || 'Имя должено быть валидным'
        ],
        nameValid: false,
        formulaSelected: '',
        positionSelected: '',
        options: []
      };
    },
    computed: {
      formulasName() {
        return this.$store.getters['formulas/namesList'];
      },
      positionsList() {
        let positionsList = [
          'Материал',
          'Фурнитура',
          'Лейбл',
          'Упаковка',
          'Лекало-Конструктор',
          'Технолог',
          'Закройщик',
          'Портной',
          'Декоратор',
          'Вышивка',
          'Материалы для вышивки',
          'Аренда',
          'Содержание оборудования',
          'Интернет',
          'Мобильная связь',
          'Налоги',
          'Директор',
          'Помошник',
          'Бухгалтер',
          'Создание новой коллекции',
          'Фотосет новой коллекции',
          'Банковский счёт',
          'Реклама',
          'Маркетолог',
          'Другое',
          'Производство'
        ];
        return positionsList.sort();
      },
      totalCount() {
        let count = 0;

        for (let item of this.options) {
          count += item.count;
        }

        return count;
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

        this.showDocumentDialog = true;
      },
      async save() {
        await this.$store.dispatch('getServerStatus');
        await this.$store.dispatch('getTokenStatus');

        if (!this.$store.getters.serverStatus) {
          return false;
        }

        if (this.documentId) {
          await this.$store.dispatch('documents/editDocument', {
            id: this.documentId,
            name: this.documentName,
            totalCount: this.totalCount,
            options: this.options
          });

          this.showDocumentDialog = false;
        } else {
          await this.$store.dispatch('documents/addDocument', {
            catalogId: this.$store.getters.catalogSelected,
            name: this.documentName,
            totalCount: this.totalCount,
            options: this.options
          });

          this.showDocumentDialog = false;
          this.documentName = '';
        }
        this.$emit('updateDocumentsList');
      },
      async addOptions() {
        await this.$store.dispatch('formulas/getFormula', this.formulaSelected._id);
        let variables = {};
        let formulaString = '';

        for (let item of this.$store.getters['formulas/formula'].formula) {
          if (/\w/.test(item.value)) {
            variables[item.value.toLocaleLowerCase()] = 0;
          }
          formulaString += item.value;
        }

        this.options.unshift({
          position: this.positionSelected,
          formulaName: this.formulaSelected.name,
          count: 0,
          formula: this.$store.getters['formulas/formula'].formula,
          formulaString,
          variables,
          comment: ''
        });

        this.positionSelected = '';
        this.formulaSelected = '';
      },
      deleteOption(option) {
        let indexOption = this.options.indexOf(option);
        console.log(indexOption);
        this.options.splice(indexOption, 1);
      },
      countFormula(item) {
        let expression = Parser.parse(item.formulaString.toLocaleLowerCase());
        item.count = expression.evaluate(item.variables);
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