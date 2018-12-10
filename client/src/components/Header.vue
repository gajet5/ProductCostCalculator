<template>
  <v-toolbar
    color="indigo darken-1"
    dark
    scroll-off-screen
    scroll-target="#scrolling-techniques"
  >
    <v-toolbar-title @click="goToHome" class="header-title">PCC - Калькуляция себестоимости продукции</v-toolbar-title>
    <v-spacer></v-spacer>
    <slot></slot>
    <v-menu transition="slide-y-transition" :nudge-bottom="50">
      <v-btn slot="activator" icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="goToFormulas">
          <v-list-tile-title>Формулы</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goToSettings">
          <v-list-tile-title>Настройки</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logOut">
          <v-list-tile-title>Выйти</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar>
</template>

<script>
  export default {
    props: ['title'],
    methods: {
      goToFormulas() {
        this.$router.push('/formulas');
      },
      goToSettings() {
        this.$router.push('/user');
      },
      goToHome() {
        this.$router.push('/');
      },
      logOut() {
        this.$store.commit('setToken', '');
        this.$router.push('/');
      }
    }
  };
</script>

<style scoped>
.header-title {
  cursor: pointer;
}
</style>
