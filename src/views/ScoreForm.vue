<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>

      <v-flex>
        <v-card>
          <v-form>
          <v-card-title>卓設定</v-card-title>
            <v-card-text> 
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="games"
                    item-text="name"
                    label="対局選択"
                    item-value="id"
                    v-model="score.game_id"
                    required>
                  </v-select>
                </v-col>
              </v-row>
              <v-radio-group v-model="score.taku" row required>
                <v-radio label="一軍" value=1></v-radio>
                <v-radio label="三軍" value=-1></v-radio>
                <v-radio label="その他" value=0></v-radio>                
              </v-radio-group>
            </v-card-text>
            <v-card-title>点数入力</v-card-title>
            <v-card-text>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="面子1"
                    item-value="{No,name}"
                    v-model="score.member1.name"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field v-model.number="score.member1.score" label="点数" required></v-text-field>
              <v-row justify="space-around">
                <v-checkbox class="mx-2" v-model="score.member1.tori" label="鳥" value=1></v-checkbox>
                <v-checkbox class="mx-2" v-model="score.member1.tobi" label="飛" value=1></v-checkbox>
                <v-checkbox class="mx-2" v-model="score.member1.hako" label="箱" value=1></v-checkbox>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="面子2"
                    item-value="No"
                    v-model="score.member2.name"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field v-model.number="score.member2.score" label="点数" required></v-text-field>
              <v-row justify="space-around">
                <v-checkbox v-model="score.member2.tori" label="鳥" value=1></v-checkbox>
                <v-checkbox v-model="score.member2.tobi" label="飛" value=1></v-checkbox>
                <v-checkbox v-model="score.member2.hako" label="箱" value=1></v-checkbox>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="面子3"
                    item-value3="No"
                    v-model="score.member3.name"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field v-model.number="score.member3.score" label="点数" required></v-text-field>
              <v-row justify="space-around">
                <v-checkbox v-model="score.member3.tori" label="鳥" value=1></v-checkbox>
                <v-checkbox v-model="score.member3.tobi" label="飛" value=1></v-checkbox>
                <v-checkbox v-model="score.member3.hako" label="箱" value=1></v-checkbox>
              </v-row>
            </v-card-text>
            <v-card-text v-show="targetGame.mode=='4'">
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="面子4"
                    item-value="No"
                    v-model="score.member4.name"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field v-model.number="score.member4.score" label="点数" required></v-text-field>
              <v-row justify="space-around">
                <v-checkbox v-model="score.member4.tori" label="鳥" value=1></v-checkbox>
                <v-checkbox v-model="score.member4.tobi" label="飛" value=1></v-checkbox>
                <v-checkbox v-model="score.member4.hako" label="箱" value=1></v-checkbox>
              </v-row>
            </v-card-text>
            <v-card-text>
              <div class="text-center">
                <v-btn color="info" class="ml-2" @click="submit">点数確定</v-btn>
              </div>
            </v-card-text>  
          </v-form>
        </v-card>
      </v-flex>

      <v-flex>
        <div>
          <p>
            {{score}}
          </p>
        </div>
      </v-flex>
-->
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  created () {
    this.games = this.$store.state.games
  },
  data () {
    return {
      games: [],
      items: [],
      targetGame: [],
      //game_id:"",
      score: {
        game_id:null,
        member1:{},
        member2:{},
        member3:{},
        member4:{},
      },
      key:[],
      score_id:1,
    }
  },
  watch:{
    'score.game_id': function(){
      this.targetGame = this.$store.getters.getMembersById(this.score.game_id)
    },
  },

  methods:{
    ...mapActions(['fetchGames'])
  }
}
</script>