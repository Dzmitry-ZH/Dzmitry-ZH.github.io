import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './assets/view/App.vue'
import Market from './assets/view/Market.vue'
import News from './assets/view/News.vue'
import Post from './assets/view/Post.vue'
import About from './assets/view/About.vue'
import Test from './assets/view/test.vue'
import Vue2Filters from 'vue2-filters'

Vue.use(VueRouter);
Vue.use(Vue2Filters);
// Vue.component('main', Market);
// Vue.component('news', News);

var router = new VueRouter({
  routes: [
    {path: '/', component: Market},
    {path: '/news', component: News},
    {path: '/news/:id', name: 'post1', component: Post},
    {path: '/about', component: About},
    {path: '/test', component: Test}
  ]
})

new Vue({
  el: '#app',
  data: {
  },
  router: router,
  render: h => h(App),
})
