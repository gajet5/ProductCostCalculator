<template>
  <div class="p-relative">
    <div class="bgImg">
      <div class="bgColor">
      </div>
    </div>
    <div class="registration-wrapper">
      <h3 class="display-3 mb-5">Вход</h3>
      <v-form ref="loginForm" v-model="formValid" @submit.prevent="">
        <v-text-field
          v-model.trim="email"
          label="Введите email"
          type="email"
          required
          dark
          color="grey lighten-5"
          :rules="emailRules"
          maxlength="100"
          counter
        >
        </v-text-field>
        <v-text-field
          v-model.trim="password"
          :append-icon="p1 ? 'visibility' : 'visibility_off'"
          @click:append="() => (p1 = !p1)"
          :type="p1 ? 'password' : 'text'"
          label="Введите пароль"
          dark
          color="grey lighten-5"
          required
          :rules="passwordRules"
          maxlength="100"
          counter
        >
        </v-text-field>
        <v-btn
          type="submit"
          :disabled="!formValid"
          color="success"
          @click="login"
        >Войти
        </v-btn>
        <forgot-password></forgot-password>
        <v-btn
          flat
          color="grey lighten-2"
          @click="goToHomePage"
        >Назад
        </v-btn>
      </v-form>
      <v-alert :value="loginError" color="error">
        {{ loginErrorText }}
      </v-alert>
    </div>

  </div>
</template>

<script>
  import ForgotPassword from '../components/ForgotPassword';

  export default {
    components: { ForgotPassword },
    comments: {
      ForgotPassword
    },
    data() {
      return {
        serverStatus: true,
        formValid: false,
        loginError: false,
        loginErrorText: '',
        email: '',
        password: '',
        p1: true,
        emailRules: [
          v => !!v || 'Почта должна быть указана.',
          v => /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/.test(v) || 'Почта должна быть валидной.'
        ],
        passwordRules: [
          v => !!v || 'Пароль должен быть указан.',
          v => /^[a-zA-Z0-9]{4,}$/.test(v) || 'Пароль должен быть валидным.'
        ]
      };
    },
    computed: {},
    methods: {
      async login() {
        await this.$store.dispatch('getServerStatus');

        if (!this.$store.getters.serverStatus) {
          return;
        }

        let result = await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        });

        switch (result.status) {
          case 200:
            this.$store.commit('setToken', result.data.token);
            setTimeout(() => {
              this.$router.push('/catalogs');
            }, 1000);

            break;

          case 403:
            this.$store.commit('setToken', '');
            this.loginErrorText = 'Введены неверные данные для авторизации.';
            this.loginError = true;
            break;

          default:
            this.$store.commit('setToken', '');
            this.loginErrorText = 'Во время входа произошла ошибка, попробуйте ещё раз.';
            this.loginError = true;
            break;
        }

        setTimeout(() => {
          this.loginError = false;
          this.loginErrorText = '';
        }, 1000 * 5);
      },
      goToHomePage() {
        this.$router.push('/');
      },
      clear() {
        this.$refs.loginForm.reset();
      }
    }
  };
</script>

<style scoped>
  .p-relative {
    position: relative;
    height: 100%;
  }

  .bgImg {
    position: absolute;
    background-image: url('../static/img/mainBG.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .bgColor {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(58, 58, 60, .6);
  }

  .registration-wrapper {
    height: 100%;
    position: relative;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  h2 {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 250px;
  }

</style>
