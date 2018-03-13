<template>
  <div id="about">
    <li class="search"><input type="text" v-model="search" placeholder="search..."></li>
    <div class="wrapper">
      <h2>Контактная информация</h2>
      <div class="contacts">
        <p class="address">ООО «It-Academy»<br>
          УНП 00000000<br>
          220000, г. Минск, ул. Скрыганова 14, оф. 53.1<br>
          Время работы офиса: Понедельник- Пятница 09:00- 18:00<br>
          Суббота &ndash; Воскресенье &mdash; выходной<br>
          Тел. /факс: +375291122333
        </p>
        <iframe class="map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A533d5972f874273322da35426eaf19e03863c56b0680230a420f362c8dd6c168&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
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
  }

  input {
    position: absolute;
    right: -7.5vw;
    top: 0vw;
  }

  .contacts {
    display: flex;
    flex-direction: row;
    margin-bottom: 2vw;
  }

  .contacts:before {
    content: "";
    display: inline-block;
    min-height: inherit;
    height: 100%;
    vertical-align: middle;
  }

  .address {
    color: #666;
    font-size: 3.4vh;
  }
</style>
