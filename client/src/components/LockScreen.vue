<template>
  <v-dialog v-model="lockSceenToggle" persistent max-width="300">
    <v-card dark style="text-align:center;">
      <v-card-title class="headline justify-center">Ожидание сервера..</v-card-title>
      <v-card-text>Пожалуйста подождите, не закрывайте вкладку или браузер.</v-card-text>
      <v-progress-linear
        indeterminate
        color="#E0E0E0"
        class="mb-0"
      ></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    computed: {
      lockSceenToggle() {
        return !this.$store.getters['serverStatus'];
      }
    }
  };
</script>

<style scoped>
</style>
