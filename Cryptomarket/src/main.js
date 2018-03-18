import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './assets/view/App.vue'
import Market from './assets/view/Market.vue'
import News from './assets/view/News.vue'
import Post from './assets/view/Post.vue'
import About from './assets/view/About.vue'
import LoginPage from './assets/view/LoginPage.vue'
import SignIn from './assets/view/SignIn.vue'
import SignUp from './assets/view/SignUp.vue'
import Cabinet from './assets/view/Cabinet.vue'
import Modal from './assets/view/Modal.vue'
import Vue2Filters from 'vue2-filters'
import firebase from 'firebase'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vue2Filters);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJ7HoYx0pnF4kjpC10fnixLFQmmeScm_E",
  authDomain: "cryptomarket-30130.firebaseapp.com",
  databaseURL: "https://cryptomarket-30130.firebaseio.com",
  projectId: "cryptomarket-30130",
  storageBucket: "cryptomarket-30130.appspot.com",
  messagingSenderId: "961803419182"
};
firebase.initializeApp(config);

var router = new VueRouter({
  routes: [
    {path: '/', component: Market},
    {path: '/news', component: News},
    {path: '/news/:id', name: 'post1', component: Post},
    {path: '/about', component: About},
    {path: '/loginpage', component: LoginPage},
    {path: '/sign-in', component: SignIn},
    {path: '/sign-up', component: SignUp},
    {path: '/cabinet', component: Cabinet},
    {path: '/modal', component: Modal}
  ]
})
// router.beforeEach((to, from, next) => {
//   let currentUser = firebase.auth().currentUser;
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth && !currentUser) next('/')
//   else if (!requiresAuth && currentUser) next('/hello')
//   else next()
// }),
new Vue({
  el: '#app',
  data: {},
  router: router,
  render: h => h(App),
})
