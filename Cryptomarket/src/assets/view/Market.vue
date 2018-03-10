<template>
  <div id="market">
    <li class="search"><input type="text" v-model="search" placeholder="search..."></li>
    <table class="table table-hover">
      <thead>
      <tr>
        <td>№</td>
        <td>Имя</td>
        <td>Символ</td>
        <td :data-sortDirection='sortDirection' @click="SortPrice">Цена (USD)</td>
        <td>1H</td>
        <td>1D</td>
        <td>1W</td>
        <td>Объем(24H)</td>
        <td>Капитализация (USD)</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="coin in filterBy(coins,search)">
        <td>{{ coin.rank }}</td>
        <td><img :src="getCoinImage(coin.symbol)"> {{ coin.name}}</td>
        <td>{{ coin.symbol }}</td>
        <td>{{ coin.price_usd | currency}}</td>
        <td :style="getColor(coin.percent_change_1h)">
          <span v-if="coin.percent_change_1h > 0">+</span>{{ coin.percent_change_1h }}%
        </td>
        <td :style="getColor(coin.percent_change_24h)">
          <span v-if="coin.percent_change_24h > 0">+</span>{{ coin.percent_change_24h }}%
        </td>
        <td :style="getColor(coin.percent_change_7d)">
          <span v-if="coin.percent_change_7d > 0">+</span>{{ coin.percent_change_7d }}%
        </td>
        <td>{{ coin['24h_volume_usd'] | currency('$',0)}}</td>
        <td>{{ coin.market_cap_usd | currency('$',0)}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  const CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com/data/all/coinlist";
  const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com/v1/ticker/?limit=100";
  const IMAGE_URL = "https://www.cryptocompare.com";
  const UPDATE_INTERVAL = 1000;
  export default {
    name: 'market',
    data() {
      return {
        coins: [],
        coinData: [],
        search: '',
        sortDirection: ''
      }
    },
    methods: {
      getCoinData: function () {
        //HTTP request using axios
        axios.get(CRYPTOCOMPARE_API_URI)
          .then((resp) => {
            this.coinData = resp.data.Data;
            // this.getCoins();
          })
          .catch((err) => {
            // this.getCoins();
            console.log('Error', err.message);
          })
      },
      getCoins: function () {
        //HTTP request using axios
        this.interval = setInterval(function () {
          axios.get(COINMARKETCAP_API_URI)
            .then((resp) => {
              this.coins = resp.data;
              this.AutoSortPrice();
              return this.coins;
            })
            .catch(err => console.log(err))
        }.bind(this), UPDATE_INTERVAL)
      },
      getCoinImage: function (symbol) {
        try {
          if (symbol === 'MIOTA') {
            return IMAGE_URL + this.coinData['IOT'].ImageUrl;
          }
          else if (symbol === 'NANO') {
            return IMAGE_URL + this.coinData['XRB'].ImageUrl;
          }
          else {
            return IMAGE_URL + this.coinData[symbol].ImageUrl;
          }
        } catch (err) {
          return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
        }
      },
      getColor: (num) => {
        return num > 0 ? "color:green;" : "color:red;";
      },
      SortUp: function () {
        return this.coins.sort(function (a, b) {
          if (parseFloat(a.price_usd) > parseFloat(b.price_usd)) {
            return 1;
          }
          if (parseFloat(a.price_usd) < parseFloat(b.price_usd)) {
            return -1;
          }
          return 0;
        });
      },
      SortDown: function () {
        return this.coins.sort(function (a, b) {
          if (parseFloat(a.price_usd) > parseFloat(b.price_usd)) {
            return -1;
          }
          if (parseFloat(a.price_usd) < parseFloat(b.price_usd)) {
            return 1;
          }
          return 0;
        });
      },
      SortPrice: function () {
        // console.log('testSort');
        if (this.sortDirection === 'down') {
          this.sortDirection = 'up';
        }
        else {
          this.sortDirection = 'down';
        }
        if (this.sortDirection === 'down') {
          this.SortUp();
        }
        else {
          this.SortDown();
        }
      },
      AutoSortPrice: function () {
        // console.log('test');
        if (this.sortDirection === 'down') {
          this.SortUp();
        }
        if (this.sortDirection === 'up') {
          this.SortDown();
        }
      },
    },
    created: function () {
      this.getCoinData();
      this.getCoins();
    }
  }
</script>

<style scoped>
  thead tr td:nth-of-type(4) {
    cursor: pointer;
  }
</style>
