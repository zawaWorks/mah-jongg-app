import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    games: [],
    scores: []
    },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state){
      state.login_user = null
    },
    toggleSideMenu (state){
      state.drawer = !state.drawer
    },
    addGame (state, { id, game}) {
      game.id = id
      state.games.push(game)
    },
    updateGame (state, { id, game }) {
      const index = state.game.findIndex(game => game.id === id)

      state.game[index] = game
    },
    deleteAddress (state, { id }) {
      const index = state.addresses.findIndex(address => address.id === id)

      state.addresses.splice(index, 1)
    },
  },
  actions: {
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu')
    },
    fetchGames ({ commit }){
      firebase.firestore().collection(`games`).get().then(snapshot => {
        snapshot.forEach(doc => commit( 'addGame', { id: doc.id, game: doc.data()}))
      })
    },
    addGame({ commit }, game) {
      firebase.firestore().collection(`games`).add(game).then(doc => {
        commit('addGame', { id: doc.id, game})
      })
    }
  },
  getters:{
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL: '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getMembersById: state => id => state.games.find(game => game.id === id),
  },
  modules: {
  }
})
