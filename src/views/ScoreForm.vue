<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>

      <v-flex xs12 class="text-center">
        <h1>点数入力</h1>
      </v-flex>

      <v-flex>
        <v-card>
          <v-form>
            <v-row align="center">
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  :items="games"
                  item-text="name"
                  label="対局選択"
                  item-value="id"
                  v-model="game_id"
                  required>
                ></v-select>
              </v-col>
            </v-row>
            <v-card-text>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="面子1"
                    item-value="No"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field v-model="targetGame.score1" label="点数"></v-text-field>
              <v-checkbox v-model="targetGame.ichigun1" label="一軍"></v-checkbox>
              <v-checkbox v-model="targetGame.sangun1" label="三軍"></v-checkbox>
              <v-checkbox v-model="targetGame.tori1" label="鳥"></v-checkbox>
              <v-checkbox v-model="targetGame.tobi1" label="飛"></v-checkbox>
              <v-checkbox v-model="targetGame.hako1" label="箱"></v-checkbox>
            </v-card-text>
            <v-card-text>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="面子2"
                    item-value="No"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field v-model="targetGame.score2" label="点数"></v-text-field>
              <v-checkbox v-model="targetGame.tori2" label="鳥"></v-checkbox>
              <v-checkbox v-model="targetGame.tobi2" label="飛"></v-checkbox>
              <v-checkbox v-model="targetGame.hako2" label="箱"></v-checkbox>
            </v-card-text>
            <v-card-text>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="面子3"
                    item-value="No"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field v-model="targetGame.score3" label="点数"></v-text-field>
              <v-checkbox v-model="targetGame.tori3" label="鳥"></v-checkbox>
              <v-checkbox v-model="targetGame.tobi3" label="飛"></v-checkbox>
              <v-checkbox v-model="targetGame.hako3" label="箱"></v-checkbox>
            </v-card-text>
            <v-card-text v-show="targetGame.mode=='4'">
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="面子4"
                    item-value="No"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field v-model="targetGame.score4" label="点数"></v-text-field>
              <v-checkbox v-model="targetGame.tori4" label="鳥"></v-checkbox>
              <v-checkbox v-model="targetGame.tobi4" label="飛"></v-checkbox>
              <v-checkbox v-model="targetGame.hako4" label="箱"></v-checkbox>
            </v-card-text>
            <v-card-text>
               <div class="text-center">
                 <v-btn color="info" class="ml-2" @click="submit">点数確定</v-btn>
               </div>
            </v-card-text>  
          </v-form>
        </v-card>
      </v-flex>
<!--
      <v-row align="center">
        <div>
          <hr>

          {{targetGame}}
        </div>
      </v-row>
-->
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  created () {
    this.games = this.$store.state.games
    this.items = this.games
  },
  data () {
    return {
      games: [],
      items: [],
      game_id: null,
      targetGame: [],
      game_list:[],
      key:[],
      id:null,
    }
  },
  watch:{
    game_id: function(){
      this.targetGame = this.$store.getters.getMembersById(this.game_id)
    }
  },

  methods:{
    ...mapActions(['fetchGames'])
  }
}
</script>