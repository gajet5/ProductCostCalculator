<template>
  <div class="p-relative">
    <div class="bgImg">
      <div class="bgColor">
      </div>
    </div>
    <v-container fill-height class="p-relative">
      <v-layout row justify-center align-center column>
        <p class="display-2 mb-5"
           style="color: #FAFAFA"
        >Подтверждение регистрации</p>
        <v-progress-linear
          v-show="loading"
          :indeterminate="true"
          color="amber"
        ></v-progress-linear>
        <v-flex
          v-show="!loading"
          xs6
        >
          <div class="text-status">
            <v-icon
              :color="icolor"
              size="90"
            >{{icon}}</v-icon>
            <h2>{{text}}</h2>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: true,
        icon: '',
        text: '',
        icolor: ''
      };
    },
    async mounted() {
      let result = await this.$store.dispatch('auth/confirm', { id: this.$route.params.id });
      this.loading = false;

      switch (result.status) {
        case 200:
          this.icon = 'done';
          this.text = 'Аккаунт подтверждён';
          this.icolor = 'green';

          setTimeout(() => {
            this.$router.push('/login');
          }, 5000);
          return;

        case 204:
        case 400:
          this.icon = 'warning';
          this.text = 'Аккаунт не найден';
          this.icolor = 'yellow';
          break;

        case 208:
          this.icon = 'warning';
          this.text = 'Аккаунт уже подтверждён';
          this.icolor = 'yellow';
          break;

        default:
          this.loading = false;
          this.icon = 'error';
          this.text = 'Ошибка запроса';
          this.icolor = 'red darken-1';
      }
      setTimeout(() => {
        this.$router.push('/');
      }, 5000);
    }
  };
</script>

<style scoped>
  .p-relative {
    position: relative;
    height: 100%;
  }

  .bgImg {
    position: absolute;
    background-image: url('../static/img/mainBG.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .bgColor {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(58, 58, 60, .6);
  }

  .text-status {
    text-align: center;
    color: white;
  }
</style>
