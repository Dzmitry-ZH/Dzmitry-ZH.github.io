<template>
  <div id="cabinet">
    <li class="search"><input type="text" class="form-control search-input" placeholder="search..."></li>
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
                      <input type="text" class="form-control" id="exchange" required>
                    </div>
                    <div class="form-group">
                      <label for="pair">Валютная пара:</label>
                      <input list="tradePair" class="form-control" name="tradePair" id="pair">
                      <datalist id="tradePair">
                        <option v-for="coin in coinsDefault" :value="coin.name">{{coin.symbol}} -
                          {{coin.price_usd | currency('$')}}
                        </option>
                      </datalist>
                    </div>
                    <div class="form-group">
                      <label for="amount">Количество монет:</label>
                      <input type="number" class="form-control" id="amount" required>
                    </div>
                    <div class="form-group">
                      <!--<date-picker v-model="time1" :first-day-of-week="1" lang='ru'></date-picker>-->
                      <date-picker2 :date="startTime" :option="option"></date-picker2>
                    </div>
                    <div class="form-group">
                      <label for="notice">Примечание:</label>
                      <textarea class="form-control" id="notice" cols="30" rows="3.8"></textarea>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary">Добавить</button>
                  <button type="button" class="btn btn-secondary" @click="showModal=false">Закрыть</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <button class="btn btn-primary" @click="showModal = true">Добавить депозит</button>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import myDatepicker from 'vue-datepicker'

  export default {
    name: "cabinet",
    data() {
      return {
        coins: [],
        coinsDefault: [],
        coinData: [],
        getcoin: '',
        CRYPTOCOMPARE_API_URI: "https://min-api.cryptocompare.com/data/all/coinlist",
        COINMARKETCAP_API_URI: "https://api.coinmarketcap.com/v1/ticker/?limit=100",
        IMAGE_URL: "https://www.cryptocompare.com",
        UPDATE_INTERVAL: 6000,
        showModal: false,
        time1: '',
        time2: '',
        shortcuts: [
          {
            text: 'Today',
            start: new Date(),
            end: new Date()
          }
        ],
        startTime: {
          time: ''
        },
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
            ok: 'Сегодня',
            cancel: 'Закрыть'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        }
      }
    },
    components: {
      'date-picker': DatePicker,
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
      }
    },
    created: function () {
      this.getCoins();
      this.getCoinsInterval();
    }
  }
</script>

<style scoped>
  #cabinet {
    margin: 0 7.5vw;
  }

  .search-input {
    position: relative;
    right: -7.5vw;
    pointer-events: none;
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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  .modal-footer button{
    margin-top: 0;
  }
</style>
