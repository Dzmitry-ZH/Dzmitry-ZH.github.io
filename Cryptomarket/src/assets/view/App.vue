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
        <button type="submit" class="btn btn-outline-primary">Войти</button>
      </router-link>
      <router-link to='/sign-up'>
        <button type="submit" class="btn btn-outline-primary">Регистрация</button>
      </router-link>
    </div>
    <div class="buttons" v-if="signComplete">
      <router-link to='/cabinet'>
        <button class="btn btn-outline-primary">Личный кабинет</button>
      </router-link>
      <!--<router-link to='/'>-->
      <button class="btn btn-outline-primary" @click="logoutUser">Выйти</button>
      <!--</router-link>-->
    </div>
    <span class="registeredUser" v-if="signComplete">{{name}} – {{email}}</span>
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
    <router-view
      @addUser='email = $event.email, uid = $event.uid, signComplete = $event.signComplete, name = $event.displayName'></router-view>
    <!--<button id="show-modal" @click="showModal = true">Show Modal</button>-->
    <!--&lt;!&ndash; use the modal component, pass in the prop &ndash;&gt;-->
    <!--<modal v-if="showModal" @close="showModal = false">-->
    <!--&lt;!&ndash;-->
    <!--you can use custom content here to overwrite-->
    <!--default content-->
    <!--&ndash;&gt;-->
    <!--<h3 slot="header">custom header</h3>-->
    <!--</modal>-->
  </div>
</template>
<script>
  import firebase from 'firebase'
  import modal from './Modal'

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
        signComplete: false,
        COINMARKETCAP_API_URI_TOTAL: "https://api.coinmarketcap.com/v1/global/",
        UPDATE_INTERVAL: 6000,
        showModal: false
      }
    },
    components: {
      modal
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
  }

  ::-webkit-input-placeholder {
    font-size: 1.2vw;
  }
</style>
