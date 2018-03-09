<template>
  <div id="post">
    <li class="search"><input type="text" v-model="search" placeholder="search..."></li>
    <div class="posts" v-for = 'item in filterBy (posts,search)'></div>
      <img :src="item.image" alt="">
      <h2>{{item.title}}</h2>
      <p>{{item.body}}</p>
  </div>
</template>

<script>
  import posts from '../../posts'

  export default {
    name: "post",
    data() {
      return {
        search: '',
        posts: posts,
      }
    },
    created: function () {
      let postId = this.$route.params.id;
      this.item = this.posts[postId];
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
  }

  p {
    text-align: justify;
    color: #727272;
    font-size: 1.4vw;
  }

  input {
    position: absolute;
    right: -11vw;
    top: -2vw;
  }
</style>
