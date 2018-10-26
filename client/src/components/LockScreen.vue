<template>
  <v-dialog v-model="lockSceenToggle" persistent max-width="300">
    <v-card dark style="text-align:center;">
      <v-card-title class="headline justify-center">Ожидание сервера..</v-card-title>
      <v-card-text>Please stand by & don't close the tab</v-card-text>
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
        return this.$store.getters['serverStatus'];
      }
    }
  };
</script>

<style scoped>
  .hide {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.4);
    z-index: 100;
  }
</style>
