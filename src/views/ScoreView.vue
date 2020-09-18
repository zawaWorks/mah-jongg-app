/* eslint-disable vue/no-parsing-error */
<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Ranking_view' }">ランキング</router-link> |
      <router-link :to="{ name: 'Score_view' }">集計表</router-link>
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
        <v-card>
          <v-simple-table fixed-header v-show="game_id!=null">
            <template>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left" v-for="(item, id) in member_list" :key="id" value:id>{{item.name}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list, index) in score_list" :key="list">
                  <td v-for="score in score_list[index]" :key="score">{{score}}</td>
                </tr>
                <tr>
                  <td v-for="sum in score_sum" :key="sum">{{sum}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <!--
        <div>
          <p>
            {{score_list[0]}}<br>
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
import { myMixin } from "../components/utility";
export default {
  mixins: [myMixin],
  created(){
    this.getGames()
    this.getScores()
  },
  data () {
    return {
      targetGame: [],
      game_id:null,
      games: [],
      scores: [],
      score_list:[],
      score_sum:[],
    }
  },
  watch:{
    game_id: function(){
      //作業用配列定義
      this.score_list = []
      //game_idから該当するゲームデータを特定し必要情報を変数に格納
      this.games.forEach((function (game){
        if(game.id == this.game_id){
          //参加面子の情報を格納
          this.member_list = game.members
          //ポイント計算用のレートを格納
          this.rate = game.rate
        }
      }.bind(this)))
      //対局数カウントの初期化
      this.No = 1
      //スコアデータをループしてgame_idに合致するデータを集計
      this.scores.forEach((function (value){
        //game_idの判定
        if(value.game_id == this.game_id){
          //集計用配列の初期化
          this.score = []
          //対局数をカウント
          this.score.push(this.No++)
          //スコアデータの面子とを参加面子を比較し一致した場合はスコアを集計用配列に格納、不一致だった面子にはnullを格納しランギング表を１行単位で生成
          this.member_list.forEach((function(member){
            if(member.No == value.member1.name_no){
              this.score.push(value.member1.result)
            }else if(member.No == value.member2.name_no){
              this.score.push(value.member2.result)
            }else if(member.No == value.member3.name_no){
              this.score.push(value.member3.result)
            }else if(member.No == value.member4.name_no){
              this.score.push(value.member4.result)
            }else{
              this.score.push(null)
            }
          }.bind(this)))
          //集計データを作業用配列に格納
          this.score_list.push(this.score)
          //集計用配列初期化
          this.score = []
        }
      }.bind(this)))
      //スコア合計集計用配列の初期化
      this.score_sum.splice(0)
      //集計用配列をループして各列ごとの得点の合計を算出しスコア合計集計用配列に格納
      this.score_list.forEach((function(value){
        value.forEach(function(score,index){
          //スコア合計集計用配列の得点がnullの場合は0を格納する（あとで計算するときにnullだとエラーになるため）
          if(this.score_sum[index] == null){
            this.score_sum.push(0)
          }
          //集計用配列がnullで無ければ、スコア合計集計用配列と合算してスコア合計集計用配列に格納
          if(score!=null){
            this.score_sum[index] = this.score_sum[index] + score
          //集計用配列がnullの場合、スコア合計集計用配列に0を加算してスコア合計集計用配列に格納
          }else{
            this.score_sum[index] = this.score_sum[index] + 0
          }
        }.bind(this)) 
      }.bind(this)))
      //スコア合計集計用配列の先頭ゴミデータを削除し「合計」を挿入
      this.score_sum.splice(0, 1, '合計')
    },
  },
    methods: {
  }
}
</script>

<style scoped lang="scss">
//リンクの下部線非表示
a {
  text-decoration: none;
}
</style>

