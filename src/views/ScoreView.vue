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
        <v-simple-table :headers='headers' :items='addresses'>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">#</th>
                <th class="text-left" v-for="(item, name) in targetGame.members" :key="name">{{item.name}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in ranking" :key="item.rank">
                <td>{{ item.rank }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.sam_result }}</td>
                <td>{{ item.point }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
<!--
      <v-flex>
        <div>
          <p>
            {{targetGame}}<br>
            {{}}<br>
            {{}}

          </p>
        </div>
      </v-flex>
-->
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created(){
    this.fetchGames()
    this.fetchScores()
    this.games = this.$store.state.games
    this.scores = this.$store.state.scores
  },
  data () {
    return {
      targetGame: [],
      game_id:null,
      games: [],
      scores: [],
      ranking:[],
    }
  },
  watch:{
    game_id: function(){
      this.targetGame = this.$store.getters.getMembersById(this.game_id)
    },
  },
    methods: {
    ...mapActions(['fetchGames','fetchScores'])
  }
}
</script>

