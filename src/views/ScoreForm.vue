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
                    label="東家"
                    item-value="No"
                    v-model="score.member1.name_no"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field type="number" v-model.number="score.member1.score" label="点数（百点単位）" required></v-text-field>
              <v-row justify="space-around">
                <v-checkbox class="mx-2" v-model="score.member1.tori" label="鳥" value=1></v-checkbox>
                <v-checkbox class="mx-2" v-model="score.member1.tobashi" label="飛" value=1></v-checkbox>
                <v-checkbox class="mx-2" v-model="score.member1.hako" label="箱" value=1></v-checkbox>
              </v-row>
              <h2>得点：{{member1Result}}</h2>
            </v-card-text>
            <v-card-text>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="南家"
                    item-value="No"
                    v-model="score.member2.name_no"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field type="number" v-model.number="score.member2.score" label="点数（百点単位）" required></v-text-field>
              <v-row justify="space-around">
                <v-checkbox v-model="score.member2.tori" label="鳥" value=1></v-checkbox>
                <v-checkbox v-model="score.member2.tobashi" label="飛" value=1></v-checkbox>
                <v-checkbox v-model="score.member2.hako" label="箱" value=1></v-checkbox>
              </v-row>
              <h2>得点：{{member2Result}}</h2>
            </v-card-text>
            <v-card-text>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="西家"
                    item-value3="No"
                    v-model="score.member3.name_no"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field type="number" v-model.number="score.member3.score" label="点数（百点単位）" required></v-text-field>
              <v-row justify="space-around">
                <v-checkbox v-model="score.member3.tori" label="鳥" value=1></v-checkbox>
                <v-checkbox v-model="score.member3.tobashi" label="飛" value=1></v-checkbox>
                <v-checkbox v-model="score.member3.hako" label="箱" value=1></v-checkbox>
              </v-row>
              <h2>得点：{{member3Result}}</h2>
            </v-card-text>
            <v-card-text v-show="targetGame.mode=='4'">
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="北家"
                    item-value="No"
                    v-model="score.member4.name_no"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field type="number" v-model.number="score.member4.score" label="点数（百点単位）" required></v-text-field>
              <v-row justify="space-around">
                <v-checkbox v-model="score.member4.tori" label="鳥" value=1></v-checkbox>
                <v-checkbox v-model="score.member4.tobashi" label="飛" value=1></v-checkbox>
                <v-checkbox v-model="score.member4.hako" label="箱" value=1></v-checkbox>
              </v-row>
              <h2>得点：{{member4Result}}</h2>
            </v-card-text>
            <v-card-text>
              <div class="text-center">
                <v-btn color="info" class="ml-2">点数確定</v-btn>
              </div>
            </v-card-text>  
          </v-form>
        </v-card>
      </v-flex>

      <v-flex>
        <div>
          <p>
            {{score.member1.rank}}
            {{score.member2.rank}}
            {{score.member3.rank}}
            {{score.member4.rank}}
            {{memberRank}}
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
      targetGame: [
        {
          mode:0,
        }
      ],
      score: {
        game_id:null,
        member1:{
          rank:null,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
        member2:{
          rank:null,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
        member3:{
          rank:null,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
        member4:{
          rank:null,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
      },
      key:[],
      score_id:1,
    }
  },
  computed:{
    memberRank:function(){
      const score_array = [];    
      if(this.targetGame.mode == 4){
        score_array.push(this.score.member1.score);
        score_array.push(this.score.member2.score);
        score_array.push(this.score.member3.score);
        score_array.push(this.score.member4.score);
        score_array.sort(function(a,b){
          return ( a > b ? -1 : 1 );
        });
      }else{
        score_array.push(this.score.member1.score);
        score_array.push(this.score.member2.score);
        score_array.push(this.score.member3.score);
        score_array.sort(function(a,b){
          return ( a > b ? -1 : 1 );
        });
      }
      if(this.targetGame.mode == 4){
        score_array.forEach((function (value , index){
          if(value == this.score.member1.score){
            this.score.member1.rank = index + 1
          }else if(value == this.score.member2.score){
            this.score.member2.rank = index + 1
          }else if(value == this.score.member3.score){
            this.score.member3.rank = index + 1
          }else if(value == this.score.member4.score){
            this.score.member4.rank = index + 1
          }
        }.bind(this)));
      }else{
        score_array.forEach((function (value , index){
          if(value == this.score.member1.score){
            this.score.member1.rank = index + 1
          }else if(value == this.score.member2.score){
            this.score.member2.rank = index + 1
          }else if(value == this.score.member3.score){
            this.score.member3.rank = index + 1
          }
        }.bind(this)));
      }
      return score_array;
    },
    member1Result: function(){
      const kaeshi = Math.floor(this.score.member1.score / 10) - this.targetGame.kaeshi;
      //umaoka = 

      const nengu = this.targetGame.nengu * this.score.taku;
      const tori = this.targetGame.tori * -this.score.member1.tori * (this.targetGame.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)));
      const tobashi = this.targetGame.tobashi *  this.score.member1.tobashi * ((this.score.member1.hako * 1) + (this.score.member2.hako * 1) + (this.score.member3.hako * 1) + (this.score.member4.hako * 1));
      const result = kaeshi + nengu + tori + tobashi;
      if(isNaN(result)) return 0;
      if(!isFinite(result)) return 0;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member1.result = result;
      return result      
    },
    member2Result: function(){
      return this.score.member2.score + (this.targetGame.nengu * this.score.taku) + (this.targetGame.tori * -this.score.member2.tori * (this.targetGame.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)))) + (this.targetGame.tobashi *  this.score.member2.tobashi * ((this.score.member1.hako * 1) + (this.score.member2.hako * 1) + (this.score.member3.hako * 1) + (this.score.member4.hako * 1)))
      
    },
    member3Result: function(){
      return this.score.member3.score + (this.targetGame.nengu * this.score.taku) + (this.targetGame.tori * -this.score.member3.tori * (this.targetGame.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)))) + (this.targetGame.tobashi *  this.score.member3.tobashi * ((this.score.member1.hako * 1) + (this.score.member2.hako * 1) + (this.score.member3.hako * 1) + (this.score.member4.hako * 1)))
      
    },
    member4Result: function(){
      return this.score.member4.score + (this.targetGame.nengu * this.score.taku) + (this.targetGame.tori * -this.score.member4.tori * (this.targetGame.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)))) + (this.targetGame.tobashi *  this.score.member4.tobashi * ((this.score.member1.hako * 1) + (this.score.member2.hako * 1) + (this.score.member3.hako * 1) + (this.score.member4.hako * 1)))
      
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