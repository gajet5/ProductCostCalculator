<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    async beforeCreate() {
      this.$store.dispatch('serverStatus');
    },
    data() {
      return {};
    }
  };
</script>

<style>
</style>
