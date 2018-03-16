<template>
  <div id='loginpage'>
    <div class="buttons">
      <button class="btn btn-secondary entrance" @click='switchSign("sign-in")'>Войти</button>
      <button class="btn btn-secondary registration" @click='switchSign("sign-up")'>Регистрация</button>
    </div>
      <sign-in v-if="sign === 'sign-in'" @addUser='email = $event.email, uid = $event.uid'></sign-in>
      <sign-up v-if="sign === 'sign-up'" @regSuccess='sign = $event'></sign-up>
    <span>{{email}}</span>
    <span>{{uid}}</span>
  </div>
</template>

<script>
  import SignIn from './SignIn.vue'
  import SignUp from './SignUp.vue'

  export default {
    name: "login-page",
    data() {
      return {
        sign: 'sign-in',
        email: '',
        uid: ''
      }
    },
    methods: {
      switchSign: function (currentSign) {
        this.sign = currentSign;
      }
    },
    components: {
      'sign-in': SignIn,
      'sign-up': SignUp
    }
  }
</script>

<style scoped>
  .btn-secondary:focus {
    background-color: #EEEEEE;
    box-shadow: none;
  }

  .buttons {
    width: 20vw;
    margin: 0 auto;
    margin-top: 2vw;
  }
</style>
