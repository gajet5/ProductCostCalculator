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
    created() {
      setInterval(() => this.$store.dispatch('serverStatus'), 1000 * 5);
    },
    data() {
      return {};
    }
  };
</script>

<style>
</style>
