<template>
  <header-component title="PCC - Каталоги">
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon @click="status">
      <v-icon>add</v-icon>
    </v-btn>
  </header-component>
</template>

<script>
  import headerComponent from '../components/Header';

  export default {
    components: {
      headerComponent
    }
  };
</script>

<style scoped>

</style>
