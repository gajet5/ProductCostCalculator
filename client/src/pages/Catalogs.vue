<template>
  <div>
    <header-component>
      <v-btn icon>
        <v-icon>add</v-icon>
      </v-btn>
    </header-component>
    <v-container>
      <v-layout>
        <v-flex>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';

  export default {
    async beforeMount() {
      await this.$store.dispatch('getServerStatus');
      await this.$store.dispatch('getTokenStatus');
      await this.$store.dispatch('user/getUserInfo');

      this.$store.commit('setBreadcrumbs', {
        add: true,
        clear: true,
        item: {
          text: 'Каталог',
          disabled: false,
          href: '/catalogs'
        }
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
