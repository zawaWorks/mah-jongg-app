<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Score_form' }">点数入力</router-link> |
      <router-link :to="{ name: 'Score_edit' }">点数編集</router-link>
    </div>
    <v-layout row wrap justify-center>
      <v-flex xs12 mt-5 justify-center>
        <v-card>
            <v-card-text> 
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="games"
                    item-text="name"
                    label="表示対局を選択"
                    item-value="id"
                    v-model="game_id"
                    required>
                  </v-select>
                </v-col>
              </v-row>
            </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-data-table :headers='headers' :items='score_list'>
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'Score_form', params: { score_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      <!--  
        <div>
          <p>
            {{}}<br>
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
import firebase from 'firebase'
import { myMixin } from "../components/utility";
export default {
  mixins: [myMixin],
  created(){
    //ゲームデータの取得
    this.getGames()
    //スコアデータの取得
    this.getScores()
  },
  data () {
    return {
      game_id:null,
      games: [],
      scores: [],
      score_list:[],
      score_sum:[],
      headers: [
        { text: '日時', value: 'date' },
        { text: '東家', value: 'member1' },
        { text: '南家', value: 'member2' },
        { text: '北家', value: 'member3' },
        { text: '西家', value: 'member4' },
        { text: '操作', value: 'action', sortable: false }
      ],
    }
  },
  watch:{
    //表示対局を選択した場合にgame_idから該当するスコアデータを取得し表示用配列を生成
    game_id: function(){
      //表示用配列の宣言
      this.score_list=[]
      //該当するスコアデータ格納用配列の宣言
      this.targetScore_list = []
      //全スコアデータからgame_idが一致するデータのみ抽出し配列に格納
      this.scores.forEach((function(scores){
        if(scores.game_id == this.game_id){
          this.targetScore_list.push(scores)
        }
      }.bind(this)))
      //該当データから必要情報のみ抽出し表示用配列に格納
      this.targetScore_list.forEach((function(scores){
        //作業用配列定義
        var score = []
        //必要情報の抽出及び整形
        score.date = scores.date
        score.member1 = scores.member1.rank + "位　" + scores.member1.name + "　(" + scores.member1.result + "点)"
        score.member2 = scores.member2.rank + "位　" + scores.member2.name + "　(" + scores.member2.result + "点)"
        score.member3 = scores.member3.rank + "位　" + scores.member3.name + "　(" + scores.member3.result + "点)"
        score.member4 = scores.member4.rank + "位　" + scores.member4.name + "　(" + scores.member4.result + "点)"
        //編集用のキーとしてidを配列に格納（非表示）
        score.id = scores.id
        //表示用配列に格納
        this.score_list.push(score)
      }.bind(this)))
    },
  },
  methods: {
    //idをキーとしたスコアデータ削除
    async deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        //データ削除
        await firebase.firestore().collection(`scores`).doc(id).delete()
        ///ゲームデータの取得
        await this.getGames()
        //スコアデータの取得
        await this.getScores()
      }
    },
  }
}
</script>

<style scoped lang="scss">
//リンクの下部線非表示
a {
  text-decoration: none;
}
</style>