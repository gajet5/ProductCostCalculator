<template>
  <div class="p-relative">
    <lock-screen></lock-screen>
    <div class="bgImg">
      <div class="bgColor">
      </div>
    </div>
    <div class="registration-wrapper">
      <h3 class="display-3 mb-5">Вход</h3>
      <v-form ref="loginForm" v-model="formValid">
        <v-text-field
          v-model.trim="email"
          label="Введите email"
          type="email"
          required
          dark
          color="grey lighten-5"
          :rules="emailRules"
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
        >
        </v-text-field>

        <v-btn
          :disabled="!formValid"
          color="success"
          @click="login"
        >Войти
        </v-btn>
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
  import lockScreen from '../components/LockScreen';

  export default {
    components: {
      lockScreen
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
          v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Почта должна быть валидной.'
        ],
        passwordRules: [
          v => !!v || 'Пароль должен быть указан.',
          v => /^[a-zA-Z0-9]{4,}$/.test(v) || 'Пароль должен быть валидным.'
        ]
      };
    },
    computed: {
    },
    methods: {
      async login() {
        let result = await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        });

        switch (result.status) {
          case 200:
            // localStorage.setItem('user-token', result.data.token);
            this.$store.dispatch('setToken', result.data.token);
            this.$store.dispatch('setUser', result.data.user);
            setTimeout(() => {
              this.$router.push('/catalogs');
            }, 1000);

            break;

          case 403:
            this.loginErrorText = 'Введены неверные данные для авторизации.';
            this.loginError = true;
            // localStorage.removeItem('user-token');
            break;

          default:
            this.loginErrorText = 'Во время входа произошла ошибка, попробуйте ещё раз.';
            this.loginError = true;
            // localStorage.removeItem('user-token');
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
