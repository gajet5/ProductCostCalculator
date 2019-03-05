<template>
  <div>
    <section>
      <v-parallax :src="pralaxImgOne" height="600">
          <v-layout >
            <v-flex class="main-header__wrapper">
              <p class="display-2 text-xs-center text-uppercase mb-2 text--white text-shadow">Калькулятор позиций</p>
              <p class="headline text-xs-center text-uppercase text--white text-shadow">экономь своё время</p>
              <div class="text-xs-center">
                <v-btn @click="goToRegistration" color="info">Регистрация</v-btn>
                <v-btn @click="goToLogin" color="info">Войти</v-btn>
              </div>
              <div class="text-xs-center">

              </div>
            </v-flex>
          </v-layout>
      </v-parallax>
    </section>

    <section class="bg-gray pt-5">
      <v-layout
        column
        wrap
        align-center
      >
        <v-flex xs12 sm4 class="py-3">
          <div class="text-xs-center">
            <h2 class="headline">Помощник для вашего бизнеса</h2>
            <span class="subheading">Инструмент который всегда под рукой</span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Лаконичный дизайн</div>
                  </v-card-title>
                  <v-card-text>
                    При разработке калькулятора, я старался сделать его максимально удобным и понятным, так как сам буду его использовать.
                    Важно отметить, что калькулятором удобно пользоваться не только с ПК, но и с мобильного устройства.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Скорость работы</div>
                  </v-card-title>
                  <v-card-text>
                    В создании калькулятора, я использовал современные технологии хранения и обработки данных.
                    Подобный подход позволяет работать даже в дороге при плохом качестве связи не беспокоясь о потери данных.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">calendar_today</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Месяц доступа</div>
                  </v-card-title>
                  <v-card-text>
                    После регистрации вы получаете бесплатный полный доступ к сервису на 1 месяц.
                    После некоторые функции станут недоступными, вы сможете улучшить аккаунт в личном кабинете.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax :src="pralaxImgSecound" height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-3 text-xs-center text-shadow">Простой способ получить стоимость</div>
          <em class="text-shadow">Расчитать финальтую цену по нескольким позициям</em>
          <v-btn
            class="blue lighten-2 mt-5"
            dark
            large
            @click="goToLogin"
          >
            Войти
          </v-btn>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">О проекте</div>
              </v-card-title>
              <v-card-text>
                Этот калькулятор был создан для облегчения подсчёта суммы по нескольким позициям.
                Особенностью данного калькулятора является функционал создания собственных формул для ведения расчётов.
                Главная цель для меня, сделать ресурс удобным для работы с мобильного телефона.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Как связатся</div>
              </v-card-title>
              <v-card-text>
                Если у вас есть идея как улучшить функционал или вы нашли ошибку, пишите.
              </v-card-text>
              <v-list class="transparent">
                <!--<v-list-tile>-->
                  <!--<v-list-tile-action>-->
                    <!--<v-icon class="blue&#45;&#45;text text&#45;&#45;lighten-2">phone</v-icon>-->
                  <!--</v-list-tile-action>-->
                  <!--<v-list-tile-content>-->
                    <!--<v-list-tile-title>777-867-5309</v-list-tile-title>-->
                  <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--<v-list-tile>-->
                  <!--<v-list-tile-action>-->
                    <!--<v-icon class="blue&#45;&#45;text text&#45;&#45;lighten-2">place</v-icon>-->
                  <!--</v-list-tile-action>-->
                  <!--<v-list-tile-content>-->
                    <!--<v-list-tile-title>Chicago, US</v-list-tile-title>-->
                  <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>ilf@bk.ru</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <v-footer class="grey darken-3">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3 text-xs-center">
            Создано
            <a class="white--text" href="mailto:ilf@bk.ru" target="_blank">Ilya Zadonsky</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pralaxImgOne: require('../static/img/mainBG.jpg'),
        pralaxImgSecound: require('../static/img/mainSecound.jpg')
      };
    },
    methods: {
      goToRegistration() {
        this.$router.push('/registration');
      },
      goToLogin() {
        this.$router.push('/login');
      }
    }
  };
</script>

<style scoped>
  .main-header__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .text-shadow {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.84);
  }

  .bg-gray {
    background-color: #f5f5f5;
  }

  .text-logo {
    color: #212121;
    text-transform: uppercase;
  }

</style>
