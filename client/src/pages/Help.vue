<template>
  <div>
    <header-component></header-component>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <h3 class="headline">Калькулятор позиций - Справка</h3>
            </v-card-title>
            <v-expansion-panel popout>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2" color="info">
                    folder
                  </v-icon>
                  Каталоги
                </div>
                <v-card>
                  <v-img
                    :src="require('../static/img/help/catalogs.png')"

                  ></v-img>
                  <v-card-text>
                    1. Страница <strong>Каталоги</strong> отображает созданные вами каталоги. По умолчанию отображается 10 каталогов на страницу.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    2. На странице каталогов располагается кнопка создание каталога <v-icon>add</v-icon><strong>Создать</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    3. В таблице у каждого каталога есть активные кнопки <v-icon>input</v-icon><strong>Войти</strong>, <v-icon>edit</v-icon><strong>Редактировать</strong>, <v-icon>delete</v-icon><strong>Удалить</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    4. Сверху с права располагаются элементы управления: <v-icon>menu</v-icon> <strong>меню калькулятора</strong> и <v-icon>person</v-icon> <strong>меню пользователя</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    5. Для перехода в каталог нажмите на кнопку <v-icon>input</v-icon> <strong>Войти</strong> или кликнуть по полю каталога в таблице.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    6. Для редактирования названия каталога нажмите на кнопку <v-icon>edit</v-icon><strong>Редактировать</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    7. Для удаление каталога нажмите на кнопку <v-icon>delete</v-icon><strong>Удалить</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    8. Для поиска нужного вам каталога, используйте <v-icon>search</v-icon><strong>поиск</strong> в верхней части таблицы.
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2" color="success">
                    folder
                  </v-icon>
                  Создание каталога
                </div>
                <v-card>
                  <v-img
                    :src="require('../static/img/help/newCatalog.png')"
                  ></v-img>
                  <v-card-text>
                    1. При создании каталога вам следует ввести название каталога.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    2. Затем нажать на кнопку <v-icon>save</v-icon><strong>Сохранить</strong>. Находится снизу справа.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    3. Если вы передумали нажмине на кнопку <v-icon>close</v-icon><strong>Закрыть</strong>. Находится сверху слева.
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2" color="info">
                    insert_drive_file
                  </v-icon>
                  Документы
                </div>
                <v-card>
                  <v-img
                    :src="require('../static/img/help/documents.png')"
                  ></v-img>
                  <v-card-text>
                    1. Страница <strong>Документы</strong> отображает созданные вами каталоги. По умолчанию отображается 10 каталогов на страницу.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    2. На странице документов располагается кнопка создание каталога <v-icon>add</v-icon><strong>Создать</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    3. У каждого документа в таблице указана общая сумма подсчёта.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    4. В таблице у каждого документа есть активные кнопки <v-icon>edit</v-icon><strong>Редактировать</strong>, <v-icon>delete</v-icon><strong>Удалить</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    5. Для перехода в документ нажмите на кнопку <v-icon>edit</v-icon> <strong>Редактировать</strong> или кликнуть по полю документа в таблице.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    6. Для удаление каталога нажмите на кнопку <v-icon>delete</v-icon><strong>Удалить</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    7. Для поиска нужного вам каталога, используйте <v-icon>search</v-icon><strong>поиск</strong> в верхней части таблицы.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    7. Сверху с права располагаются элементы управления: <v-icon>menu</v-icon> <strong>меню калькулятора</strong> и <v-icon>person</v-icon> <strong>меню пользователя</strong>.
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2" color="success">
                    insert_drive_file
                  </v-icon>
                  Создание документ
                </div>
                <v-card>
                  <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2" color="warning">
                    insert_drive_file
                  </v-icon>
                  Занесение данных в документ
                </div>
                <v-card>
                  <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2" color="info">
                    functions
                  </v-icon>
                  Формулы
                </div>
                <v-card>
                  <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2" color="success">
                    functions
                  </v-icon>
                  Создание формулы
                </div>
                <v-card>
                  <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2">
                    person
                  </v-icon>
                  Личный кабинет
                </div>
                <v-card>
                  <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-card-text>Не нашли ответа на вопрос, пишите: ilf@bk.ru</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';

  export default {
    components: {
      headerComponent
    }
  };
</script>

<style scoped>

</style>
