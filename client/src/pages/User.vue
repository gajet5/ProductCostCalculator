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
                  <span class="grey--text">Тип аккаунта: {{userStatus  ? 'Стандарт' : 'Демо'}}</span>
                </div>
                <v-spacer></v-spacer>
                <div v-show="userStatus">
                  <span>Полный доступ: {{premiumDateEnd}}</span>
                </div>
              </v-card-title>
              <div>
                <v-alert
                  :value="shopWarningEmailConfirm"
                  type="warning"
                >
                  Email не поддтверждён, функционал ограничен.
                </v-alert>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="success" v-show="shopWarningEmailConfirm" @click="reConfirmEmail">Подтвердить email</v-btn>
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
              <h3 class="headline mb-0">
                Активировать аккаунт
              </h3>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="sendConfirmEmail"
      :color="sendConfirmEmailStatus"
      :timeout="6000"
    >
      {{ sendConfirmEmailText }}
      <v-btn
        dark
        flat
        @click="sendConfirmEmail = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';
  import moment from 'moment';

  moment.locale('ru');

  export default {
    async beforeMount() {
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
      headerComponent
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
        ],
        sendConfirmEmail: false,
        sendConfirmEmailStatus: '',
        sendConfirmEmailText: ''
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
      async changePassword() {
        let result = await this.$store.dispatch('user/changePassword', this.password);
        if (result) {
          this.$store.commit('setToken');
          this.$router.push('/');
        }
      },
      async reConfirmEmail() {
        let result = await this.$store.dispatch('user/reConfirmEmail');

        if (result.status === 200) {
          this.sendConfirmEmail = true;
          this.sendConfirmEmailStatus = 'success';
          this.sendConfirmEmailText = 'Сообщение отправлено.';
        } else {
          this.sendConfirmEmail = true;
          this.sendConfirmEmailStatus = 'error';
          this.sendConfirmEmailText = result.data.message;
        }
      }
    }
  };
</script>

<style scoped>

</style>
