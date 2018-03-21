<template>
  <div id="cabinet">
    <li class="search"><input type="text" class="form-control search-input" v-model="search" placeholder="search...">
    </li>
    <table class="table table-hover table-responsive">
      <thead>
      <tr>
        <td>Биржа</td>
        <td>Валютная пара</td>
        <td>Монеты</td>
        <td>Цена(USD)</td>
        <td>Общая стоимость</td>
        <td>1H</td>
        <td>1D</td>
        <td>1W</td>
        <td>Дата</td>
        <td>Примечание</td>
        <td></td>
      </tr>
      </thead>
      <tbody>
      <tr class="trDeposit" v-for="(item,index) in filterBy(data,search)">
        <td>{{item.exchange}}</td>
        <td>{{item.tradePair}}{{'/USD'}}</td>
        <td>{{item.coinAmount}}</td>
        <td>{{item.price | currency}}</td>
        <td>{{item.product | currency('$',2)}}</td>
        <td :style="getColor(item.change1h)"><span v-if="item.change1h > 0">+</span>{{item.change1h}}%</td>
        <td :style="getColor(item.change1d)"><span v-if="item.change1d > 0">+</span>{{item.change1d}}%</td>
        <td :style="getColor(item.change1w)"><span v-if="item.change1w > 0">+</span>{{item.change1w}}%</td>
        <td>{{item.date.time}}</td>
        <td>{{item.notice}}</td>
        <td @click='deleteDeposit(item.key,index)'><i class="fas fa-trash"></i></td>
      </tr>
      <tr class="trDeposit" v-for="(item,index) in filterBy(dataGet,search)">
        <td>{{item.exchange}}</td>
        <td>{{item.tradePair}}{{'/USD'}}</td>
        <td>{{item.coinAmount}}</td>
        <td>{{item.price | currency}}</td>
        <td>{{item.product | currency('$',2)}}</td>
        <td :style="getColor(item.change1h)"><span v-if="item.change1h > 0">+</span>{{item.change1h}}%</td>
        <td :style="getColor(item.change1d)"><span v-if="item.change1d > 0">+</span>{{item.change1d}}%</td>
        <td :style="getColor(item.change1w)"><span v-if="item.change1w > 0">+</span>{{item.change1w}}%</td>
        <td>{{item.date.time}}</td>
        <td>{{item.notice}}</td>
        <td @click='deleteDeposit(item.key,index)'><i class="fas fa-trash"></i></td>
      </tr>
      </tbody>
    </table>
    <!--<p>Итого:{{totalSum | currency('$',2)}}</p>-->
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Добавление депозита</h5>
                  <button type="button" class="close" @click="showModal=false" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="exchange">Биржа:</label>
                      <input type="text" class="form-control" id="exchange" v-model='deposit.exchange' required>
                    </div>
                    <div class="form-group">
                      <label for="pair">Валютная пара:</label>
                      <input list="tradePair" class="form-control" name="tradePair" id="pair" v-model="deposit.tradePair">
                      <datalist id="tradePair">
                        <option v-for="coin in coinsDefault" :value="coin.symbol">{{coin.name}} - {{coin.price_usd | currency('$')}}
                        </option>
                      </datalist>
                    </div>
                    <div class="form-group">
                      <label for="amount">Количество монет:</label>
                      <input type="number" class="form-control" id="amount" v-model="deposit.coinAmount" required>
                    </div>
                    <div class="form-group">
                      <date-picker2 :date="deposit.date" :option="option" v-model="deposit.date"></date-picker2>
                    </div>
                    <div class="form-group">
                      <label for="notice">Примечание:</label>
                      <textarea class="form-control" id="notice" cols="30" rows="3.8" v-model="deposit.notice"></textarea>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click='addDeposit'>Добавить</button>
                  <button type="button" class="btn btn-secondary" @click="showModal=false">Закрыть</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <button class="btn btn-primary addDeposit" @click="showModal = true">Добавить депозит</button>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker';

  export default {
    name: "cabinet-new",
    data() {
      return {
        coins: [],
        coinsDefault: [],
        coinData: [],
        data: [],
        dataGet: [],
        totalSum: 0,
        search: '',
        deposit: {
          exchange: '',
          coinAmount: '',
          tradePair: '',
          price: '',
          product: '',
          change1h: '',
          change1d: '',
          change1w: '',
          date: {time: ''},
          notice: '',
        },
        CRYPTOCOMPARE_API_URI: "https://min-api.cryptocompare.com/data/all/coinlist",
        COINMARKETCAP_API_URI: "https://api.coinmarketcap.com/v1/ticker/?limit=100",
        IMAGE_URL: "https://www.cryptocompare.com",
        UPDATE_INTERVAL: 6000,
        showModal: false,
        endtime: {
          time: ''
        },
        option: {
          type: 'day',
          week: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Суб', 'Вск'],
          month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          format: 'YYYY-MM-DD',
          placeholder: 'Выберите дату',
          inputStyle: {
            'display': 'inline-block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '1.4VW',
            'border': '2px solid #fff',
            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            'border-radius': '2px',
            'color': '#5F5F5F'
          },
          color: {
            header: '#0275D8',
            headerText: 'white'
          },
          buttons: {
            cancel: 'Закрыть'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        }
      }
    },
    props: ['uid'],
    components: {
      'date-picker2': myDatepicker
    },
    methods: {
      getCoinsInterval: function () {
        setInterval(function () {
          axios.get(this.COINMARKETCAP_API_URI)
            .then((resp) => this.coins = resp.data)
            .catch(err => console.log(err))
        }.bind(this), this.UPDATE_INTERVAL)
      },
      getCoins: function () {
        //HTTP request using axios
        axios.get(this.COINMARKETCAP_API_URI)
          .then((resp) => {
            this.coins = resp.data;
            this.coinsDefault = resp.data;
            return this.coins;
          })
          .catch(err => console.log(err))
      },
      getDeposit: function () {
        axios.get('https://cryptomarket-30130.firebaseio.com/users/' + this.uid + '.json')
          .then((resp) => {
            // console.log(resp.data[this.uid]);
            this.dataGet = Object.values(resp.data[this.uid]);
            for (let i = 0; i < this.dataGet.length; i++) {
              let searchPair = this.dataGet[i].tradePair;
              let coin = this.coins.filter(function (item) {
                return item.symbol === searchPair;
              })[0];
              this.dataGet[i].product = coin.price_usd * this.dataGet[i].coinAmount;
              this.dataGet[i].price = coin.price_usd;
              this.dataGet[i].change1h = coin.percent_change_1h;
              this.dataGet[i].change1d = coin.percent_change_24h;
              this.dataGet[i].change1w = coin.percent_change_7d;
              // this.totalSum += this.dataGet[i].product;
            }
            console.log(this.data);
          })
          .catch((err) => {
            console.log('Error', err.message);
          })
      },
      addDeposit: function () {
        this.deposit.key = (new Date).getTime();
        axios.patch('https://cryptomarket-30130.firebaseio.com/users/' + this.uid + '.json', {
          [this.deposit.key]: this.deposit
        })
          .then(resp => {
            console.log(resp.data);
            this.data.push(Object.values(resp.data)[0]);
            for (let i = 0; i < this.data.length; i++) {
              let searchPair = this.data[i].tradePair;
              let coin = this.coins.filter(function (item) {
                return item.symbol === searchPair;
              })[0];
              this.data[i].product = coin.price_usd * this.data[i].coinAmount;
              this.data[i].price = coin.price_usd;
              this.data[i].change1h = coin.percent_change_1h;
              this.data[i].change1d = coin.percent_change_24h;
              this.data[i].change1w = coin.percent_change_7d;
              // this.totalSum += this.data[i].product;
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      deleteDeposit: function (key, index) {
        axios.delete('https://cryptomarket-30130.firebaseio.com/users/' + this.uid + '/' + key + '.json')
          .then(resp => {
            console.log('delete');
            this.getDeposit();
            document.getElementsByClassName('trDeposit')[index].style.display = 'none';
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      getColor: (num) => {
        return num >= 0 ? "color:green;" : "color:red;";
      },
    },
    created: function () {
      this.getCoins();
      this.getCoinsInterval();
      this.getDeposit();
    }
  }
</script>

<style scoped>
  #cabinet {
    margin: 0 7.5vw;
  }

  .table {
    width: 100%;
    margin: 0 auto;
    font-size: 1.3vw;
  }

  tbody tr td,
  thead tr td {
    width: calc(100% / 11);
  }

  tbody tr td:nth-of-type(11),
  thead tr td:nth-of-type(11) {
    cursor: pointer;
  }

  .table thead td {
    border-top: none;
  }

  .search-input {
    position: relative;
    right: -7.5vw;
  }

  button {
    margin-top: 2vw;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  h5.modal-title {
    font-size: 1.6vw;
    color: #5a5a5a;
  }

  .close {
    margin: 0;
  }

  p {
    float: right;
    margin-top: 2vw;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  .modal-footer button {
    margin-top: 0;
  }
</style>
