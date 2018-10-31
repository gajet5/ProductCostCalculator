<template>
  <v-toolbar
    absolute
    color="indigo darken-1"
    dark
    scroll-off-screen
    scroll-target="#scrolling-techniques"
  >

    <v-toolbar-title>PCC - Каталоги</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>add</v-icon>
    </v-btn>
    <v-menu transition="slide-y-transition" :nudge-bottom="50">
      <v-btn slot="activator" icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-list>
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
    methods: {
      goToSettings() {
        console.log('Настройки');
      },
      logOut() {
        this.$store.dispatch('setToken', null);
        this.$store.dispatch('setUser', null);
        this.$router.push('/');
      }
    }
  };
</script>

<style scoped>

</style>
