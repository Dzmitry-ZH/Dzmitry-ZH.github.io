<template>
  <div id="app">
    <table class="header" @addUser = 'email= $event.email'>
      <tr>
        <td><span>Общая капитализация: </span>{{totalCoins.total_market_cap_usd | currency("$",0)}}</td>
        <td><span>Объем 24ч: </span>{{totalCoins.total_24h_volume_usd | currency("$",0)}}</td>
        <td><span>BTC доминация: </span>{{totalCoins.bitcoin_percentage_of_market_cap + '%'}}</td>
      </tr>
    </table>
    <form @submit ='enterUser' class="registration">
      <input class="login form-control" v-model='user.email' type="text" placeholder='login'>
      <input class="password form-control" v-model='user.password' type="password" placeholder='password'>
      <button type="submit" class="btn btn-primary">Войти</button>
      <router-link to="/signup">Зарегистрироваться</router-link>
    </form>
    <h1>{{title}}</h1>
    <nav>
      <ul>
        <li>
          <router-link to='/'>Главная</router-link>
        </li>
        <li>
          <router-link to='/news'>Новости</router-link>
        </li>
        <li>
          <router-link to='/about'>Контакты</router-link>
        </li>
        <li></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
  import firebase from 'firebase'

  const COINMARKETCAP_API_URI_TOTAL = "https://api.coinmarketcap.com/v1/global/";
  const UPDATE_INTERVAL = 6000;
  export default {
    name: 'app',
    data() {
      return {
        search: '',
        title: 'Cryptomarket',
        totalCoins: {},
        email:'',
        user: {
          email: '',
          password: ''
        },
        mainPage:false
      }
    },
    methods: {
      getTotalCoins: function () {
        //HTTP request using axios
        axios.get(COINMARKETCAP_API_URI_TOTAL)
          .then((resp) => this.totalCoins = resp.data)
          .catch(err => console.log(err))
      },
      getTotalCoinsInterval: function () {
        setInterval(function () {
          axios.get(COINMARKETCAP_API_URI_TOTAL)
            .then((resp) => this.totalCoins = resp.data)
            .catch(err => console.log(err))
        }.bind(this), UPDATE_INTERVAL)
      },
      enterUser: function () {
        firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(response => {
          console.log(response);
          let information = {
            email: response.email
          }
          console.log(information.email);
          this.$emit('addUser',information);
        })
      }
    },
    created: function () {
      this.getTotalCoins();
      this.getTotalCoinsInterval();
    }
  }
</script>

<style scoped>
  #app {
    height: 100px;
  }

  .registration {
    position: absolute;
    top: 5vw;
    right: 6.4vw;
  }

  input.login,
  input.password {
    display: block;
    width: 16.5vw;
    margin: .5vw 0;
  }

  input[type='button'] {
    cursor: pointer;
  }

  ::-webkit-input-placeholder {
    font-size: 1.2vw;
  }
</style>
