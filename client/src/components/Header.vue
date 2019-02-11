<template>
  <v-toolbar
    color="indigo darken-1"
    dark
    scroll-off-screen
    scroll-target="#scrolling-techniques"
  >
    <v-toolbar-title @click="goToCatalogs" class="header-title">КП <span class="hidden-sm-and-down">- Калькулятор позиций</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu transition="slide-y-transition" nudge-bottom="50">
      <v-btn slot="activator" icon>
        <v-icon>menu</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="goToCatalogs">
          <v-list-tile-action>
            <v-icon>
              folder
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Каталоги
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goToFormulas">
          <v-list-tile-action>
            <v-icon>
              functions
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Формулы
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goToHelp">
          <v-list-tile-action>
            <v-icon>
              help
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Справка
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu transition="slide-y-transition" :nudge-bottom="50">
      <v-btn slot="activator" icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="goToSettings">
          <v-list-tile-action>
            <v-icon>
              settings
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Настройки
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logOut">
          <v-list-tile-action>
            <v-icon>
              input
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Выйти
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
  export default {
    props: ['title'],
    methods: {
      goToSettings() {
        this.$router.push('/user');
      },
      goToHelp() {
        this.$router.push('/help');
      },
      logOut() {
        this.$store.commit('setToken', '');
        this.$router.push('/');
      },
      goToCatalogs() {
        this.$router.push('/catalogs');
      },
      goToFormulas() {
        this.$router.push('/formulas');
      }
    }
  };
</script>

<style scoped>
  .header-title {
    cursor: pointer;
  }
</style>
