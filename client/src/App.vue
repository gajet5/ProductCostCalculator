<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    async beforeCreate() {
      let result = this.$store.dispatch('serverStatus');
      console.log(`Результат в beforeCreate${result}`)
    },
    data() {
      return {}
    }
  }
</script>

<style>
</style>
