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
              <p class="text-xs-right pt-3 pb-3 pl-3 pr-3 overflow-hidden">
                <span class="calc-header">{{ total }}</span>
              </p>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <div class="calc-btn calc-btn__grey pa-3">
                <span>
                  AC
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__grey pa-3">
                <span>
                  +/-
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__grey pa-3">
                <span>
                  %
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3">
                <span>
                  /
                </span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  7
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  8
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  9
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3">
                <span>
                  *
                </span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  4
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  5
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  6
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3">
                <span>
                  -
                </span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  1
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  2
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  3
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3">
                <span>
                  +
                </span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  0
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn pa-3 border-gray-a">
                <span>
                  .
                </span>
              </div>
            </v-flex>
            <v-flex xs3>
              <div class="calc-btn calc-btn__primary pa-3">
                <span>
                  =
                </span>
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
        total: this.current
      };
    },
    methods: {
      bringIn() {
        this.$emit('bringIn', this.total);
        this.dialog = false;
      }
    }
  };
</script>

<style scoped>
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

  .border-gray-a {
    box-shadow: 0 0 0 .5px #ccc;
  }

  .border-gray-t {
    border-top: 1px solid #ccc;
  }

  .border-gray-b {
    border-bottom: 1px solid #ccc;
  }

  .border-gray-l {
    border-left: 1px solid #ccc;
  }

  .border-gray-r {
    border-right: 1px solid #ccc;
  }
</style>
