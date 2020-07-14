<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Ranking_view' }">ランキング</router-link> |
      <router-link :to="{ name: 'Score_view' }">集計表</router-link>
      <!-- | <router-link :to="{ name: 'Score_view' }">個人戦績</router-link> -->
    </div>
    <v-layout>

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
                  <th class="text-left">順位</th>
                  <th class="text-left">得点</th>
                  <th class="text-left">氏名</th>
                  <th class="text-left">ポイント</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list, index) in rank_list" :key="list">
                  <td v-for="item in rank_list[index]" :key="item" v-show="game_id!=item">{{item}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <!--
        <div>
          <p>
            {{this.$store.state.game_id}}<br>
            {{this.game_id}}<br>
            {{rank_list}}

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
  created(){
    this.fetchScores()
    this.fetchGames()
    this.games = this.$store.state.games
    this.scores = this.$store.state.scores
    this.games = this.$store.state.games
    this.scores = this.$store.state.scores
    //this.game_id = this.$store.state.game_id
  },
  data () {
    return {
      targetGame: [],
      game_id:null,
      games: [],
      scores: [],
      score_list:[],
      score_sum:[],
      rank:[],
      rank_list:[],
    }
  },
  watch:{
    game_id: function(){
      this.scores = this.$store.state.scores
      this.score_list = []
      this.targetGame = this.$store.getters.getMembersById(this.game_id)
      this.scores.forEach((function (value){
        if(value.game_id == this.targetGame.id){
          //console.log(value)
          this.score = []
          this.targetGame.members.forEach((function(member){
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
          this.score_list.push(this.score)
          this.score = []
          //console.log(this.score)
        }
      }.bind(this)))
      this.score_sum.splice(0)
      this.score_list.forEach((function(value){
        value.forEach(function(score,index){
          if(this.score_sum[index] == null){
            this.score_sum.push(0)
          }
          if(score!=null){
            this.score_sum[index] = this.score_sum[index] + score
          }else{
            this.score_sum[index] = this.score_sum[index] + 0
          }
        }.bind(this)) 
      }.bind(this)))
      this.rank = []
      this.rank_list = []
      this.score_sum.forEach(function(value,index){
        this.rank.push(value)
        this.rank.push(this.targetGame.members[index].name)
        this.rank.push(value*this.targetGame.rate)
        this.rank_list.push(this.rank)
        this.rank = []
      }.bind(this))
      this.rank_list.sort(function(a,b){return(b[0] - a[0]);});
      this.rank_list.forEach(function(value,index){
        this.rank_list[index].unshift(index+1)
      }.bind(this))
    },
  },
    methods: {
      ...mapActions(['fetchGames','fetchScores'])
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>

