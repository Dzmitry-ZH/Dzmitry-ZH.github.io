<template>
  <div id="news">
    <li class="search"><input type="text" v-model="search" placeholder="search..."></li>
    <div class="posts" v-for="(item,index) in filterBy(posts,search)">
      <img :src="item.image" alt="">
      <router-link :to='{name: "post1", params:{id:index}}'><h4>{{item.title}}</h4></router-link>
      <p>{{item.description}}</p>
      <router-link class="linkInNews" :to='{name: "post1", params:{id:index}}'>Подробнее</router-link>
    </div>
  </div>
</template>

<script>
  import posts from '../../posts'

  export default {
    name: "news",
    data() {
      return {
        search: '',
        posts: posts
      }
    }
  }
</script>

<style scoped>
  #news {
    display: flex;
    margin: 0 4vw;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: 80vh;
  }

  .posts {
    flex-basis: 360px;
    margin: 2vw 0;
  }

  .posts h4 {
    height: 7vw;
  }

  .posts p {
    height: 11.5vw;
    text-align: justify;
    font-size: 1.4vw;
  }

  img {
    width: 360px;
    text-align: center;
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

  .linkInNews:hover {
    background-color: #023e6e;
    transition: .5s;
  }

  input {
    position: absolute;
    right: -4vw;
    top: 0vw;
  }

  h4 {
    color: #292B2C;
    text-decoration: none;
    transition: .2s;
    margin-top: 1vw;
  }

  h4:hover {
    color: #707273;
    transition: .2s;
  }

  a:hover {
    text-decoration: none;
  }
</style>
