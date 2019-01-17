<template>
  <div>
    <header-component></header-component>
    <v-container class="mt-3">
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
                    8. Сверху с права располагаются элементы управления: <v-icon>menu</v-icon> <strong>меню калькулятора</strong> и <v-icon>person</v-icon> <strong>меню пользователя</strong>.
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
                  <v-img
                    :src="require('../static/img/help/newDocument.png')"
                  ></v-img>
                  <v-card-text>
                    1. При создании документа вам следует ввести название документа.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    2. Затем нажать на кнопку <v-icon>save</v-icon><strong>Сохранить</strong>. Находится снизу справа.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    3. Если вы передумали нажмине на кнопку <v-icon>close</v-icon><strong>Закрыть</strong>. Находится сверху слева.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    4. Для создания документа этих действий будет достаточно. О том как работать с документом читайте: <strong>Занесение данных и расчёт</strong>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2" color="warning">
                    insert_drive_file
                  </v-icon>
                  Занесение данных и расчёт
                </div>
                <v-card>
                  <v-img
                    :src="require('../static/img/help/workDocument.png')"
                  ></v-img>
                  <v-card-text>
                    1. При регистрации вы получили набор <strong>Позиций</strong> и <strong>Формул</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    2. <strong>Позиции</strong> - добавляются автоматически если вы вписываете новое значение. Так же позиции можно удалять.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    3. <strong>Формулы</strong> - формулы по умолчанию включают в себя базовые математические действие: <strong>Сложение</strong>, <strong>Вычитание</strong>, <strong>Умножение</strong>, <strong>Деление</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    4. Для добавления элемента расчёта вам следует выбрать <strong>Позицию</strong> и <strong>Формулу</strong> по которой будет выполнятся расчёт. Затем нажать на <v-icon>add</v-icon><strong>Добавить</strong>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    5. В документ будет добавлен элемент с выбранной <strong>Позицией</strong> и <strong>Формулой</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    6. Карточка элемента содержит название <strong>позиции</strong>, название <strong>формулы</strong>. <strong>Поля</strong> для занесения данных. В правом верхнем углу вы сможете найти <strong>формулу</strong>, а так же сумму расчёта. Ниже поле для <strong>комментария</strong>. В низу элемента вы найдёте кнопку <v-icon>delete</v-icon><strong>удаления</strong> элемента.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    7. Кнопку <v-icon>save</v-icon><strong>Сохранить</strong> документ вы найдёте внизу справа.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    8. Общую сумму расчёта ищите сверху после слова <strong>Всего</strong>.
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
                  <v-img
                    :src="require('../static/img/help/formulas.png')"
                  ></v-img>
                  <v-card-text>
                    1. Страница <strong>Формулы</strong> отображает созданные вами формулы. По умолчанию отображается 10 формул на страницу.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    2. На странице формул располагается кнопка создание формулы <v-icon>add</v-icon><strong>Создать</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    3. В таблице у каждой формулы есть активные кнопки <v-icon>edit</v-icon><strong>Редактировать</strong>, <v-icon>delete</v-icon><strong>Удалить</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    4. Для перехода в формулу нажмите на кнопку <v-icon>edit</v-icon> <strong>Редактировать</strong> или кликнуть по полю формулы в таблице.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    5. Для удаление формулы нажмите на кнопку <v-icon>delete</v-icon><strong>Удалить</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    6. Для поиска нужной вам формулы, используйте <v-icon>search</v-icon><strong>поиск</strong> в верхней части таблицы.
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
                    functions
                  </v-icon>
                  Создание формулы
                </div>
                <v-card>
                  <v-img
                    :src="require('../static/img/help/newFormula.png')"
                  ></v-img>
                  <v-card-text>
                    1. При создании формулы вам следует ввести название формулы.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    2. Затем нажать на кнопку <v-icon>save</v-icon><strong>Сохранить</strong>. Находится снизу справа.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    3. Если вы передумали нажмине на кнопку <v-icon>close</v-icon><strong>Закрыть</strong>. Находится сверху слева.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    4. Для создания формулы этих действий будет достаточно. О том как конструировать формулу читайте: <strong>Конструирование формулы</strong>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">
                  <v-icon class="mr-2" color="warning">
                    functions
                  </v-icon>
                  Конструирование формулы
                </div>
                <v-card>
                  <v-img
                    :src="require('../static/img/help/buildFormula.png')"
                  ></v-img>
                  <v-card-text>
                    1. Для конструирования формулы следует создать и назвать переменные для будущей формулы.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    2. Для создания переменной нажмите на кнопку <strong>Добавить</strong> под заголовком <strong>Переменные</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    3. Появится поле <strong>Переменной</strong>. Дайте название вашей переменной.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    4. У каждой <strong>Переменной</strong> есть кнопки управления: <v-icon>add</v-icon><strong>Добавить</strong><v-icon>remove</v-icon><strong>Убрать</strong><v-icon>delete</v-icon><strong>Удалить</strong>.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    5. Кнопки <v-icon>add</v-icon><strong>Добавить</strong> и <v-icon>remove</v-icon><strong>Убрать</strong> меняются при действии с переменной.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    6. При конструировании формулы вам доступны простые математические действия: <code>+</code><strong>Сложение</strong>, <code>-</code><strong>Вычетание</strong>, <code>*</code><strong>Умножение</strong>Умножение, <code>/</code><strong>Деление</strong>, а так же <code>( )</code><strong>Скобки</strong>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    7. Для добавление переменной в формулу нажмите <v-icon>add</v-icon><strong>Добавить</strong>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    8. Для добавление действия в формулу нажмите на нужное вам действие.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    9. Для удаления переменной из формулы нажмите <v-icon>remove</v-icon><strong>Убрать</strong>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    9. Ваша формула будет отображатся в специальном поле ниже заголовка <strong>Формула</strong>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    10. После того, как вы создали формулу, сохраните её нажав <v-icon>save</v-icon><strong>Сохранить</strong>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    11. Созданная и сохранённая формула будет отображатся в документе в выборе формул.
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
                  <v-card-text>
                    В разработке
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
