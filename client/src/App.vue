<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    async beforeCreate() {
      this.$store.commit('setToken', localStorage.getItem('token'));
    },
    data() {
      return {};
    }
  };
</script>

<style>
</style>
