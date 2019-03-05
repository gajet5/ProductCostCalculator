<template>
  <v-app>
    <lock-screen-component></lock-screen-component>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import lockScreenComponent from './components/LockScreen';

  export default {
    components: {
      lockScreenComponent
    },
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
