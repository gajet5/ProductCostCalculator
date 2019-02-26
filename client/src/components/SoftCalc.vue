<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="300"
      class="overflow-hidden"
    >
      <v-icon slot="activator">
        queue
      </v-icon>

      <v-card>

        <v-container fluid class="pa-0">
          <v-layout>
            <v-flex xs12>
              <p class="text-xs-right pt-3 pb-3 pl-3 pr-3 overflow-hidden calc-display">
                <span class="calc-header">{{ current || '0' }}</span>
                <span class="grey--text">{{ selectedNumber || '0' }}</span>
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
        selectedOperatorBg: null
      };
    },
    methods: {
      bringIn() {
        this.$emit('bringIn', this.total);
        this.dialog = false;
      },
      setSelectedOperatorBg(e) {
        this.selectedOperatorBg = e.target.style;
        this.selectedOperatorBg.backgroundColor = 'rgba(57, 73, 171, 0.6)';
      },
      clearAll() {
        this.total = '';
        this.selectedNumber = '';
      },
      clearSelected() {
        this.selectedNumber = '';
      },
      sing() {
        this.total = this.total.charAt(0) === '-' ? this.total.slice(1) : `-${this.total}`;
      },
      append(number) {
        this.selectedNumber = `${this.selectedNumber}${number}`;
      },
      dot() {
        if (this.selectedNumber.indexOf('.') === -1) {
          this.append('.');
        }
      },
      divide(e) {
        this.operator = (a, b) => a / b;
        if (this.total !== '' && this.selectedNumber !== '') {
          this.equal();
        }
        // this.setSelectedOperatorBg(e);
      },
      times(e) {
        this.operator = (a, b) => a * b;
        if (this.total !== '' && this.selectedNumber !== '') {
          this.equal();
        }
        // this.setSelectedOperatorBg(e);
      },
      minus(e) {
        this.operator = (a, b) => a - b;
        if (this.total !== '' && this.selectedNumber !== '') {
          this.equal();
        }
        // this.setSelectedOperatorBg(e);
      },
      add(e) {
        this.operator = (a, b) => a + b;
        if (this.total !== '' && this.selectedNumber !== '') {
          this.equal();
        }
        // this.setSelectedOperatorBg(e);
      },
      equal() {
        this.total = `${this.operator(
          parseFloat(this.total),
          parseFloat(this.selectedNumber)
        )}`;
        this.selectedNumber = '';
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
    box-shadow: 0 0 0 .5px #ccc;
  }

</style>
