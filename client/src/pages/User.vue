<template>
  <div>
    <header-component>
      <!--<v-btn icon>-->
      <!--<v-icon>search</v-icon>-->
      <!--</v-btn>-->

      <!--<v-btn icon>-->
      <!--<v-icon>add</v-icon>-->
      <!--</v-btn>-->
    </header-component>
    <v-container pb-0>
      <v-layout>
        <v-flex xs12>
            <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline">Настройка аккаунта</h3>
                <h4>Смена пароля</h4>
                <v-form v-model="changePasswordValid">
                  <v-text-field
                    v-model="oldPassword"
                    label="Старый пароль"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="newPassword"
                    :rules="passwordRules"
                    label="Новый пароль"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="reNewPassword"
                    :rules="passwordRules"
                    label="Новый пароль ещё раз"
                    required
                  ></v-text-field>
                  <v-btn>Очистить</v-btn>
                  <v-btn
                    color="success"
                    :disabled="!changePasswordValid"
                  >
                    Обновить
                  </v-btn>
                </v-form>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';

  export default {
    beforeMount() {
      this.$store.commit('addBreadcrumbs', {
        text: 'Личный кабинет',
        disabled: false,
        href: '/user'
      });
    },
    beforeDestroy() {
      this.$store.commit('deleteLastBreadcrumbs');
    },
    components: {
      headerComponent
    },
    data() {
      return {
        changePasswordValid: false,
        oldPassword: '',
        newPassword: '',
        reNewPassword: '',
        passwordRules: [
          v => !!v || 'Пароль должен быть указан',
          v => /^[a-zA-Z0-9]{4,}$/.test(v) || 'Пароль должен быть валидным',
          v => v === this.password || 'Пароли должны совпадать'
        ]
      };
    },
    computed: {
      breadcrumbs() {
        return this.$store.getters.breadcrumbs;
      }
    }
  };
</script>

<style scoped>

</style>
