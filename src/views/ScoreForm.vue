<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Score_form' }">点数入力</router-link> |
      <router-link :to="{ name: 'Score_edit' }">点数編集</router-link>
    </div>

    <v-layout row wrap justify-center>
      <v-flex xs12 mt-5 justify-center>
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
              <p>対局形式</p>
                <v-radio-group v-model="score.mode" row>
                  <v-radio label="四麻" value="4"></v-radio>
                  <v-radio label="三麻" value="3"></v-radio>
                </v-radio-group>
              <v-radio-group v-show=false v-model="score.taku" row required>
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
              <h2 v-show="!Debug">得点：{{member1Result}}</h2>
              <v-text-field v-show="Debug" type="number" v-model.number="score.member1.result" label="得点入力"></v-text-field>
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
              <h2 v-show="!Debug">得点：{{member2Result}}</h2>
              <v-text-field v-show="Debug" type="number" v-model.number="score.member2.result" label="得点入力"></v-text-field>
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
              <h2 v-show="!Debug">得点：{{member3Result}}</h2>
              <v-text-field v-show="Debug" type="number" v-model.number="score.member3.result" label="得点入力"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text v-show="score.mode=='4'">
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
              <h2 v-show="!Debug">得点：{{member4Result}}</h2>
              <v-text-field v-show="Debug" type="number" v-model.number="score.member4.result" label="得点入力"></v-text-field>
            </v-card-text>
            <v-card-text>
              <div class="text-center">
                <v-btn v-if="formValidation" color="info" class="ml-2" @click="submit">確定</v-btn>
                <v-btn v-else @click.stop="dialog = true">確定</v-btn>
                <v-dialog v-model="dialog" max-width="90%">
                  <v-card>
                    <v-card-title class="headline">入力エラー</v-card-title>

                    <v-card-text>
                      点数や面子の入力内容に間違いがあるかも
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        OK
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-text>
            <v-checkbox class="mx-2" v-model="Debug" label="Debug Mode"></v-checkbox>
          </v-form>
        </v-card>
      <!--
        <div>
          <p>
            {{validation_list}}<br>
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
import firebase from 'firebase'
import { mapActions } from 'vuex';
import { myMixin } from "../components/utility";
export default {
  mixins: [myMixin],
  created () {
    //事前にgame_idが保存されている場合はid設定を行う
    if(this.$store.state.game_id){
      this.score.game_id = this.$store.state.game_id
    }
    //対局選択のための対局一覧（games）を取得
    this.getGames()
    //URLにscore_idが含まれている場合、スコア編集と判断しidから該当するスコアデータを取得
    if (!this.$route.params.score_id) return
    this.getScoreById(this.$route.params.score_id)
  },
  data () {
    return {
      dialog: false,
      Debug:false,
      games: [],
      items: [],
      targetGame: [
        {
          id:null,
          name:null,
          mode:0,
          members:[]
        }
      ],
      score: {
        game_id:null,
        mode:"4",
        taku:"0",
        member1:{
          name_no:null,
          name:null,
          rank:null,
          kari_result:0,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
        member2:{
          name_no:null,
          name:null,
          rank:null,
          kari_result:0,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
        member3:{
          name_no:null,
          name:null,
          rank:null,
          kari_result:0,
          result:0,
          tori:0,
          tobashi:0,
          hako:0
        },
        member4:{
          name_no:null,
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
    //入力値のバリデーション
    formValidation:function(){
      //入力点数判定用の変数定義
      var score_sum = 0;
      //バリデーション用の配列定義
      var validation_list = []
      //点数チェックのための正解値（初期点数＊（四麻（４）or 三麻（３）））＊１０（桁あわせ）
      var score_check = 0
      if(this.score.mode == 4){
        score_check = this.targetGame.start_score * this.score.mode * 10
      }else{
        score_check = 35 * this.score.mode * 10
      }
      //入力点数の合計算出
      if(this.score.mode == 4){
        score_sum = this.score.member1.score + this.score.member2.score + this.score.member3.score + this.score.member4.score
      }else{
        score_sum = this.score.member1.score + this.score.member2.score + this.score.member3.score
      }
      //正解値と点数合計から入力値を判定しバリデーション用配列に結果格納
      if (score_sum==score_check){
        validation_list.push(true)
      }else{
        validation_list.push(false)
      }
      //面子の重複チェックのためのリスト生成
      var member_list =[this.score.member1.name_no,this.score.member2.name_no,this.score.member3.name_no,this.score.member4.name_no]
      //面子リストをもとに重複判定しバリデーション用配列に結果格納
      if (member_list.every((v, i, self) => self.indexOf(v) === i)) {
        validation_list.push(true)
      }else{
        validation_list.push(false)
      }
      //バリデーション用配列が全てtureならture、一つでもfalseならfalseをリターンする
      var result = false
      if(this.Debug == false){
        // eslint-disable-next-line no-unused-vars
        result = validation_list.every(function(val, index, array){ return (val)})
      }else{
        result = true
      }
      
      return result;
    },
    //順位判定
    memberRank:function(){
      //判定用点数配列の定義
      var score_array = [];
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member1.rank = null; //順位データの初期化
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member2.rank = null; //順位データの初期化
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member3.rank = null; //順位データの初期化
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member4.rank = null; //順位データの初期化
      //四麻用の順位判定用配列の生成
      if(this.score.mode == 4){
        //各面子の点数を配列に格納
        score_array.push(this.score.member1.score);
        score_array.push(this.score.member2.score);
        score_array.push(this.score.member3.score);
        score_array.push(this.score.member4.score);
        //配列を点数の降順にソート
        score_array.sort(function(a,b){
          return ( a > b ? -1 : 1 );
        });
      //三麻用の順位判定用配列の生成
      }else{
        //各面子の点数を配列に格納
        score_array.push(this.score.member1.score);
        score_array.push(this.score.member2.score);
        score_array.push(this.score.member3.score);
        //配列を点数の降順にソート
        score_array.sort(function(a,b){
          return ( a > b ? -1 : 1 );
        });
      }
      //四麻用の順位判定
      if(this.score.mode == 4){
        //順位判定用配列をループし、起家から順に点数が一致するか判定する（同点の場合は上家が優先されるため起家から判定する）
        score_array.forEach((function (value , index){
          //判定式は点数が一致すること、and、まだ順位未判定（rank == null）であること
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
      //三麻用の順位判定
      }else{
        //順位判定用配列をループし、起家から順に点数が一致するか判定する（同点の場合は上家が優先されるため起家から判定する）
        score_array.forEach((function (value , index){
          //判定式は点数が一致すること、and、まだ順位未判定（rank == null）であること
          if(value == this.score.member1.score && this.score.member1.rank == null){
              this.score.member1.rank = index + 1
          }else if(value == this.score.member2.score && this.score.member2.rank == null){
              this.score.member2.rank = index + 1
          }else if(value == this.score.member3.score && this.score.member3.rank == null){
              this.score.member3.rank = index + 1
          }
        }.bind(this)));
      }
      //リターンに特に意味はない
      return score_array;
    },
    //東家の得点算出
    member1Result: function(){
      //箱フラグの自動設定
      if(this.score.member1.score < 0){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.score.member1.hako = "1"
      }else{
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.score.member1.hako = "0"
      }
      //順位判定を実施
      this.memberRank
      //卓設定から年貢を算出
      var nengu = this.targetGame.nengu * this.score.taku;
      //1位の場合の点数算出
      if(this.score.member1.rank == 1){
        //自分以外の面子の仮得点の合計を算出
        var kari_result = (this.score.member2.kari_result + this.score.member3.kari_result + this.score.member4.kari_result) * -1
        //仮得点に年貢を加算し点数を確定
        var result = kari_result + nengu
      //2位以下の場合の点数算出
      }else{
        //点数から返しを減算する
        var kaeshi = 0
        if(this.score.mode == 4 ) {
          kaeshi = Math.ceil(this.score.member1.score / 10) - this.targetGame.kaeshi;
        }else{
          kaeshi = Math.ceil(this.score.member1.score / 10) - 35;
        }
        //ウマオカ計算のための変数宣言
        var umaoka = 0;
        //順位をもとにウマオカを判定し変数に格納
        if(this.score.mode == 4 ) {
          if(this.score.member1.rank == 2){
            umaoka = this.targetGame.uma2
          }else if(this.score.member1.rank == 3){
            umaoka = this.targetGame.uma2 * -1
          }else if(this.score.member1.rank == 4){
            umaoka = this.targetGame.uma1 * -1
          }
        }else{
          if(this.score.member1.rank == 1){
            umaoka = this.targetGame.uma1 + this.targetGame.uma2
          }else if(this.score.member1.rank == 3){
            umaoka = (this.targetGame.uma1 + this.targetGame.uma2) * -1
          }
        }
        //鳥のマイナス分を算出（鳥罰符＊自分の鳥フラグ（判定）＊鳥人数）
        var tori_minus = this.targetGame.tori * -this.score.member1.tori * (this.score.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)));
        //自分が鳥でない場合のみ、鳥のプラス分を算出（鳥の場合はプラス分は0）
        if(this.score.member1.tori != 1){
          //鳥のプラス分を算出（鳥罰符＊鳥人数）
          var tori_plus = this.targetGame.tori * ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1));
        } else{
          tori_plus = 0
        }
        //飛ばし賞の判定及び算出（飛ばし賞点数＊自分の飛ばしフラグ（判定）＊飛ばした人数）
        var tobashi = this.targetGame.tobashi *  this.score.member1.tobashi * ((this.score.member1.hako * 1) + (this.score.member2.hako * 1) + (this.score.member3.hako * 1) + (this.score.member4.hako * 1));
        //箱罰符の判定及び算出（箱罰符＊自分の箱フラグ（判定）
        var hako = this.targetGame.tobashi * (this.score.member1.hako * -1)
        //仮得点の算出（返し＋鳥マイナス＋鳥プラス＋飛ばし賞＋箱罰符＋ウマオカ）
        kari_result = kaeshi + tori_minus + tori_plus + tobashi + hako + umaoka;
        //仮得点に年貢を加算し点数を確定
        result = kari_result + nengu
      }
      //点数未入力の場合処理をは得点は0を表示（リターン0）
      if(this.score.member1.score == null) return 0;
      //得点計算結果がisNaNの場合処理をは得点は0を表示（リターン0）
      if(isNaN(result)) return 0;
      //得点計算結果が!isFiniteの場合処理をは得点は0を表示（リターン0）
      if(!isFinite(result)) return 0;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member1.kari_result = kari_result; //算出した仮得点をスコアデータに格納
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.score.member1.result = result; //算出した得点をスコアデータに格納
      //対局設定の面子データをもとにスコアデータの面子にnameを追加
      this.targetGame.members.forEach((function(member){
        if(member.No == this.score.member1.name_no){
          this.score.member1.name = member.name
        }
      }.bind(this)))
      return result      
    },
    //南家の得点算出（詳細コメントは東家を参照）
    member2Result: function(){
      //箱フラグの自動設定
      if(this.score.member2.score < 0){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.score.member2.hako = "1"
      }else{
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.score.member2.hako = "0"
      }
      this.memberRank
      var nengu = this.targetGame.nengu * this.score.taku;
      if(this.score.member2.rank == 1){
        var kari_result = (this.score.member1.kari_result + this.score.member3.kari_result + this.score.member4.kari_result) * -1
        var result = kari_result + nengu
      }else{
        //点数から返しを減算する
        var kaeshi = 0
        if(this.score.mode == 4 ) {
          kaeshi = Math.ceil(this.score.member2.score / 10) - this.targetGame.kaeshi;
        }else{
          kaeshi = Math.ceil(this.score.member2.score / 10) - 35;
        }
        //ウマオカ計算のための変数宣言
        var umaoka = 0;
        //順位をもとにウマオカを判定し変数に格納
        if(this.score.mode == 4 ) {
          if(this.score.member2.rank == 2){
            umaoka = this.targetGame.uma2
          }else if(this.score.member2.rank == 3){
            umaoka = this.targetGame.uma2 * -1
          }else if(this.score.member2.rank == 4){
            umaoka = this.targetGame.uma1 * -1
          }
        }else{
          if(this.score.member2.rank == 1){
            umaoka = this.targetGame.uma1 + this.targetGame.uma2
          }else if(this.score.member2.rank == 3){
            umaoka = (this.targetGame.uma1 + this.targetGame.uma2) * -1
          }
        }
        var tori_minus = this.targetGame.tori * -this.score.member2.tori * (this.score.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)));
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
    //西家の得点算出（詳細コメントは東家を参照）
    member3Result: function(){
      //他面子の点数から自面子の点数を自動算出
      //if(this.score.mode == 3){
      //  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //  this.score.member3.score = (this.score.mode * this.targetGame.start_score * 10) - (this.score.member1.score + this.score.member2.score);
      //}
      //箱フラグの自動設定
      if(this.score.member3.score < 0){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.score.member3.hako = "1"
      }else{
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.score.member3.hako = "0"
      }
      this.memberRank
      var nengu = this.targetGame.nengu * this.score.taku;
      if(this.score.member3.rank == 1){
        var kari_result = (this.score.member1.kari_result + this.score.member2.kari_result + this.score.member4.kari_result) * -1
        var result = kari_result + nengu
      }else{
        //点数から返しを減算する
        var kaeshi = 0
        if(this.score.mode == 4 ) {
          kaeshi = Math.ceil(this.score.member3.score / 10) - this.targetGame.kaeshi;
        }else{
          kaeshi = Math.ceil(this.score.member3.score / 10) - 35;
        }
        //ウマオカ計算のための変数宣言
        var umaoka = 0;
        //順位をもとにウマオカを判定し変数に格納
        if(this.score.mode == 4 ) {
          if(this.score.member3.rank == 2){
            umaoka = this.targetGame.uma2
          }else if(this.score.member3.rank == 3){
            umaoka = this.targetGame.uma2 * -1
          }else if(this.score.member3.rank == 4){
            umaoka = this.targetGame.uma1 * -1
          }
        }else{
          if(this.score.member3.rank == 1){
            umaoka = this.targetGame.uma1 + this.targetGame.uma2
          }else if(this.score.member3.rank == 3){
            umaoka = (this.targetGame.uma1 + this.targetGame.uma2) * -1
          }
        }
        var tori_minus = this.targetGame.tori * -this.score.member3.tori * (this.score.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)));
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
    //北家の得点算出（詳細コメントは東家を参照）
    member4Result: function(){
      //他面子の点数から自面子の点数を自動算出
      //if(this.score.mode == 4){
      //  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //  this.score.member4.score = (this.score.mode * this.targetGame.start_score * 10) - (this.score.member1.score + this.score.member2.score + this.score.member3.score);
      //}
      //箱フラグの自動設定
      if(this.score.member4.score < 0){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.score.member4.hako = "1"
      }else{
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.score.member4.hako = "0"
      }
      this.memberRank
      var nengu = this.targetGame.nengu * this.score.taku;
      if(this.score.member4.rank == 1){
        var kari_result = (this.score.member1.kari_result + this.score.member2.kari_result + this.score.member3.kari_result) * -1
        var result = kari_result + nengu
      }else{
        //点数から返しを減算する
        var kaeshi = 0
        if(this.score.mode == 4 ) {
          kaeshi = Math.ceil(this.score.member4.score / 10) - this.targetGame.kaeshi;
        }else{
          kaeshi = Math.ceil(this.score.member4.score / 10) - 35;
        }
        //ウマオカ計算のための変数宣言
        var umaoka = 0;
        //順位をもとにウマオカを判定し変数に格納
        if(this.score.mode == 4 ) {
          if(this.score.member4.rank == 2){
            umaoka = this.targetGame.uma2
          }else if(this.score.member4.rank == 3){
            umaoka = this.targetGame.uma2 * -1
          }else if(this.score.member4.rank == 4){
            umaoka = this.targetGame.uma1 * -1
          }
        }else{
          if(this.score.member4.rank == 1){
            umaoka = this.targetGame.uma1 + this.targetGame.uma2
          }else if(this.score.member4.rank == 3){
            umaoka = (this.targetGame.uma1 + this.targetGame.uma2) * -1
          }
        }
        var tori_minus = this.targetGame.tori * -this.score.member4.tori * (this.score.mode - ((this.score.member1.tori * 1) + (this.score.member2.tori * 1) + (this.score.member3.tori * 1) + (this.score.member4.tori * 1)));
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
      if(this.score.mode == 4){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.score.member4.result = result;
        this.targetGame.members.forEach((function(member){
          if(member.No == this.score.member4.name_no){
            this.score.member4.name = member.name
          }
        }.bind(this)))
      }else{
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        //this.score.member4.result = null
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        //this.score.member4.name = null
      }

      return result      
    }
  },
  watch:{
    //対局選択でgame_idが設定された場合にidから該当ゲームデータを取得する
    'score.game_id': function(){
      //IDからリファレンスの取得
      const gameRef = firebase.firestore().collection('games').doc(this.score.game_id);
      //リファレンスからデータの取得
      gameRef.get().then((doc)=>{
        //取得したデータを参照用変数に格納
        this.targetGame = doc.data()
        this.targetGame.id = this.score.game_id
      })
      //選択されたidをストアに保存（次回以降の対局選択を省略するため）
      this.setGameID(this.score.game_id)
    },
  },
  methods:{
    //スコア更新の場合、スコアIDから該当スコアデータを取得
    getScoreById(id){
      //リファレンスからデータの取得
      const gameRef = firebase.firestore().collection('scores').doc(id);
      //リファレンスからデータの取得
      gameRef.get().then((doc)=>{
        //データ格納
        this.score = doc.data()
      })
      //データ取得に失敗した場合、ページをリロード（URL内のIDは削除）
      if(!this.score){
        this.$router.push({ name: 'Score_form' })
      }
      return
    },
    //スコアデータの保存処理
    submit () {
      //保存日時の取得
      this.score.date = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
      //URLにscore_idが含まれている場合、スコア編集と判断しアップデート処理を実施
      if (this.$route.params.score_id) {
        //idをもとに更新保存
        firebase.firestore().collection(`scores`).doc(this.$route.params.score_id).update(this.score)
        //更新の場合は更新後に点数編集画面に遷移
        this.$router.push({ name: 'Score_edit'})
      //URLにscore_idが含まれていない場合、新規スコア登録と判断しデータ保存処理を実施
      } else {
        //新規保存
        firebase.firestore().collection(`scores`).add(this.score)
      }
      //スコアデータの初期化
      this.score.taku = null
      this.score.member1.score = null
      this.score.member1.name_no = null
      this.score.member1.name = null
      this.score.member1.tori = 0
      this.score.member1.tobashi = 0
      this.score.member1.hako = 0
      this.score.member1.result = null
      this.score.member2.score = null
      this.score.member2.name_no = null
      this.score.member2.name = null
      this.score.member2.tori = 0
      this.score.member2.tobashi = 0
      this.score.member2.hako = 0
      this.score.member2.result = null
      this.score.member3.score = null
      this.score.member3.name_no = null
      this.score.member3.name = null
      this.score.member3.tori = 0
      this.score.member3.tobashi = 0
      this.score.member3.hako = 0
      this.score.member3.result = null
      this.score.member4.score = null
      this.score.member4.name_no = null
      this.score.member4.name = null
      this.score.member4.tori = 0
      this.score.member4.tobashi = 0
      this.score.member4.hako = 0
      this.score.member4.result = null
      this.memberRank
      this.member1Result
      this.member2Result
      this.member3Result
      this.member4Result
      //デバッグモードOFF
      this.Debug = false
      //データの再取得
      this.getGames()
      //画面トップまで自動スクロール
      this.scrollTop()
    },
    //画面自動スクロール処理
    scrollTop: function(){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    ...mapActions(['setGameID'])
  }
}
</script>

<style scoped lang="scss">
//リンクの下部線非表示
a {
  text-decoration: none;
}
</style>