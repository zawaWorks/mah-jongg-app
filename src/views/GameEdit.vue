<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Game_form' }">対局設定</router-link> |
      <router-link :to="{ name: 'Game_edit' }">対局編集</router-link>
    </div>
    <v-layout>

      <v-flex xs12 mt-5 justify-center>
        <v-divider></v-divider>
        <v-data-table :headers='headers' :items='games'>
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'Game_form', params: { game_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <!--
        <div>
          <p>
            {{this.games}}<br>
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
    this.fetchGames()
    this.games = this.$store.state.games
    this.fetchScores()
    this.scores = this.$store.state.scores
  },
  data () {
    return {
      games: [],
      scores: [],
      score_list:[],
      headers: [
        { text: '日時', value: 'date' },
        { text: '対局名', value: 'name' },
        { text: '操作', value: 'action', sortable: false }
      ],
    }
  },
  watch:{

  },
    methods: {
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        //console.log(id)
        this.deleteGame({ id })
        //this.fetchGames()
        this.score_list=[]
        this.targetScore_list = []
        this.scores.forEach((function(score){
          if(score.game_id == id){
            let score_id = String(score.id)
            console.log(score.id)
            console.log(score_id)
            this.deleteScore({score_id})
          }
        }.bind(this)))
      }
    },
    ...mapActions(['deleteGame','fetchGames','fetchScores','deleteScore'])
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>