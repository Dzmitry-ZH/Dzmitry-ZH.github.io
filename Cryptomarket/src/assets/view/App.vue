<template>
  <div id="app">
    <table class="header">
      <tr>
        <td><span>Общая капитализация: </span>{{totalCoins.total_market_cap_usd | currency("$",0)}}</td>
        <td><span>Объем 24ч: </span>{{totalCoins.total_24h_volume_usd | currency("$",0)}}</td>
        <td><span>BTC доминация: </span>{{totalCoins.bitcoin_percentage_of_market_cap + '%'}}</td>
      </tr>
    </table>
    <router-link to='/loginpage'>
      <button type="submit" class="btn btn-primary entrance">Войти</button>
    </router-link>
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

  export default {
    name: 'app',
    data() {
      return {
        search: '',
        title: 'Cryptomarket',
        totalCoins: {},
        email: '',
        user: {
          email: '',
          password: ''
        },
        COINMARKETCAP_API_URI_TOTAL: "https://api.coinmarketcap.com/v1/global/",
        UPDATE_INTERVAL: 6000
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

  .entrance {
    position: absolute;
    width: 16.5vw;
    top: 10vw;
    right: 7vw;
    margin-top: -.5vw;
  }

  button {
    cursor: pointer;
  }

  ::-webkit-input-placeholder {
    font-size: 1.2vw;
  }
</style>
