<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
        <div class="about">
          <h1>ホーム画面(今はデバッグ用）
          </h1>
          <p>{{ games }}</p>
          <p>{{scores}}</p>
        </div>
    </v-layout>
  </v-container>
</template>



<script>
import { mapActions } from 'vuex';
export default {
  created () {
    this.fetchGames()
    this.fetchScores()
    this.games = this.$store.state.games
    this.scores = this.$store.state.scores
    },
  data () {
    return {
      games: [],
      scores: []
    }
  },
  methods:{
    ...mapActions(['fetchGames','fetchScores'])
  }
}
</script>