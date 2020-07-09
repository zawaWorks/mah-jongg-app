/* eslint-disable vue/no-parsing-error */
<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Score_input' }">点数入力</router-link> |
      <router-link :to="{ name: 'Score_view' }">点数編集</router-link>
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
                  <th class="text-left">#</th>
                  <th class="text-left" v-for="(item, id) in targetGame.members" :key="id" value:id>{{item.name}}</th>
                  <th class="text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list, index) in score_list" :key="list">
                  <td v-for="item in score_list[index]" :key="item" v-show="game_id!=item">{{item}}</td>
                  <td>
                    <router-link :to="{ name: 'Home'}">
                      <v-icon small class="mr-2">mdi-pencil</v-icon>
                    </router-link>
                  </td>
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
            {{score_sum}}<br>
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
  created(){
    this.fetchScores()
    this.fetchGames()
    this.games = this.$store.state.games
    this.scores = this.$store.state.scores
    this.games = this.$store.state.games
    this.scores = this.$store.state.scores
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
      this.scores = this.$store.state.scores
      this.score_list = []
      this.No = 1
      this.targetGame = this.$store.getters.getMembersById(this.game_id)
      this.scores.forEach((function (value){
        if(value.game_id == this.targetGame.id){
          //console.log(value)
          this.score = []
          this.score.push(this.No++)
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
          this.score.push(value.game_id)
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
      this.score_sum.splice(0, 1, '合計')
      this.score_sum.splice(-1, 1)
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

