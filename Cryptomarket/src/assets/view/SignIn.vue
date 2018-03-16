<template>
  <form @submit.prevent='enterUser'>
    <div class="form-group">
      <label for="email">Ваш email:</label>
      <input type="email" class="form-control" id="email" placeholder="Введите email:" required v-model="user.email">
    </div>
    <div class="form-group">
      <label for="password">Ваш пароль:</label>
      <input type="password" class="form-control" id="password" placeholder="Введите пароль:" required
             v-model="user.password">
    </div>
    <button type="submit" class="btn btn-primary">Войти</button>
  </form>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: "sign-in",
    data() {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      enterUser: function () {
        firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
          .then(response => {
            console.log(response);
            let information = {
              email: response.email,
              uid: response.uid
            }
            this.$emit('addUser',information)
          })
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
