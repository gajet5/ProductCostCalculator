<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-icon slot="activator">
        queue
      </v-icon>

      <v-card>

        <v-card-text>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="bringIn"
          >
            Внести
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'SoftCalc',
    data() {
      return {
        dialog: false,
        result: 322
      };
    },
    methods: {
      bringIn() {
        this.$emit('bringIn', this.result);
        this.dialog = false;
      }
    }
  };
</script>

<style scoped>

</style>
