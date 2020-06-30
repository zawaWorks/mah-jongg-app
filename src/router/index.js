import Vue from 'vue'
import VueRouter from 'vue-router'
//import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import GameForm from '../views/GameForm.vue'
import ScoreForm from '../views/ScoreForm.vue'
import AddressForm from '../views/AddressForm.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home1',
    component: Home
  },
  {
    path: '/game/:game_id?/edit',
    name: 'Game_edit',
    component: GameForm
  },
  {
    path: '/score_input',
    name: 'Score_input',
    component: ScoreForm
  },
  {
    path: '/addresses/:address_id?/edit',
    name: 'Address_edit',
    component: AddressForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
