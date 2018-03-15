<template>
  <div id="about">
    <div class="wrapper">
      <li class="search"><input type="text" class="form-control" v-model="search" placeholder="search..."></li>
      <h2>Контактная информация</h2>
      <div class="contacts">
        <div class="address">
          <p>ООО «It-Academy»<br>
            УНП 00000000<br>
            220000, г. Минск, ул. Скрыганова 14, оф. 53.1<br>
            Время работы офиса: Понедельник- Пятница 09:00- 18:00<br>
            Суббота &ndash; Воскресенье &mdash; выходной<br>
            <a href="tel:+375291122333">Тел. /факс: +375291122333</a>
          </p>
          <div class="icons">
            <a href="https://web.telegram.org/" target="_blank"><i class="fab fa-telegram fa-2x"></i></a>
            <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook fa-2x"></i></a>
            <a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter fa-2x"></i></a>
          </div>
        </div>
        <iframe class="map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A533d5972f874273322da35426eaf19e03863c56b0680230a420f362c8dd6c168&amp;source=constructor" width="50%" height="400vh" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {}
    }
  }
</script>

<style scoped>
  #about {
    margin: 0 7.5vw;
  }

  .wrapper {
    overflow: auto;
  }

  h2 {
    margin: 2vw 0;
    font-size: 2.7vw;
  }

  input {
    position: relative;
    right: -7.5vw;
  }

  .contacts {
    display: flex;
    flex-direction: row;
    margin-bottom: 2vw;
  }

  .address p {
    color: #666;
    font-size: 1.7vw;
  }
.icons a{
  padding: .5vw;
}
  .fa-facebook {
    color: #3B5998;
  }

  .fa-facebook:hover {
    color: #313e73;
  }

  .fa-twitter {
    color: #1DA1F2;
  }

  .fa-twitter:hover {
    color: #1d7cca;
  }
</style>
