<template>
  <form @submit.prevent='registerUser'>
    <div class="form-group">
      <label for="email">Ваш email:</label>
      <input type="email" class="form-control" id="email" placeholder="Введите email:" required v-model="user.email">
    </div>
    <div class="form-group">
      <label for="password">Ваш пароль:</label>
      <input type="password" class="form-control" id="password" placeholder="Введите пароль:" required
             v-model="user.password">
    </div>
    <div class="form-group">
      <label for="password2">Повторите пароль:</label>
      <input type="password" class="form-control" id="password2" placeholder="Повторите пароль:" required
             v-model="user.confirmPassword">
    </div>
    <div class="alert alert-danger" role="alert" v-if='error'>
      <strong>Пароли не совпадают или длина меньше 6 символов</strong>
    </div>
    <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
  </form>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: "sign-up",
    data() {
      return {
        user: {
          email: '',
          password: '',
          confirmPassword: ''
        },
        error: false
      }
    },
    methods: {
      registerUser: function () {
        if (this.user.password !== this.user.confirmPassword || this.user.password.length < 6) {
          this.error = true;
        }
        else {
          firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(function (user) {
           this.$router.replace('/')
          })
        }
      }
    }
  }
</script>

<style scoped>
  form {
    width: 20vw;
    margin: 0 auto;
    margin-top: 2vw;
  }

  button {
    width: 15vw;
    margin-left: 2.5vw;
  }
</style>
