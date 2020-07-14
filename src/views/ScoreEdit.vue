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
        <v-data-table :headers='headers' :items='addresses'>
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'Address_edit', params: { address_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        
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
        { text: '名前', value: 'name' },
        { text: '電話番号', value: 'tel' },
        { text: 'メールアドレス', value: 'email' },
        { text: '住所', value: 'address' },
        { text: '操作', value: 'action', sortable: false }
      ],
    }
  },
  watch:{
    game_id: function(){
      this.scores = this.$store.state.scores
      this.score_list = []
      this.No = 1
      this.targetGame = this.$store.getters.getMembersById(this.game_id)
    },
  },
    methods: {
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteAddress({ id })
      }
    },
    ...mapActions(['deleteAddress','fetchGames','fetchScores'])
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>