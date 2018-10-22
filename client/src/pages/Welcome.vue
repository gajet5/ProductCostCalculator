<template>
  <div>
    <section>
      <v-parallax :src="pralaxImgOne" height="600">
          <v-layout column>
            <v-flex class="text-sm-right">
              <v-btn small>Войти</v-btn>
            </v-flex>
            <v-flex>
              <p class="display-2 text-xs-center text-logo mb-2">Калькулятор Стоимости Продукта</p>
              <p class="headline text-xs-center text-logo">экономь своё время</p>
              <div class="text-xs-center">
                <v-btn @click="goToRegistration" color="info">Регистрация</v-btn>
              </div>
            </v-flex>
          </v-layout>
      </v-parallax>
    </section>

    <section class="bg-gray">
      <v-layout
        column
        wrap
        class="my-5"
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
                    Мы разрабатывали приложение которое сами будем использовать, поэтому мы пожошли основательно к вопросам дизайна.
                    Каждый элемент интерфейса продуман и располагается в том месте где им удобнее всего пользоватся.
                    Благодаря вам мы делаем продукт которым удобно пользоватся.
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
                    Простота дизайна позволяет получить высокую скорость загрузки инструмента.
                    Мы не украшаем ненужными бантиками рабочий инструмент, тут нехватает глубины чтоб все блоки смотелись хорошо.
                    Обязательно нужно придумать сюда какой либо текст для полноты картины, пока опишу так.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Открыты для предложений</div>
                  </v-card-title>
                  <v-card-text>
                    Мы рады получать обратную связь о нашем продукте, благодая отзывам мы становится лучше.
                    Создавая сложный инструмент нет возможности знать наверняка, что нужно именно вам.
                    Пишите нам предложения как мы можем улучшить продукт для вас.
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
          <div class="headline white--text mb-3 text-xs-center text-shadow">Простой способ расчитать стоимость</div>
          <em class="text-shadow">Посчитай стоимость продукта уже сейчас</em>
          <v-btn
            class="blue lighten-2 mt-5"
            dark
            large
            href="/pre-made-themes"
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
                <div class="headline">Company info</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Contact us</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
              </v-card-text>
              <v-list class="transparent">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>777-867-5309</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">place</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Chicago, US</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>john@vuetifyjs.com</v-list-tile-title>
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
        pralaxImgOne: require('../static/mainBG.jpg'),
        pralaxImgSecound: require('../static/mainSecound.jpg')
      }
    },
    methods: {
      goToRegistration() {
        this.$router.push('/registration')
      },
      goToLogin() {
        this.$router.push('/login')
      }
    }

  }
</script>

<style scoped>
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
