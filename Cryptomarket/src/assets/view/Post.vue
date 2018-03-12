<template>
  <div id="post">
    <li class="search"><input type="text" v-model="search" placeholder="search..."></li>
      <img :src="link.image2" alt="">
      <h2>{{link.title}}</h2>
      <p v-for = 'par in link.body'>{{par}}</p>
  </div>
</template>

<script>
  import posts from '../../posts'

  export default {
    name: "post",
    data() {
      return {
        posts: posts,
        search: ''
      }
    },
    created: function () {
      let postId = this.$route.params.id;
      console.log(postId);
      this.link= this.posts[postId];
      console.log(this.link);
    }
  }
</script>

<style scoped>
  #post {
    margin: 2vw 10vw;
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
</style>
