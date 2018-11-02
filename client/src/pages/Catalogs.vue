<template>
  <header-component title="PCC - Каталоги">
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>add</v-icon>
    </v-btn>
  </header-component>
</template>

<script>
  import headerComponent from '../components/Header';

  export default {
    async beforeMount() {
      await this.$store.dispatch('getTokenStatus');
      await this.$store.dispatch('getServerStatus');
    },
    components: {
      headerComponent
    }
  };
</script>

<style scoped>

</style>
