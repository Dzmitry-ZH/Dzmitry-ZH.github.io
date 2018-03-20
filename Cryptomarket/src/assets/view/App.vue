<template>
  <div id="app">
    <table class="header">
      <tr>
        <td><span>Общая капитализация: </span>{{totalCoins.total_market_cap_usd | currency("$",0)}}</td>
        <td><span>Объем 24ч: </span>{{totalCoins.total_24h_volume_usd | currency("$",0)}}</td>
        <td><span>BTC доминация: </span>{{totalCoins.bitcoin_percentage_of_market_cap + '%'}}</td>
      </tr>
    </table>
    <div class="buttons" v-if="!signComplete">
      <router-link to='/sign-in'>
        <button class="btn btn-outline-primary">Войти</button>
      </router-link>
      <router-link to='/sign-up'>
        <button class="btn btn-outline-primary">Регистрация</button>
      </router-link>
    </div>
    <div class="buttons" v-if="signComplete">
      <router-link to='/cabinet'>
        <button class="btn btn-outline-primary">Личный кабинет</button>
      </router-link>
      <button class="btn btn-outline-primary" @click="logoutUser">Выйти</button>
    </div>
    <span class="registeredUser" v-if="signComplete">{{registrationName}}{{name}} – {{email}}</span>
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
    <router-view @addUser='registrationName = $event.displayName' :uid = 'uid'></router-view>
  </div>
</template>
<script>
  import firebase from 'firebase'

  export default {
    name: 'app',
    data() {
      return {
        search: '',
        title: 'Cryptomarket',
        totalCoins: {},
        email: '',
        uid: '',
        name: '',
        registrationName: '',
        signComplete: false,
        COINMARKETCAP_API_URI_TOTAL: "https://api.coinmarketcap.com/v1/global/",
        UPDATE_INTERVAL: 6000,
        showModal: false
      }
    },
    methods: {
      getTotalCoins: function () {
        //HTTP request using axios
        axios.get(this.COINMARKETCAP_API_URI_TOTAL)
          .then((resp) => this.totalCoins = resp.data)
          .catch(err => console.log(err))
      },
      getTotalCoinsInterval: function () {
        setInterval(function () {
          axios.get(this.COINMARKETCAP_API_URI_TOTAL)
            .then((resp) => this.totalCoins = resp.data)
            .catch(err => console.log(err))
        }.bind(this), this.UPDATE_INTERVAL)
      },
      logoutUser: function () {
        firebase.auth().signOut().then(() => {
          this.signComplete = false;
          this.$router.replace('/')
        })
      },
      enterMainUser: function () {
        var callbackUser = function (user) {
          if (user) {
            console.log('Вошел');
            this.email = user.email;
            this.uid = user.uid;
            this.name = user.displayName;
            this.signComplete = true;
            // console.log(this);
          } else {
            console.log('Вышел');
            this.signComplete = false;
          }
        }.bind(this);
        firebase.auth().onAuthStateChanged(callbackUser);
      }
    },
    created: function () {
      this.getTotalCoins();
      this.getTotalCoinsInterval();
      this.getTotalCoinsInterval();
      this.enterMainUser();
    }
  }
</script>

<style scoped>
  #app {
    height: 100px;
  }

  button {
    cursor: pointer;
  }

  .buttons {
    position: absolute;
    top: 8vw;
    right: 7vw;
  }

  .registeredUser {
    position: absolute;
    top: 5vw;
    right: 7vw;
    font-size: 1.4vw;
  }

  ::-webkit-input-placeholder {
    font-size: 1.2vw;
  }

  .btn {
    font-size: 1.4vw;
  }
</style>
