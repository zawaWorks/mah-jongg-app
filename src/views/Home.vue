<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
        <div class="about">
          <h1>ホーム画面(未完成）
          </h1>
          <p>かっこいいロゴとか</p>
          <p>使い方説明とか</p>
          <p>そういう感じにする予定</p>
        </div>
    </v-layout>
  </v-container>
</template>



<script>
import { mapActions } from 'vuex';
export default {
  created () {
    this.fetchScores()
    this.fetchGames()
    this.games = this.$store.state.games
    this.scores = this.$store.state.scores
    //this.games.reverse()
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