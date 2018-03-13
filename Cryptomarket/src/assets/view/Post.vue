<template>
  <div id="post">
    <li class="search"><input type="text" v-model="search" placeholder="search..."></li>
    <img :src="link.image2" alt="">
    <h2>{{link.title}}</h2>
    <p v-for='par in link.body'>{{par}}</p>
    <router-link to='/news' class="back linkInNews">Назад</router-link>
    <router-link v-if='next<6' class="forward linkInNews" :to='{name: "post1", params:{id:next}}' @click.native='changeForward'>Вперед</router-link>
  </div>
</template>

<script>
  import posts from '../../posts'

  export default {
    name: "post",
    data() {
      return {
        posts: posts,
        search: '',
        next: Number(this.$route.params.id) + 1,
      }
    },
    methods: {
      changeForward: function () {
        this.$router.go(this.to);
      }
    },
    created: function () {
      let postId = this.$route.params.id;
      this.link = this.posts[postId];
    }
  }
</script>

<style scoped>
  #post {
    margin: 2vw 10vw;
  }

  #post:after {
    content: "";
    display: block;
    clear: both;
  }

  img {
    width: 100%;
  }

  h2 {
    color: #292B2C;
    margin: 2vw 0;
    text-align: center;
  }

  p {
    text-align: justify;
    color: #727272;
    font-size: 1.6vw;
    text-align: justify;
    text-indent: 4vw;
  }

  input {
    position: absolute;
    right: -11vw;
    top: -2vw;
  }

  .linkInNews {
    background-color: #0275d8;
    color: white;
    width: 10vw;
    height: 2.5vw;
    line-height: 2.5vw;
    text-align: center;
    display: inline-block;
    border-radius: .5vw;
    transition: .5s;
  }

  .back {
    float: left;
  }

  .forward {
    float: right;
  }
</style>
