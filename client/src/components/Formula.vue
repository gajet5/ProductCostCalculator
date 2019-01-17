<template>
  <v-dialog
    v-model="showFormulaDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-btn
      slot="activator"
      class="v-btn"
      color="warning"
      v-if="formulaParams"
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
        <v-btn icon dark @click="$emit('closeFormula', formulaId)">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-layout>
          <v-flex>
            <h2 class="mb-2">Название</h2>
            <v-form v-model="nameValid">
              <v-text-field
                label="Название формулы"
                solo
                v-model="formulaName"
                required
                :rules="nameRules"
              ></v-text-field>
            </v-form>
            <h2 class="mb-2">Формула</h2>
            <v-card class="grey lighten-3 pa-3">
              <span class="mr-1">= </span>
              <span v-html="formulaStrin"></span>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout class="ma-2">
          <v-flex>
            <v-btn color="indigo darken-1" class="white--text" :disabled="signCanAdded" @click="addOperator('+')">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn color="indigo darken-1" class="white--text" :disabled="signCanAdded" @click="addOperator('-')">
              <v-icon>remove</v-icon>
            </v-btn>
            <v-btn color="indigo darken-1" class="white--text" :disabled="signCanAdded" @click="addOperator('*')">
              *
            </v-btn>
            <v-btn color="indigo darken-1" class="white--text" :disabled="signCanAdded" @click="addOperator('/')">
              /
            </v-btn>
            <v-btn color="indigo darken-1" class="white--text" :disabled="!leftBracketCanAdd" @click="addOperator('(')">
              (
            </v-btn>
            <v-btn color="indigo darken-1" class="white--text" :disabled="!rightBracketCanAdd" @click="addOperator(')')">
              )
            </v-btn>
            <v-btn color="warning" @click="deleteLastChar" :disabled="!backspaceDisabled">
              <v-icon class="btn-scob-possition-fix">backspace</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-card>
              <v-card-title>
                <h3>
                  Переменные
                </h3>
              </v-card-title>
              <v-list>
                <v-list-tile v-for="(item, index) in operands" :key="index" class="mt-1 mb-1">
                  <v-list-tile-action>
                    <span class="pa-2 orange darken-1 white--text">{{ item.letter }}</span>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <div class="w-100">
                      <v-text-field
                        label="Название"
                        v-model="item.name"
                      ></v-text-field>
                    </div>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <div class="flex no-wrap">
                      <template v-if="!item.inFormula">
                        <v-btn fab small color="green darken-1" @click="letterInFormula(item)" :disabled="!letterCanAdded || item.name === ''">
                          <v-icon class="white--text">add</v-icon>
                        </v-btn>
                      </template>
                      <template v-else>
                        <v-btn fab small color="red darken-1" @click="letterInFormula(item)">
                          <v-icon class="white--text">remove</v-icon>
                        </v-btn>
                      </template>
                      <v-btn fab small color="red darken-1" @click="deleteOperand(item)">
                        <v-icon class="white--text">delete</v-icon>
                      </v-btn>
                    </div>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn flat color="indigo darken-1" @click="addOperand" :disabled="limitVariations">Добавить</v-btn>
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
      v-model="snackbarEnabled"
      :color="snackbarColor"
      :timeout="6000"
    >
      {{ snackbarText }}
      <v-btn
        dark
        flat
        @click="snackbarEnabled = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
  import getLetter from '../helper/getLetter';

  export default {
    created() {
      let indexArr = [];

      if (!this.formulaParams) {
        return false;
      }

      this.formulaId = this.formulaParams._id;
      this.formulaName = this.formulaParams.name;

      for (let item of this.formulaParams.formula) {
        indexArr.push(item.index);
        this.formula.push(item);

        if (/[\w]/.test(item.value)) {
          this.usedLetters.push(item.value);

          this.operands.push({
            inFormula: true,
            letter: item.value,
            name: item.name
          });
        }
      }

      this.indexInFormula = Math.max.apply(null, indexArr) + 1;
      if (!isFinite(this.indexInFormula)) {
        this.indexInFormula = 1;
      }
    },
    props: ['formulaParams', 'showFormulaDialog'],
    data() {
      return {
        formulaId: 'newFormula',
        formulaName: '',
        nameRules: [
          v => !!v || 'Имя должено быть указано',
          v => /^[\w\dа-яА-Я .\-ё#№]{3,}$/.test(v) || 'Имя должено быть валидным'
        ],
        nameValid: false,
        indexInFormula: 1,
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        usedLetters: [],
        operands: [],
        formula: [],
        limitVariations: false,
        snackbarEnabled: false,
        snackbarColor: '',
        snackbarText: ''
      };
    },
    computed: {
      formulaStrin() {
        let string = '';
        for (let item of this.formula) {
          if (/[\w]/.test(item.value)) {
            string += `<span class="pa-1 mr-1 orange darken-1 white--text">${item.value}</span>`;
          } else {
            string += `<span class="pa-1 mr-1">${item.value}</span>`;
          }
        }
        return string;
      },
      signCanAdded() {
        let length = this.formula.length;
        let letterInQuery = false;

        for (let item of this.operands) {
          if (!item.inFormula) {
            letterInQuery = true;
          }
        }

        if (length) {
          let last = this.formula[length - 1];

          if (letterInQuery && /[\w)]{1}$/.test(last.value)) {
            return false;
          }
        }
        return true;
      },
      leftBracketCanAdd() {
        if (this.formula.length === 0) {
          return true;
        }

        return /[+\-*/]/.test(this.formula[this.formula.length - 1].value);
      },
      rightBracketCanAdd() {
        return this.bracketCheck;
      },
      letterCanAdded() {
        let length = this.formula.length;
        if (length) {
          let last = this.formula[length - 1];
          return /[\W)]{1}$/.test(last.value);
        }
        return true;
      },
      backspaceDisabled() {
        return !!this.formula.length;
      },
      bracketCheck() {
        let bracketOpen = 0;
        let bracketClose = 0;

        for (let item of this.formula) {
          switch (item.value) {
            case '(':
              bracketOpen += 1;
              break;

            case ')':
              bracketClose += 1;
              break;
          }
        }
        return bracketOpen !== bracketClose;
      }
    },
    methods: {
      letterInFormula(item) {
        if (item.inFormula) {
          item.inFormula = !item.inFormula;
          let index = this.formula.findIndex(element => element.value === item.letter);
          this.formula.splice(index, 1);
          this.checkFormula();
        } else {
          item.inFormula = !item.inFormula;
          this.formula.push({
            index: this.indexInFormula,
            value: item.letter,
            name: item.name
          });
          this.indexInFormula += 1;
        }
      },
      addOperator(sign) {
        this.formula.push({
          index: this.indexInFormula,
          value: sign,
          name: ''
        });
        this.indexInFormula += 1;
      },
      addOperand() {
        if (this.letters.length * this.letters.length === this.usedLetters.length) {
          this.limitVariations = true;
          return false;
        } else {
          this.limitVariations = false;
        }

        let letter = getLetter(this.usedLetters, this.letters);
        this.usedLetters.push(letter);

        this.operands.push({
          inFormula: false,
          letter,
          name: ''
        });
      },
      deleteOperand(item) {
        let indexOperand = this.operands.indexOf(item);
        let idexUsedLetter = this.usedLetters.indexOf(item.letter);
        let indexInFormula = this.formula.findIndex(element => element.value === item.letter);

        this.operands.splice(indexOperand, 1);
        this.usedLetters.splice(idexUsedLetter, 1);
        if (indexInFormula !== -1) {
          this.formula.splice(indexInFormula, 1);
        }
        this.checkFormula();
      },
      deleteLastChar() {
        let lastItem = this.formula[this.formula.length - 1];
        if (/[\w]/.test(lastItem.value)) {
          let index = this.operands.findIndex(element => element.letter === lastItem.value);
          this.operands[index].inFormula = false;
        }
        this.formula.pop();
      },
      async save() {
        if (this.bracketCheck) {
          this.snackbarEnabled = true;
          this.snackbarColor = 'warning';
          this.snackbarText = 'Ошибка в логике скобок.';

          return false;
        }

        await this.$store.dispatch('getServerStatus');
        await this.$store.dispatch('getTokenStatus');

        if (!this.$store.getters.serverStatus) {
          return false;
        }

        if (this.formulaId !== 'newFormula') {
          await this.$store.dispatch('formulas/editFormula', {
            id: this.formulaId,
            name: this.formulaName,
            formula: this.formula
          });
        } else {
          await this.$store.dispatch('formulas/addFormula', {
            name: this.formulaName,
            formula: this.formula
          });

          this.formulaName = '';
          this.operands = [];
          this.usedLetters = [];
          this.formula = [];
          this.indexInFormula = 1;
        }

        this.$emit('closeFormula', this.formulaId);
        this.$emit('updateFormulasList');
      },
      checkFormula() {
        if (!this.formula.length) {
          return false;
        }

        // Удалять один знак в формуле
        if (/[+\-*/]/.test(this.formula[0].value)) {
          this.formula.splice(0, 1);
        }

        // Удаление знака с права при удалении переменной
        for (let i = 0; i < this.formula.length; i += 1) {
          if (this.formula.length - 1 === i) {
            break;
          }
          let currentValue = this.formula[i].value;
          let nextValue = this.formula[i + 1].value;

          if (/[+\-*/]/.test(currentValue) && /\w/.test(nextValue)) {
            this.formula.splice(i, 1);
          }

          if (/\(/.test(currentValue) && /\)/.test(nextValue)) {
            this.formula.splice(i, 1);
            this.formula.splice(i, 1);
          }
        }
      },
      userRules() {
        if (!this.$store.getters['user/isActiveted']) {
          this.$emit('userNotConfirmMail');
          return false;
        }

        if (!this.$store.getters['user/premium'] && this.$store.getters['formulas/totalItems'] >= 1 && !this.formulaParams) {
          this.$emit('userNotPremium');
          return false;
        }

        this.$emit('openFormula', this.formulaId);
      }
    }
  };
</script>

<style scoped>
  .w-100 {
    width: 100%;
  }

  .v-list__tile__content {
    overflow: visible;
  }
</style>
