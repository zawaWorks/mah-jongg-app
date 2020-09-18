<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 mt-5 justify-center>
        <div class="about">
          <img src="../static/top_image.png" width="100%" />
          <h2>使用方法</h2>
          <li>「対局作成」から対局設定を行います。</li>
          <li>「点数入力」から点数の入力を行います。</li>
          <li>「ランキング」から対局毎の順位や集計表を確認できます。</li>
          <li>「個人成績」から個人毎の詳細な成績を確認できます。</li>
        </div>
      <!--
        <div>
          <p>
            {{members}}<br>
            {{}}<br>
          </p>
        </div>
      -->
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import 'firebase/firestore';
import { myMixin } from "../components/utility";
export default {
  mixins: [myMixin],
  created () {
    //this.games = this.getGames()
    //this.scores = this.getScores()
    //this.members = this.getMembers()
    },
  data () {
    return {
      games: [],
      scores: [],
      members:[],
    }
  },
  methods:{
  },
}
</script>

<style scoped lang="scss">
//リンクの下部線非表示
a {
  text-decoration: none;
}
</style>