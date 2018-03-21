<template>
  <div id="market">
    <li class="search"><input type="text" class="form-control search-input" v-model="search" placeholder="search...">
    </li>
    <table class="table table-hover table-responsive">
      <thead>
      <tr>
        <td>№</td>
        <td>Имя</td>
        <td>Символ</td>
        <td :data-sortDirection='sortDirection' data-type='price_usd' @click="Sort">Цена (USD)</td>
        <td :data-sortDirection='sortDirection' data-type='percent_change_1h' @click="Sort">1H</td>
        <td :data-sortDirection='sortDirection' data-type='percent_change_24h' @click="Sort">1D</td>
        <td :data-sortDirection='sortDirection' data-type='percent_change_7d' @click="Sort">1W</td>
        <td :data-sortDirection='sortDirection' data-type='24h_volume_usd' @click="Sort">Объем(24H)</td>
        <td :data-sortDirection='sortDirection' data-type='market_cap_usd' @click="Sort">Капитализация (USD)</td>
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
  export default {
    name: 'market',
    data() {
      return {
        coins: [],
        coinData: [],
        search: '',
        sortDirection: '',
        type: '',
        CRYPTOCOMPARE_API_URI: "https://min-api.cryptocompare.com/data/all/coinlist",
        COINMARKETCAP_API_URI: "https://api.coinmarketcap.com/v1/ticker/?limit=100",
        IMAGE_URL: "https://www.cryptocompare.com",
        UPDATE_INTERVAL: 6000
      }
    },
    methods: {
      getCoinData: function () {
        //HTTP request using axios
        axios.get(this.CRYPTOCOMPARE_API_URI)
          .then((resp) => {
            this.coinData = resp.data.Data;
          })
          .catch((err) => {
            console.log('Error', err.message);
          })
      },
      getCoinsInterval: function () {
        setInterval(function () {
          axios.get(this.COINMARKETCAP_API_URI)
            .then((resp) => {
              this.coins = resp.data;
              this.AutoSort();
              return this.coins;
            })
            .catch(err => console.log(err))
        }.bind(this), this.UPDATE_INTERVAL)
      },
      getCoins: function () {
        //HTTP request using axios
        axios.get(this.COINMARKETCAP_API_URI)
          .then((resp) => {
            this.coins = resp.data;
            this.AutoSort();
            return this.coins;
          })
          .catch(err => console.log(err))
      },
      getCoinImage: function (symbol) {
        try {
          if (symbol === 'MIOTA') {
            return this.IMAGE_URL + this.coinData['IOT']['ImageUrl'];
          }
          else if (symbol === 'NANO') {
            return this.IMAGE_URL + this.coinData['XRB']['ImageUrl'];
          }
          else {
            return this.IMAGE_URL + this.coinData[symbol]['ImageUrl'];
          }
        } catch (err) {
          return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
        }
      },
      getColor: (num) => {
        return num >= 0 ? "color:green;" : "color:red;";
      },
      SortUp: function (type) {
        return this.coins.sort(function (a, b) {
          return a[type] - b[type];
        });
      },
      SortDown: function (type) {
        // if (document.querySelector('thead tr td:nth-of-type(4)').getAttribute('data-type') === 'price') {
        return this.coins.sort(function (a, b) {
          return b[type] - a[type];
        });
      },
      Sort: function (event) {
        this.type = event.currentTarget.getAttribute('data-type');
        if (this.sortDirection === 'down') {
          this.sortDirection = 'up';
          this.SortDown(this.type);

        }
        else {
          this.sortDirection = 'down';
          this.SortUp(this.type);
        }
      },
      AutoSort: function () {
        if (this.sortDirection === 'down') {
          this.SortUp(this.type);
        }
        if (this.sortDirection === 'up') {
          this.SortDown(this.type);
        }
      }
    },
    created: function () {
      this.getCoinData();
      this.getCoins();
      this.getCoinsInterval();
    }
  }
</script>

<style scoped>

  .table {
    width: 85vw;
    margin: 0 auto 10vw;
    font-size: 1.3vw;
  }

  .table thead td {
    border-top: none;
  }

  thead tr td[data-type] {
    cursor: pointer;
  }

  tbody tr td:nth-of-type(1),
  thead tr td:nth-of-type(1) {
    width: 5vw;
  }

  tbody tr td:nth-of-type(2),
  thead tr td:nth-of-type(2) {
    width: 17vw;
  }

  tbody tr td:nth-of-type(3),
  thead tr td:nth-of-type(3) {
    width: 7vw;
  }

  tbody tr td:nth-of-type(4),
  thead tr td:nth-of-type(4) {
    width: 9vw;
  }

  tbody tr td:nth-of-type(5),
  thead tr td:nth-of-type(5) {
    width: 7vw;
  }

  tbody tr td:nth-of-type(6),
  thead tr td:nth-of-type(6) {
    width: 7vw;
  }

  tbody tr td:nth-of-type(7),
  thead tr td:nth-of-type(7) {
    width: 7vw;
  }

  tbody tr td:nth-of-type(8),
  thead tr td:nth-of-type(8) {
    width: 11vw;
  }

  tbody tr td:nth-of-type(9),
  thead tr td:nth-of-type(9) {
    width: 15vw;
  }
</style>
