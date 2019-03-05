<template>
  <div class="p-relative">
    <div class="bgImg">
      <div class="bgColor">
      </div>
    </div>
    <div class="registration-wrapper">
      <h3 class="display-3 mb-2">Изменение пароля</h3>
      <v-form ref="changePasswordForm" v-model="formValid" autocomplete="off" @submit.prevent="">
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
        <v-text-field
          v-model.trim="rePassword"
          :append-icon="p2 ? 'visibility' : 'visibility_off'"
          @click:append="() => (p2 = !p2)"
          :type="p2 ? 'password' : 'text'"
          label="Повторите пароль"
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
          @click="changePassword"
        >изменить
        </v-btn>
      </v-form>
      <v-alert :value="changeStatus" :color="changeColorStatus" transition="scale-transition">
        {{ changeText }}
      </v-alert>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        changeStatus: false,
        changeColorStatus: '',
        changeText: ''
      };
    },
    methods: {
      async changePassword() {
        if (this.$refs.changePasswordForm.validate()) {
          let result = await this.$store.dispatch('auth/changePassword', {
            id: this.$route.params.id,
            password: this.password
          });

          switch (result.status) {
            case 200:
              this.changeStatus = true;
              this.changeColorStatus = 'success';
              this.changeText = 'Пароль успешно изменён';

              setTimeout(() => {
                this.changeStatus = false;
                this.$router.push('/login');
              }, 5000);
              break;

            default:
              this.changeStatus = true;
              this.changeColorStatus = 'error';
              this.changeText = 'В момент изменения пароля произошла ошибка';
              setTimeout(() => {
                this.changeStatus = false;
              }, 5000);
              break;
          }
        }
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
    /* .slide-fade-leave-active до версии 2.1.8 */
  {
    transform: translateX(90px);
    opacity: 0;
  }
</style>
