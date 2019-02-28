<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="300"
      class="overflow-hidden"
      @keydown="keyboardRules($event)"
    >
      <v-icon
        slot="activator"
        color="grey"
        @click.stop="setIncomingNumber"
      >
        queue
      </v-icon>

      <v-card>
        <v-container fluid class="pa-0">
          <v-layout>
            <v-flex xs12>
              <p class="text-xs-right pt-3 pb-3 pl-3 pr-3 overflow-hidden calc-display">
                <span class="calc-header">{{ moneyFormat(total) || '0' }}</span>
                <span class="grey--text">{{ moneyFormat(selectedNumber) || '0' }}</span>
              </p>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <div class="calc-btn calc-btn__grey pa-3" @click="clearAll">
                <span>AC</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__grey pa-3" @click="clearSelected">
                <span>C</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__grey pa-3" @click="sing">
                <span>+/-</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3" @click="divide($event)">
                <span>÷</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="append('7')">
                <span>7</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="append('8')">
                <span>8</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="append('9')">
                <span>9</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3" @click="times($event)">
                <span>x</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="append('4')">
                <span>4</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="append('5')">
                <span>5</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="append('6')">
                <span>6</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3" @click="minus($event)">
                <span>-</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="append('1')">
                <span>1</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="append('2')">
                <span>2</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="append('3')">
                <span>3</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3" @click="add($event)">
                <span>+</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6>
              <div class="calc-btn pa-3 border-gray-a" @click="append('0')">
                <span>0</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a" @click="dot">
                <span>.</span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3" @click="equal">
                <span>=</span>
              </div>
            </v-flex>
          </v-layout>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#3949ab"
            flat
            @click="bringIn"
          >
            Внести
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'SoftCalc',
    props: ['current'],
    data() {
      return {
        dialog: false,
        total: '',
        selectedNumber: '',
        operator: null,
        selectedOperatorBg: null,
        firstEnter: false
      };
    },
    methods: {
      setIncomingNumber() {
        this.total = this.current + '';
        this.dialog = true;
      },
      bringIn() {
        this.$emit('bringIn', this.total);
        this.dialog = false;
      },
      setSelectedOperatorBg(style) {
        this.selectedOperatorBg = style;
        this.selectedOperatorBg.backgroundColor = 'rgba(57, 73, 171, 0.6)';
      },
      clearAll() {
        this.total = '';
        this.selectedNumber = '';
        if (this.selectedOperatorBg) {
          this.selectedOperatorBg.backgroundColor = '';
        }
        this.operator = null;
      },
      clearSelected() {
        this.selectedNumber = '';
      },
      sing() {
        if (!this.total) {
          return;
        }
        this.total = this.total.charAt(0) === '-' ? this.total.slice(1) : `-${this.total}`;
      },
      append(number) {
        if ((this.total.length === 9 && this.firstEnter) || this.selectedNumber.length === 9) {
          return;
        }

        if (!this.total || this.firstEnter) {
          this.total = `${this.total}${number}`;
          this.firstEnter = true;
        } else {
          this.selectedNumber = `${this.selectedNumber}${number}`;
        }

        if (this.selectedOperatorBg) {
          this.selectedOperatorBg.backgroundColor = '';
        }
      },
      dot() {
        if (this.total.indexOf('.') === -1) {
          this.append('.');
        }

        if (this.selectedNumber.indexOf('.') === -1 && !this.firstEnter) {
          this.append('.');
        }
      },
      markOperator(e) {
        if (!e) {
          return;
        }

        if (e.target.nodeName === 'SPAN') {
          this.setSelectedOperatorBg(e.target.parentNode.style);
        } else {
          this.setSelectedOperatorBg(e.target.style);
        }
      },
      unmarkOperator() {
        if (this.selectedOperatorBg) {
          this.selectedOperatorBg.backgroundColor = '';
        }
      },
      divide(e) {
        this.firstEnter = false;

        if (this.operator) {
          this.equal();
        }

        this.unmarkOperator();
        this.markOperator(e);

        this.operator = (a, b) => a / b;
        this.equal();
      },
      times(e) {
        this.firstEnter = false;

        if (this.operator) {
          this.equal();
        }

        this.unmarkOperator();
        this.markOperator(e);

        this.operator = (a, b) => a * b;
        this.equal();
      },
      minus(e) {
        this.firstEnter = false;

        if (this.operator) {
          this.equal();
        }

        this.unmarkOperator();
        this.markOperator(e);

        this.operator = (a, b) => a - b;
        this.equal();
      },
      add(e) {
        this.firstEnter = false;

        if (this.operator) {
          this.equal();
        }

        this.unmarkOperator();
        this.markOperator(e);

        this.operator = (a, b) => a + b;
        this.equal();
      },
      equal() {
        if (!this.selectedNumber) {
          return;
        }

        this.total = `${this.operator(
          parseFloat(this.total || 0),
          parseFloat(this.selectedNumber)
        )}`;
        this.selectedNumber = '';

        this.unmarkOperator();

        this.operator = null;
      },
      keyboardRules(e) {
        let code = e.code;
        let key = e.key;
        let shiftKey = e.shiftKey;
        let ctrlKey = e.ctrlKey;

        switch (code) {
          case 'Digit0':
          case 'Digit1':
          case 'Digit2':
          case 'Digit3':
          case 'Digit4':
          case 'Digit5':
          case 'Digit6':
          case 'Digit7':
          case 'Digit8':
          case 'Digit9':
          case 'Numpad0':
          case 'Numpad1':
          case 'Numpad2':
          case 'Numpad3':
          case 'Numpad4':
          case 'Numpad5':
          case 'Numpad6':
          case 'Numpad7':
          case 'Numpad8':
          case 'Numpad9':
            if (!shiftKey && !ctrlKey) {
              this.append(key);
            }
            if (shiftKey && code === 'Digit8') {
              this.times();
            }
            break;
          case 'NumpadDivide':
          case 'Slash':
            this.divide();
            break;
          case 'NumpadMultiply':
            this.times();
            break;
          case 'Minus':
          case 'NumpadSubtract':
            this.minus();
            break;
          case 'NumpadAdd':
            this.add();
            break;
          case 'Equal':
            if (!shiftKey) {
              break;
            }
            this.add();
            break;
          case 'Enter':
          case 'NumpadEnter':
            this.equal();
            break;
        }
      },
      moneyFormat(count) {
        return Intl.NumberFormat('ru-RU', { maximumFractionDigits: 8 }).format(count).replace(',', '.');
      }
    }
  };
</script>

<style scoped>
  .calc-display {
    display: flex;
    flex-direction: column;
  }

  .calc-header {
    color: #3949ab;
    font-size: 30px;
  }

  .calc-btn {
    cursor: pointer;
    font-weight: normal;
    color: #3949ab;
    font-size: 20px;
    text-align: center;
  }

  .calc-btn:active {
    background-color: rgba(57, 73, 171, 0.21);
  }
  
  .calc-btn__grey {
    font-weight: lighter;
    background-color: #ccc;
    color: #fff;
  }

  .calc-btn__primary {
    font-weight: lighter;
    background-color: #3949ab;
    color: #fff;
  }

  .calc-btn__primary:active {
    background-color: rgba(57, 73, 171, 0.6);
  }

  .calc-btn > span {
    user-select: none;
  }

  .border-gray-a {
    box-shadow: 0 0 0 1px rgba(204, 204, 204, 0.51);
  }

</style>
