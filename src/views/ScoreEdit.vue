<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Score_input' }">点数入力</router-link> |
      <router-link :to="{ name: 'Score_edit' }">点数編集</router-link>
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
        <v-data-table :headers='headers' :items='score_list'>
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'Score_input', params: { score_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <!--
        <div>
          <p>
            {{this.score_list}}<br>
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
import { mapActions } from 'vuex'
export default {
  created(){
    this.fetchScores()
    this.fetchGames()
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
    game_id: function(){
      this.score_list=[]
      this.scores = this.$store.state.scores
      this.targetScore_list = []
      this.No = 1
      this.targetGame = this.$store.getters.getGameById(this.game_id)
      this.scores.forEach((function(scores){
        if(scores.game_id == this.targetGame.id){
          this.targetScore_list.push(scores)
        }
      }.bind(this)))
      this.targetScore_list.forEach((function(scores){
        const score = []
        score.date = scores.date
        score.member1 = scores.member1.rank + "位　" + scores.member1.name + "　(" + scores.member1.result + "点)"
        score.member2 = scores.member2.rank + "位　" + scores.member2.name + "　(" + scores.member2.result + "点)"
        score.member3 = scores.member3.rank + "位　" + scores.member3.name + "　(" + scores.member3.result + "点)"
        score.member4 = scores.member4.rank + "位　" + scores.member4.name + "　(" + scores.member4.result + "点)"
        score.id = scores.id
        this.score_list.push(score)
      }.bind(this)))
    },
  },
    methods: {
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        console.log(id)
        this.deleteScore({ id })
        //this.$router.push({ name: 'Score_edit' })
        this.fetchScores()
        this.scores = this.$store.state.scores
      }
    },
    ...mapActions(['deleteScore','fetchGames','fetchScores'])
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>