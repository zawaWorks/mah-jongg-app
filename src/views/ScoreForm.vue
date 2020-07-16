<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Score_input' }">点数入力</router-link> |
      <router-link :to="{ name: 'Score_edit' }">点数編集</router-link>
    </div>

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
            <v-divider></v-divider>
            <v-card-title>点数計算</v-card-title>
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
                <v-checkbox class="mx-2" v-model="score.member1.hako" label="箱" value=1></v-checkbox>
                <v-checkbox class="mx-2" v-model="score.member1.tobashi" label="飛" value=1></v-checkbox>
              </v-row>
              <h2>得点：{{member1Result}}</h2>
            </v-card-text>
            <v-divider></v-divider>
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
                <v-checkbox v-model="score.member2.hako" label="箱" value=1></v-checkbox>
                <v-checkbox v-model="score.member2.tobashi" label="飛" value=1></v-checkbox>
              </v-row>
              <h2>得点：{{member2Result}}</h2>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="targetGame.members"
                    item-text="name"
                    label="西家"
                    item-value="No"
                    v-model="score.member3.name_no"
                    required>
                  ></v-select>
                </v-col>
              </v-row>
              <v-text-field type="number" v-model.number="score.member3.score" label="点数（百点単位）" required></v-text-field>
              <v-row justify="space-around">
                <v-checkbox v-model="score.member3.tori" label="鳥" value=1></v-checkbox>
                <v-checkbox v-model="score.member3.hako" label="箱" value=1></v-checkbox>
                <v-checkbox v-model="score.member3.tobashi" label="飛" value=1></v-checkbox>
              </v-row>
              <h2>得点：{{member3Result}}</h2>
            </v-card-text>
            <v-divider></v-divider>
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
                <v-checkbox v-model="score.member4.hako" label="箱" value=1></v-checkbox>
                <v-checkbox v-model="score.member4.tobashi" label="飛" value=1></v-checkbox>
              </v-row>
              <h2>得点：{{member4Result}}</h2>
            </v-card-text>
            <v-card-text>
              <div class="text-center">
                <v-btn color="info" class="ml-2" @click="submit">点数確定</v-btn>
              </div>
            </v-card-text>  
          </v-form>
        </v-card>
      
        <div>
          <p>
            {{score}}<br>
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
  created () {
    this.fetchGames()
    this.games = this.$store.state.games
    if (!this.$route.params.score_id) return
    const score = this.$store.getters.getScoreById(this.$route.params.score_id)
    if (score) {
      this.score = score
    } else {
      this.$router.push({ name: 'Score_input' })
    }
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
          name:null,
          rank:null,
          kari_result:0,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
        member2:{
          name:null,
          rank:null,
          kari_result:0,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
        member3:{
          name:null,
          rank:null,
          kari_result:0,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
        member4:{
          name:null,
          rank:null,
          kari_result:0,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
      },
    }
  },
  computed:{
    memberRank:function(){
      const score_array = [];
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member1.rank = null;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member2.rank = null;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member3.rank = null;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member4.rank = null;
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
          if(value == this.score.member1.score && this.score.member1.rank == null){
              this.score.member1.rank = index + 1
          }else if(value == this.score.member2.score && this.score.member2.rank == null){
              this.score.member2.rank = index + 1
          }else if(value == this.score.member3.score && this.score.member3.rank == null){
              this.score.member3.rank = index + 1
          }else if(value == this.score.member4.score && this.score.member4.rank == null){
              this.score.member4.rank = index + 1
          }
        }.bind(this)));
      }else{
        score_array.forEach((function (value , index){
          if(value == this.score.member1.score && this.score.member1.rank == null){
              this.score.member1.rank = index + 1
          }else if(value == this.score.member2.score && this.score.member2.rank == null){
              this.score.member2.rank = index + 1
          }else if(value == this.score.member3.score && this.score.member3.rank == null){
              this.score.member3.rank = index + 1
          }
        }.bind(this)));
      }
      return score_array;
    },

    member1Result: function(){
      this.memberRank
      var nengu = this.targetGame.nengu * this.score.taku;
      //console.log(nengu)
      if(this.score.member1.rank == 1){
        var kari_result = (this.score.member2.kari_result + this.score.member3.kari_result + this.score.member4.kari_result) * -1
        var result = kari_result + nengu
      }else{
        var kaeshi = Math.ceil(this.score.member1.score / 10) - this.targetGame.kaeshi;
        var umaoka = 0;
        if(this.score.member1.rank == 2){
          umaoka = this.targetGame.uma2
        }else if(this.score.member1.rank == 3){
          umaoka = this.targetGame.uma2 * -1
        }else if(this.score.member1.rank == 4){
          umaoka = this.targetGame.uma1 * -1
        }
        var tori_minus = this.targetGame.tori * -this.score.member1.tori * (this.targetGame.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)));
        if(this.score.member1.tori != 1){
          var tori_plus = this.targetGame.tori * ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1));
        } else{
          tori_plus = 0
        }
        var tobashi = this.targetGame.tobashi *  this.score.member1.tobashi * ((this.score.member1.hako * 1) + (this.score.member2.hako * 1) + (this.score.member3.hako * 1) + (this.score.member4.hako * 1));
        var hako = this.targetGame.tobashi * (this.score.member1.hako * -1)
        kari_result = kaeshi + tori_minus + tori_plus + tobashi + hako + umaoka;
        result = kari_result + nengu
      }
      if(this.score.member1.score == null) return 0;
      if(isNaN(result)) return 0;
      if(!isFinite(result)) return 0;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member1.kari_result = kari_result;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member1.result = result;
      this.targetGame.members.forEach((function(member){
        if(member.No == this.score.member1.name_no){
          this.score.member1.name = member.name
        }
        }.bind(this)))
      return result      
    },
    member2Result: function(){
      this.memberRank
      //this.nameCheck
      var nengu = this.targetGame.nengu * this.score.taku;
      if(this.score.member2.rank == 1){
        var kari_result = (this.score.member1.kari_result + this.score.member3.kari_result + this.score.member4.kari_result) * -1
        var result = kari_result + nengu
      }else{
        var kaeshi = Math.ceil(this.score.member2.score / 10) - this.targetGame.kaeshi;
        var umaoka = 0;
        if(this.score.member2.rank == 1){
          umaoka = this.targetGame.uma1 + ((this.targetGame.kaeshi - this.targetGame.start_score) * 4 )
        }else if(this.score.member2.rank == 2){
          umaoka = this.targetGame.uma2
        }else if(this.score.member2.rank == 3){
          umaoka = this.targetGame.uma2 * -1
        }else if(this.score.member2.rank == 4){
          umaoka = this.targetGame.uma1 * -1
        }
        var tori_minus = this.targetGame.tori * -this.score.member2.tori * (this.targetGame.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)));
        if(this.score.member2.tori != 1){
          var tori_plus = this.targetGame.tori * ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1));
        } else{
          tori_plus = 0
        }
        var tobashi = this.targetGame.tobashi *  this.score.member2.tobashi * ((this.score.member1.hako * 1) + (this.score.member2.hako * 1) + (this.score.member3.hako * 1) + (this.score.member4.hako * 1));
        var hako = this.targetGame.tobashi * (this.score.member2.hako * -1)
        kari_result = kaeshi + tori_minus + tori_plus + tobashi + hako + umaoka;
        result = kari_result + nengu
      }
      if(this.score.member2.score == null) return 0;
      if(isNaN(result)) return 0;
      if(!isFinite(result)) return 0;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member2.kari_result = kari_result;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member2.result = result;
      this.targetGame.members.forEach((function(member){
        if(member.No == this.score.member2.name_no){
          this.score.member2.name = member.name
        }
        }.bind(this)))
      return result     
    },
    member3Result: function(){
      this.memberRank
      //this.nameCheck
      var nengu = this.targetGame.nengu * this.score.taku;
      if(this.score.member3.rank == 1){
        var kari_result = (this.score.member1.kari_result + this.score.member2.kari_result + this.score.member4.kari_result) * -1
        var result = kari_result + nengu
      }else{
        var kaeshi = Math.ceil(this.score.member3.score / 10) - this.targetGame.kaeshi;
        var umaoka = 0;
        if(this.score.member3.rank == 1){
          umaoka = this.targetGame.uma1 + ((this.targetGame.kaeshi - this.targetGame.start_score) * 4 )
        }else if(this.score.member3.rank == 2){
          umaoka = this.targetGame.uma2
        }else if(this.score.member3.rank == 3){
          umaoka = this.targetGame.uma2 * -1
        }else if(this.score.member3.rank == 4){
          umaoka = this.targetGame.uma1 * -1
        }
        var tori_minus = this.targetGame.tori * -this.score.member3.tori * (this.targetGame.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)));
        if(this.score.member3.tori != 1){
          var tori_plus = this.targetGame.tori * ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1));
        } else{
          tori_plus = 0
        }
        var tobashi = this.targetGame.tobashi *  this.score.member3.tobashi * ((this.score.member1.hako * 1) + (this.score.member2.hako * 1) + (this.score.member3.hako * 1) + (this.score.member4.hako * 1));
        var hako = this.targetGame.tobashi * (this.score.member3.hako * -1)
        kari_result = kaeshi + tori_minus + tori_plus + tobashi + hako + umaoka;
        result = kari_result + nengu
      }
      if(this.score.member3.score == null) return 0;
      if(isNaN(result)) return 0;
      if(!isFinite(result)) return 0;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member3.kari_result = kari_result;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member3.result = result;
      this.targetGame.members.forEach((function(member){
        if(member.No == this.score.member3.name_no){
          this.score.member3.name = member.name
        }
        }.bind(this)))
      return result     
    },
    member4Result: function(){
      this.memberRank
      //this.nameCheck
      var nengu = this.targetGame.nengu * this.score.taku;
      if(this.score.member4.rank == 1){
        var kari_result = (this.score.member1.kari_result + this.score.member2.kari_result + this.score.member3.kari_result) * -1
        var result = kari_result + nengu
      }else{
        var kaeshi = Math.ceil(this.score.member4.score / 10) - this.targetGame.kaeshi;
        var umaoka = 0;
        if(this.score.member4.rank == 1){
          umaoka = this.targetGame.uma1 + ((this.targetGame.kaeshi - this.targetGame.start_score) * 4 )
        }else if(this.score.member4.rank == 2){
          umaoka = this.targetGame.uma2
        }else if(this.score.member4.rank == 3){
          umaoka = this.targetGame.uma2 * -1
        }else if(this.score.member4.rank == 4){
          umaoka = this.targetGame.uma1 * -1
        }
        var tori_minus = this.targetGame.tori * -this.score.member4.tori * (this.targetGame.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)));
        if(this.score.member4.tori != 1){
          var tori_plus = this.targetGame.tori * ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1));
        } else{
          tori_plus = 0
        }
        var tobashi = this.targetGame.tobashi *  this.score.member4.tobashi * ((this.score.member1.hako * 1) + (this.score.member2.hako * 1) + (this.score.member3.hako * 1) + (this.score.member4.hako * 1));
        var hako = this.targetGame.tobashi * (this.score.member4.hako * -1)
        kari_result = kaeshi + tori_minus + tori_plus + tobashi + hako + umaoka;
        result = kari_result + nengu
      }
      if(this.score.member4.score == null) return 0;
      if(isNaN(result)) return 0;
      if(!isFinite(result)) return 0;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member4.kari_result = kari_result;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member4.result = result;
      this.targetGame.members.forEach((function(member){
        if(member.No == this.score.member4.name_no){
          this.score.member4.name = member.name
        }
        }.bind(this)))
      return result      
    }
  },
  watch:{
    'score.game_id': function(){
      this.targetGame = this.$store.getters.getMembersById(this.score.game_id)
      this.setGameID(this.score.game_id)
    },
  },

  methods:{
    submit () {
      if (this.$route.params.score_id) {
        this.updateScore({ id: this.$route.params.score_id, score: this.score })
      } else {
        this.score.date = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
        this.addScore(this.score)
      }
      this.score.member1.score = null
      this.score.member1.name_no = null
      this.score.member1.tori = 0
      this.score.member1.tobashi = 0
      this.score.member1.hako = 0
      this.score.member2.score = null
      this.score.member2.name_no = null
      this.score.member2.tori = 0
      this.score.member2.tobashi = 0
      this.score.member2.hako = 0
      this.score.member3.score = null
      this.score.member3.name_no = null
      this.score.member3.tori = 0
      this.score.member3.tobashi = 0
      this.score.member3.hako = 0
      this.score.member4.score = null
      this.score.member4.name_no = null
      this.score.member4.tori = 0
      this.score.member4.tobashi = 0
      this.score.member4.hako = 0
      this.memberRank
      this.member1Result
      this.member2Result
      this.member3Result
      this.member4Result
    },
    ...mapActions(['addScore','updateScore','fetchGames','fetchScores','setGameID'])
  }
}
</script>