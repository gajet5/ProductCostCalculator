<template>
  <div>
    <header-component></header-component>
    <v-container>
      <v-layout>
        <v-flex>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </v-flex>
      </v-layout>
      <v-layout class="mt-3">
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  Название документа
                </h3>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';

  export default {
    created() {
      this.$store.dispatch('report/getDocument');
    },
    name: 'Report',
    components: {
      headerComponent
    },
    computed: {
      breadcrumbs() {
        return this.$route.meta.breadcrumb;
      }
    }
  };
</script>

<style scoped>

</style>
