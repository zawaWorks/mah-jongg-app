<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Ranking_view' }">ランキング</router-link> |
      <router-link :to="{ name: 'about' }">個人戦績</router-link>
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
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">順位</th>
                <th class="text-left">名前</th>
                <th class="text-left">得点</th>
                <th class="text-left">ポイント</th>
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
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created(){
    this.games = this.$store.state.games
  },
  data () {
    return {
      game_id:null,
      ranking:[],
    }
  },
    methods: {
  }
}
</script>

