<template>
  <div id="sign-up">
    <form @submit.prevent='registerUser' v-if="visible">
      <div class="form-group">
        <label for="email">Ваш email:</label>
        <input type="email" class="form-control" id="email" placeholder="Введите email:" required v-model="user.email">
      </div>
      <div class="form-group">
        <label for="name">Ваше имя:</label>
        <input type="text" class="form-control" id="name" placeholder="Введите имя:" required v-model="user.name">
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
      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>
    <div class="alert alert-success" role="alert" v-if='signSuccess'>
      <strong>Регистрация прошла успешно!</strong>
    </div>
    <div class="alert alert-danger" role="alert" v-if='errorPassword'>
      <strong>Пароли не совпадают или длина меньше 6 символов</strong>
    </div>
    <div class="alert alert-danger" role="alert" v-if='signError'>
      <strong>Пользователь с таким email уже существует</strong>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: "sign-up",
    data() {
      return {
        signSuccess: false,
        errorPassword: false,
        signError: false,
        visible: true,
        user: {
          email: '',
          password: '',
          name: '',
          confirmPassword: ''
        },
      }
    },
    methods: {
      registerUser: function () {
        if (this.user.password !== this.user.confirmPassword || this.user.password.length < 6) {
          this.errorPassword = true;
        }
        else {
          firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then(response => {
              response.updateProfile({displayName: this.user.name});
              this.signSuccess = true;
              this.signError = false;
              this.errorPassword = false;
              this.visible = false;
            })
            .catch(error => {
              console.log(error.message);
              this.signError = true;
              this.errorPassword = false;
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
