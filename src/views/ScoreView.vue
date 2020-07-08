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
        <v-simple-table>
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
                <td v-for="item in score_list[index]" :key="item">{{item}}</td>
                <td>
                  <router-link :to="{ name: 'Home'}">
                    <v-icon small class="mr-2">mdi-pencil</v-icon>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <div>
          <p>
            {{score_list}}<br>
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
export default {
  created(){
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
    }
  },
  watch:{
    game_id: function(){
      this.scores = this.$store.state.scores
      this.score_list = []
      this.No = 0
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
              this.score.push("")
            }
          }.bind(this)))
          this.score_list.push(this.score)
          this.score = []
          console.log(this.score)
        }
      }.bind(this)))
    },
  },
    methods: {
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>

