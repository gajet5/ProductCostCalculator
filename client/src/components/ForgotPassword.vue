<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        flat
        color="grey lighten-2"
      >Забыли пароль?
      </v-btn>
      <v-card>
        <v-card-title
          class="headline indigo darken-2 pb-4"
          primary-title
        >
          <span class="t-color_white">Форма восстановления пароля</span>
        </v-card-title>

        <v-card-text>
          <p>На указанный email будет отправлена инструкция для восстановления пароля.</p>
          <v-form v-model="formValid" @submit.prevent="send">
            <v-text-field
              v-model.trim="email"
              label="Введите email"
              type="email"
              required
              color="grey lighten-5"
              :rules="emailRules"
              maxlength="100"
              counter
            >
            </v-text-field>
          </v-form>
          <v-alert
            :value="error"
            :type="alertType"
            transition="scale-transition"
          >
            {{ errorText }}
          </v-alert>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            flat
            @click="send"
          >
            Отправить
          </v-btn>
          <v-btn
            color="error"
            flat
            @click="close"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ForgotPassword',
    data() {
      return {
        dialog: false,
        email: '',
        emailRules: [
          v => !!v || 'Почта должна быть указана.',
          v => /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/.test(v) || 'Почта должна быть валидной.'
        ],
        formValid: false,
        error: false,
        alertType: 'info',
        errorText: ''
      };
    },
    methods: {
      async send() {
        let result = await this.$store.dispatch('auth/forgotPassword', this.email);
        if (result.status === 200) {
          this.error = true;
          this.alertType = 'success';
          this.errorText = result.data.message;
          setTimeout(() => {
            this.error = false;
            this.close();
          }, 5000);
        } else {
          this.error = true;
          this.alertType = 'error';
          this.errorText = result.data.message;

          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      },
      close() {
        this.email = '';
        this.dialog = false;
      }
    }
  };
</script>

<style scoped>
  .t-color_white {
    color: white;
  }
</style>
