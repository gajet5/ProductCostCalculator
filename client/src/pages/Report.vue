<template>
  <div>
    <header-component></header-component>
    <v-container>
      <v-layout>
        <v-flex>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </v-flex>
      </v-layout>
      <v-layout class="mt-3">
        <v-flex xs12>
          <v-card v-if="loading" class="pa-5 d-flex justify-center align-center">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-card>
          <v-card v-else>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  {{ document.name }}
                </h3>
              </div>
              <v-spacer></v-spacer>
              <small>Создан: {{ dateFormat(document.createDate) }}</small>
            </v-card-title>
            <v-card-text class="d-flex justify-space-around wrap">
              <v-container>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6 lg4 v-for="(item, index) in document.options" :key="index"
                          class="mb-3 pl-2 pr-2">
                    <v-card>

                      <template v-if="item.new">
                        <v-card-title>
                          <h3 class="font-weight-medium">
                            {{ item.position }}
                          </h3>
                        </v-card-title>
                        <v-divider></v-divider>
                        <div v-for="(formula, formulaIndex) of item.formulas" :key="formulaIndex">
                          <v-list>
                              <v-list-tile>
                                <v-list-tile-content>
                                  <div>
                                    <h4 class="font-weight-medium">Формула: {{formula.formulaName}}</h4>
                                  </div>
                                </v-list-tile-content>
                              </v-list-tile>
                          </v-list>
                          <v-list>
                            <template v-for="(value, valueIndex) of formula.formula">
                              <template v-if="value.name">
                                <v-list-tile :key="valueIndex">
                                  <v-list-tile-content>
                                    <div>
                                      <code class="code-position mr-1">{{value.value}}</code> <span>{{ value.name }}:</span>
                                    </div>
                                  </v-list-tile-content>
                                  <v-list-tile-content class="align-end">{{
                                    moneyFormat(formula.variables[value.value.toLowerCase()]) }}
                                  </v-list-tile-content>
                                </v-list-tile>
                              </template>
                            </template>
                          </v-list>
                          <v-alert
                            :value="true"
                            color="info"
                            icon="info"
                            outline
                            v-if="item.formulaRelation[formulaIndex]"
                          >
                            Зависимость: <code class="code-position ml-1"> {{ item.formulaRelation[formulaIndex] }} </code>
                          </v-alert>
                        </div>
                        <v-divider></v-divider>
                        <v-card-text>
                          <span>Расчёт позиции: {{ moneyFormat(item.cardCount)}}</span>
                        </v-card-text>
                      </template>
                      <template v-else>
                        <v-card-title>
                          <h4>
                            {{ item.position }}
                          </h4>
                          <v-spacer></v-spacer>
                          <small>{{ item.formulaString }}</small>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-list dense v-for="(value, indx) in item.formula" :key="indx">
                          <template v-if="value.name">
                            <v-list-tile>
                              <v-list-tile-content>
                                <div>
                                  <code class="code-position mr-1">{{value.value}}</code> <span>{{ value.name }}:</span>
                                </div>
                              </v-list-tile-content>
                              <v-list-tile-content class="align-end">{{
                                moneyFormat(item.variables[value.value.toLowerCase()]) }}
                              </v-list-tile-content>
                            </v-list-tile>
                          </template>
                        </v-list>
                        <v-divider></v-divider>
                        <v-card-text>
                          <span>Расчёт позиции: {{ moneyFormat(item.count)}}</span>
                        </v-card-text>
                      </template>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class="pa-3">
              Всего: {{ moneyFormat(document.totalCount) }}
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';
  import moment from 'moment';

  export default {
    created() {
      this.$store.commit('report/setDocumentId');
      this.$store.dispatch('report/getDocument');
    },
    name: 'Report',
    components: {
      headerComponent
    },
    computed: {
      breadcrumbs() {
        return this.$route.meta.breadcrumb;
      },
      document() {
        return this.$store.getters['report/document'];
      },
      loading() {
        return this.$store.getters['report/loading'];
      }
    },
    methods: {
      dateFormat(date) {
        return moment(date).format('DD.MM.YYYY HH:mm');
      },
      moneyFormat(count) {
        return Intl.NumberFormat('ru-RU').format(count).replace(/,/, '.');
      }
    }
  };
</script>

<style scoped>
  .code-position {
    position: relative;
    top: -2px;
  }
</style>
