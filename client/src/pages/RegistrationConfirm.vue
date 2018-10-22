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
          v-show="!loading"
          :indeterminate="true"
          color="amber"
        ></v-progress-linear>
        <v-flex
          v-show="loading"
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
  import authServices from '../services/auth';

  export default {
    data() {
      return {
        loading: false,
        icon: '',
        text: '',
        icolor: '',
      }
    },
    async mounted() {

      try {
        let result = await authServices.confirm(this.$route.params.id);
        this.loading = true;

        if (result.status === 200) {
          this.icon = 'done';
          this.text = 'Аккаунт подтверждён';
          this.icolor = 'green';
        } else if (result.status === 208) {
          this.icon = 'warning';
          this.text = 'Аккаунт уже подтверждён';
          this.icolor = 'yellow';
        }
      } catch (e) {
        this.loading = true;
        this.icon = 'error';
        this.text = 'Аккаунт не найден';
        this.icolor = 'red darken-1';
      }

      setTimeout(()=> {
        this.$router.push('/')
      }, 5000);
    }
  }
</script>

<style scoped>
  .p-relative {
    position: relative;
    height: 100%;
  }

  .bgImg {
    position: absolute;
    background-image: url('../static/mainBG.jpg');
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

  /*.registrationConfirm-wrapper {*/
  /*height: 100%;*/
  /*position: relative;*/
  /*color: white;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*flex-direction: column;*/
  /*}*/

  .text-status {
    text-align: center;
    color: white;
  }
</style>
