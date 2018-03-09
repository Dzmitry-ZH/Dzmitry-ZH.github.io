<template>
  <div id="app">
    <table class="header">
      <tr>
        <td><span>Общая капитализация: </span>{{totalCoins.total_market_cap_usd | currency("$",0)}}</td>
        <td><span>Объем 24ч: </span>{{totalCoins.total_24h_volume_usd | currency("$",0)}}</td>
        <td><span>BTC доминация: </span>{{totalCoins.bitcoin_percentage_of_market_cap + '%'}}</td>
      </tr>
    </table>
    <h1>{{title}}</h1>
    <nav>
      <ul>
        <li><router-link to='/'>Главная</router-link></li>
        <li><router-link to='/news'>Новости</router-link></li>
        <li><router-link to='/about' >О нас</router-link></li>
        <li></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
  const COINMARKETCAP_API_URI_TOTAL = "https://api.coinmarketcap.com/v1/global/";
  const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com/v1/ticker/?limit=100";
  const UPDATE_INTERVAL = 6000;
  export default {
    name: 'app',
    data() {
      return {
        search:'',
        coins: [],
        title: 'Cryptomarket',
        totalCoins: {}
      }
    },
    methods: {
      getTotalCoins: function () {
        //HTTP request using axios
        this.interval = setInterval(function () {
          axios.get(COINMARKETCAP_API_URI_TOTAL)
            .then((resp) => this.totalCoins = resp.data)
            .catch(err => console.log(err))
        }.bind(this), UPDATE_INTERVAL)
      },
      getCoins: function () {
        //HTTP request using axios
        this.interval = setInterval(function () {
          axios.get(COINMARKETCAP_API_URI)
            .then((resp) => this.coins = resp.data)
            .catch(err => console.log(err))
        }.bind(this), UPDATE_INTERVAL)
      },
    },
    created: function () {
      this.getTotalCoins();
      this.getCoins();
    }
  }
</script>

<style>
</style>
