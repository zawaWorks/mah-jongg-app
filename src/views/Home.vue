<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex>
        <div class="about">
          <img src="../static/top_image.png" width="100%" />
          <h2>使用方法</h2>
          <li>メニューの「対局作成」から対局設定を行います。</li>
          <li>対局後にメニューの「点数入力」から点数入力を行います。</li>
        </div>
      <!--
        <div>
          <p>
            {{games}}<br>
            {{}}<br>
            {{}}

          </p>
        </div>
      -->
      </v-flex>
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
      scores: [],
    }
  },
  methods:{
    ...mapActions(['fetchGames','fetchScores'])
  }
}
</script>