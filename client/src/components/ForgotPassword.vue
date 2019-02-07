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
        @click="goToHomePage"
      >Забыли пароль?
      </v-btn>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Форма восстановления пароля
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
          v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Почта должна быть валидной.'
        ],
        formValid: false
      };
    },
    methods: {
      send() {
        console.log(this.email);
        this.close();
      },
      close() {
        this.email = '';
        this.dialog = false;
      }
    }
  };
</script>

<style scoped>

</style>
