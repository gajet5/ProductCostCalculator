<template>
  <div>
    <header-component>
    </header-component>
    <v-container>
      <v-layout>
        <v-flex>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <div>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">
                    {{email}}
                  </h3>
                  <span class="grey--text">{{userStatus  ? 'Премиум' : 'Стандарт'}}</span>
                </div>
                <v-spacer></v-spacer>
                <div v-if="userStatus">
                  <span>Премиум: {{premiumDateEnd}}</span>
                </div>
                <div v-else>
                  <span>Купить премиум</span>
                </div>
              </v-card-title>
              <div>
                <v-alert
                  :value="shopWarningEmailConfirm"
                  type="warning"
                >
                  Email не поддтверждён, часть функционала недоступно.
                </v-alert>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="success">Подтвердить email</v-btn>
                <v-btn flat @click="showPasswordChangeForm = !showPasswordChangeForm">Сменить пароль</v-btn>
              </v-card-actions>
            </div>
            <v-slide-y-transition>
              <v-card-text v-show="showPasswordChangeForm">
                <v-form ref="registrationForm" v-model="formValid" autocomplete="off" @submit.prevent="">
                  <v-text-field
                    v-model.trim="password"
                    :append-icon="p1 ? 'visibility' : 'visibility_off'"
                    @click:append="() => (p1 = !p1)"
                    :type="p1 ? 'password' : 'text'"
                    label="Введите пароль"
                    required
                    :rules="passwordRules"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model.trim="rePassword"
                    :append-icon="p2 ? 'visibility' : 'visibility_off'"
                    @click:append="() => (p2 = !p2)"
                    :type="p2 ? 'password' : 'text'"
                    label="Повторите пароль"
                    required
                    :rules="passwordRules"
                  >
                  </v-text-field>

                  <v-btn
                    type="submit"
                    :disabled="!formValid"
                    color="success"
                    @click="changePassword"
                  >Сменить
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout class="mt-3">
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  Формулы
                </h3>
              </div>
              <v-spacer></v-spacer>
              <formula-component></formula-component>
            </v-card-title>
            <span>Таблица формул</span>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';
  import formulaComponent from '../components/Formula';
  import moment from 'moment';

  moment.locale('ru');

  export default {
    async beforeMount() {
      await this.$store.dispatch('getServerStatus');
      await this.$store.dispatch('getTokenStatus');
      await this.$store.dispatch('user/getUserInfo');

      this.$store.commit('setBreadcrumbs', {
        add: true,
        item: {
          text: 'Личный кабинет',
          disabled: true,
          href: '/user'
        }
      });
    },
    beforeDestroy() {
      this.$store.commit('setBreadcrumbs', {
        remove: true
      });
    },
    components: {
      headerComponent,
      formulaComponent
    },
    data() {
      return {
        showPasswordChangeForm: false,
        formValid: false,
        password: '',
        p1: true,
        rePassword: '',
        p2: true,
        passwordRules: [
          v => !!v || 'Пароль должен быть указан',
          v => /^[a-zA-Z0-9]{4,}$/.test(v) || 'Пароль должен быть валидным',
          v => v === this.password || 'Пароли должны совпадать'
        ]
      };
    },
    computed: {
      email() {
        return this.$store.getters['user/email'];
      },
      breadcrumbs() {
        return this.$store.getters.breadcrumbs;
      },
      shopWarningEmailConfirm() {
        return !this.$store.getters['user/isActiveted'];
      },
      premiumDateEnd() {
        return moment(this.$store.getters['user/premiumDateEnd']).toNow(true);
      },
      userStatus() {
        return this.$store.getters['user/premium'];
      }
    },
    methods: {
      changePassword() {
        console.log(1);
      }
    }
  };
</script>

<style scoped>

</style>
