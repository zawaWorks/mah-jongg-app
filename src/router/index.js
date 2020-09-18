import Vue from 'vue'
import VueRouter from 'vue-router'
//import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import GameForm from '../views/GameForm.vue'
import GameEdit from '../views/GameEdit.vue'
import ScoreForm from '../views/ScoreForm.vue'
import ScoreEdit from '../views/ScoreEdit.vue'
import ScoreView from '../views/ScoreView.vue'
import RankingView from '../views/RankingView.vue'
import UserView from '../views/UserView.vue'
import PersonalResult from '../views/PersonalResult.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  //{
  //  path: '/home',
  //  name: 'Home1',
  //  component: Home
  //},
  {
    path: '/game/:game_id?/form',
    name: 'Game_form',
    component: GameForm
  },
  {
    path: '/game_edit',
    name: 'Game_edit',
    component: GameEdit
  },
  {
    path: 'score/:score_id?/form',
    name: 'Score_form',
    component: ScoreForm
  },
  {
    path: '/score_edit',
    name: 'Score_edit',
    component: ScoreEdit
  },
  {
    path: '/score_view',
    name: 'Score_view',
    component: ScoreView
  },
  {
    path: '/ranking',
    name: 'Ranking_view',
    component: RankingView
  },
  {
    path: '/user_view',
    name: 'User_view',
    component: UserView
  },
  {
    path: '/personal_result',
    name: 'Personal_Result',
    component: PersonalResult
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
