<template>
  <v-dialog v-model="addFormula" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn slot="activator" color="primary" dark>Добавить</v-btn>
    <v-card>
      <v-toolbar dark color="indigo darken-1">
        <v-btn icon dark @click="addFormula = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Настройки</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="addFormula = false">Сохранить</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-layout>
          <v-flex>
            <h2 class="mb-2">Название</h2>
            <v-text-field
              label="Название формулы"
              solo
            ></v-text-field>
            <h2 class="mb-2">Формула</h2>
            <v-card class="grey lighten-3 pa-3">
              <span>= </span>{{ formula }}
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout class="ma-2">
          <v-btn dark color="primary">
            <v-icon dark>add</v-icon>
          </v-btn>
          <v-btn dark color="primary">
            <v-icon dark>remove</v-icon>
          </v-btn>
          <v-btn dark color="primary">
            <v-icon dark>*</v-icon>
          </v-btn>
          <v-btn dark color="primary">
            <v-icon dark class="btn-slash-possition-fix">/</v-icon>
          </v-btn>
          <v-btn dark color="primary">
            <v-icon dark class="btn-scob-possition-fix">(</v-icon>
          </v-btn>
          <v-btn dark color="primary">
            <v-icon dark class="btn-scob-possition-fix">)</v-icon>
          </v-btn>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-card>
              <v-card-title>
                <h3>
                  Операнды
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
                    <div>
                      <v-btn fab dark small color="green darken-1">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                      <v-btn fab dark small color="red darken-1" @click="deleteOperand(item)">
                        <v-icon dark>delete</v-icon>
                      </v-btn>
                    </div>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn flat color="primary" @click="addOperand" :disabled="limitVariations">Добавить</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import getLetter from '../helper/getLetter';

  export default {
    data() {
      return {
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        usedLetters: [],
        operands: [],
        formula: '',
        addFormula: false,
        limitVariations: false
      };
    },
    methods: {
      addOperand() {
        if (this.letters.length * this.letters.length === this.usedLetters.length) {
          return false;
        }

        let letter = getLetter(this.usedLetters, this.letters);
        this.usedLetters.push(letter);

        this.operands.push({
          letter,
          name: ''
        });
      },
      deleteOperand(item) {
        let indexOperand = this.operands.indexOf(item);
        let idexUsedLetter = this.usedLetters.indexOf(item.letter);
        this.operands.splice(indexOperand, 1);
        this.usedLetters.splice(idexUsedLetter, 1);
      }
    }
  };
</script>

<style scoped>
  .btn-slash-possition-fix {
    position: relative;
    top: -3px;
  }

  .btn-scob-possition-fix {
    position: relative;
    top: -5px;
  }

  .w-100 {
    width: 100%;
  }
</style>
