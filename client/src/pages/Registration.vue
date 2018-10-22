<template>
  <div class="p-relative">
    <div class="bgImg">
      <div class="bgColor">
      </div>
    </div>
    <div class="registration-wrapper">
      <h3 class="display-3 mb-2">Регистрация</h3>
      <v-form v-model="formValid" lazy-validation>
        <v-text-field
          v-model="email"
          label="Введите email"
          type="email"
          required
          dark
          color="grey lighten-5"
          :rules="emailRules"
          @change="checkEmail"
        >
        </v-text-field>
        <transition name="slide-fade">
          <div v-show="emailIsDublicate">
            <v-alert
              :value="true"
              outline
              color="warning">
              Адресс уже зарегистрирован
            </v-alert>
          </div>
        </transition>
        <v-text-field
          v-model="password"
          :append-icon="p1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (p1 = !p1)"
          :type="p1 ? 'password' : 'text'"
          label="Введите пароль"
          dark
          color="grey lighten-5"
          required
          :rules="passwordRules"
        >
        </v-text-field>
        <v-text-field
          v-model="rePassword"
          :append-icon="p2 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (p2 = !p2)"
          :type="p2 ? 'password' : 'text'"
          label="Повторите пароль"
          dark
          color="grey lighten-5"
          required
          :rules="passwordRules"
        >
        </v-text-field>

        <v-btn
          :disabled="valid"
          color="success"
          @click="registration"
        >Зарегистрироватся
        </v-btn>
        <v-btn
          flat
          color="grey lighten-2"
          @click="goToHomePage"
        >Назад
        </v-btn>
      </v-form>
      <v-alert :value="registred" color="success">
        Регистрация прошла успешно, добро пожаловать в клуб.
      </v-alert>
    </div>

  </div>
</template>

<script>
  import authServices from '../services/auth';
  import statusServices from '../services/status';

  export default {
    data() {
      return {
        registred: false,
        formValid: false,
        email: '',
        emailIsDublicate: false,
        password: '',
        p1: true,
        rePassword: '',
        p2: true,
        emailRules: [
          v => !!v || 'Почта должна быть указана',
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Почта должна быть валидной'
        ],
        passwordRules: [
          v => !!v || 'Пароль должен быть указан',
          v => /^[a-zA-Z0-9]{4,}$/.test(v) || 'Пароль должен быть валидным'
        ]
      }
    },
    computed: {
      valid() {
        if (this.email !== '' && this.password !== '' && this.rePassword !== '') {
          if (this.formValid && !this.emailIsDublicate && this.password === this.rePassword) {
            return false;
          }
        }
        return true;
      }
    },
    methods: {
      async registration() {
        this.formValid = false;

        let responce = await authServices.registration({
          email: this.email,
          password: this.password
        });
        if (responce.status === 200) {
          this.registred = true;
          setTimeout(() =>{
            this.$router.push('/');
          }, 5000)
        }
      },
      async checkEmail() {
        this.emailIsDublicate = false;

        let response = await authServices.emailExist(this.email);

        if (response.status === 200) {
          this.emailIsDublicate = true;
        } else {
          this.emailIsDublicate = false;
        }
      },
      goToHomePage() {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  .p-relative {
    position: relative;
    height: 100%;
  }

  .bgImg {
    position: absolute;
    background-image: url('../static/mainBG.jpg');
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

  form {
    display: flex;
    flex-direction: column;
    width: 250px;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .10s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(90px);
    opacity: 0;
  }

</style>
