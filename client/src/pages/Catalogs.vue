<template>
  <div>
    <header-component>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>add</v-icon>
      </v-btn>
    </header-component>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-breadcrumbs :items="breadcrumbs" divider=">" mb-0></v-breadcrumbs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';

  export default {
    async beforeMount() {
      await this.$store.dispatch('getTokenStatus');
      await this.$store.dispatch('getServerStatus');
      this.$store.commit('addBreadcrumbs', {
        text: 'Каталоги',
        disabled: false,
        href: '/catalogs'
      });
    },
    components: {
      headerComponent
    },
    computed: {
      breadcrumbs() {
        return this.$store.getters.breadcrumbs;
      }
    }
  };
</script>

<style scoped>

</style>
