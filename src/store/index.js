import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    game_id: null,
    Targetgame:[],
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
    resetGames (state) {
      state.games.splice(0)
    },
    updateGame (state, { id, game }) {
      const index = state.game.findIndex(game => game.id === id)

      state.game[index] = game
    },
    setGameID(state, game_id){
      state.game_id = game_id
    },
    addScore (state, { id, score}) {
      score.id = id
      state.scores.push(score)
    },
    resetScores (state) {
      state.scores = []
      //state.scores.splice(0)
    },
    deleteAddress (state, { id }) {
      const index = state.addresses.findIndex(address => address.id === id)

      state.addresses.splice(index, 1)
    },
    getTargetgame (state, { id, game}) {
      game.id = id
      state.Targetgame.push(game)
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
    },
    updateGame ({ commit }, { id, game }) {
      firebase.firestore().collection(`games`).doc(id).update(game).then(() => {
        commit('resetGames')
      })
    },
    deleteGame ({ commit }, { id }) {
        firebase.firestore().collection(`games`).doc(id).delete().then(() => {
          commit('resetGames')
        })
    },
    resetGames({ commit }){
      commit('resetGames')
    },
    setGameID({ commit }, game_id){
      commit('setGameID', game_id)
    },
    addScore({ commit }, score) {
      firebase.firestore().collection(`scores`).add(score).then(doc => {
        commit('addScore', { id: doc.id, score})
      })
    },
    fetchScores ({ commit }){
      firebase.firestore().collection(`scores`).get().then(snapshot => {
        snapshot.forEach(doc => commit( 'addScore', { id: doc.id, score: doc.data()}))
      })
    },
    updateScore ({ commit }, { id, score }) {
      firebase.firestore().collection(`scores`).doc(id).update(score).then(() => {
        commit('resetScores')
      })
    },
    deleteScore ({ commit }, { id }) {
        firebase.firestore().collection(`scores`).doc(id).delete().then(() => {
          commit('resetScores')
        })
    },
    resetScores({ commit }){
      commit('resetScores')
    },
    getTargetgame ({ commit }, { id }){
      firebase.firestore().collection(`games`).doc(id).get().then(snapshot => {
        snapshot.forEach(doc => commit( 'getTargetgame', { id: doc.id, game: doc.data()}))
      })
    },
  },
  getters:{
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL: '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getGameById: state => id => state.games.find(game => game.id === id),
    getScoreById: state => id => state.scores.find(score => score.id === id)
  },
  modules: {
  }
})
