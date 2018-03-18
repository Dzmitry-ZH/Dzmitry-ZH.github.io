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
                    <div class="list-group">
                      <label for="pair">Валютная пара:</label>
                      <input list="tradePair" name="tradePair" id="pair">
                      <datalist id="tradePair">
                        <option class="list-group-item" v-for="coin in coins" :value="coin.name">{{coin.symbol}} -
                          {{coin.price_usd | currency('$')}}
                        </option>
                      </datalist>
                    </div>
                    <div class="form-group">
                      <label for="amount">Количество монет:</label>
                      <input type="number" class="form-control" id="amount" required>
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
  export default {
    name: "cabinet",
    data() {
      return {
        coins: [],
        coinData: [],
        CRYPTOCOMPARE_API_URI: "https://min-api.cryptocompare.com/data/all/coinlist",
        COINMARKETCAP_API_URI: "https://api.coinmarketcap.com/v1/ticker/?limit=100",
        IMAGE_URL: "https://www.cryptocompare.com",
        UPDATE_INTERVAL: 6000,
        showModal: false
      }
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

  input[name = 'tradePair'] {
    width: 100%;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
</style>
