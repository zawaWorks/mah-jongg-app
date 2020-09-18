<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Game_form' }">対局設定</router-link> |
      <router-link :to="{ name: 'Game_edit' }">対局編集</router-link>
    </div>
    <v-layout row wrap justify-center>
      <v-flex xs12 mt-5 justify-center>
        <v-card>
          <v-form>
            <v-card-text>
               <v-text-field v-model="game.name" label="対局名" required></v-text-field>
            </v-card-text>
            <div class="text-center">
              <v-btn v-if="!detail" @click="detail=!detail">詳細表示</v-btn>
              <v-btn v-else @click="detail=!detail">非表示</v-btn>
            </div>
            <v-card-text v-show="detail">
               <v-text-field v-model="game.rate" label="ポイントレート"></v-text-field>
               <v-text-field v-model="game.nengu" label="年貢"></v-text-field>
               <v-text-field v-model="game.start_score" label="原点"></v-text-field>
               <v-text-field v-model="game.kaeshi" label="原点返し"></v-text-field>
               <v-text-field v-model="game.uma1" label="ウマ（1着）"></v-text-field>
               <v-text-field v-model="game.uma2" label="ウマ（2着）"></v-text-field>
               <v-text-field v-model="game.tori" label="焼き鳥"></v-text-field>
               <v-text-field v-model="game.tobashi" label="飛ばし賞"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <p>面子リスト</p>
              <ul>
                <li v-for="(item, name) in game.members" :key="name">{{item.i}} . {{item.name}}</li>
              </ul>
              <v-select
                :items="members"
                item-text="name"
                label="面子を選択"
                item-value="No"
                v-model="member_No"
                required>
                <template v-slot:append-outer>
                  <v-btn color="info" @click="addmembers">追加</v-btn>
                  <v-btn @click="deletemembers">取消</v-btn>
                </template>
              </v-select>
            </v-card-text>
            <v-card-text  v-show="game.id">
              <v-row justify="space-around">
                <v-checkbox class="mx-2" v-model="game.close" label="対局終了"></v-checkbox>
              </v-row>
            </v-card-text>
            <v-card-text>
              <div class="text-center">
                <v-btn v-if="formValidation" color="info" class="ml-2" @click="submit">確定</v-btn>
                <v-btn v-else @click.stop="dialog = true">確定</v-btn>
                <v-dialog v-model="dialog" max-width="90%">
                  <v-card>
                    <v-card-title class="headline">入力エラー</v-card-title>

                    <v-card-text>
                      入力内容に間違いがあるかも
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
          </v-form>
        </v-card>
      <!--
        <div>
          <p>
            {{game.id}}<br>
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
import { myMixin } from "../components/utility";
export default {
  mixins: [myMixin],
  created () {
    this.getMembers()
    //URLにgame_idが含まれている場合、ゲーム編集と判断しidから該当するゲームデータを取得
    if (!this.$route.params.game_id) return
    this.getGameByID(this.$route.params.game_id)
  },
  data () {
    return {
      dialog: false,
      headers: [
        { text: 'No', value: 'No' },
        { text: '名前', value: 'name' },
      ],
      game: {
        name:"名無しの対局",
        rate:50,
        nengu:5,
        start_score:25,
        kaeshi:30,
        uma1:20,
        uma2:10,
        tori:10,
        tobashi:10,
        members:[],
        close:false,
      },
      members:[],
      member: {},
      member_name : null,
      member_No : null,
      detail: false,
      member_i: 1,
    }
  },
  computed:{
    //入力値のバリデーション
    formValidation:function(){
      //バリデーション用の配列定義
      var validation_list = []
      //最低必要面子を満たしているか判定しバリデーション用配列に結果格納
      if (this.game.members.length >= 3){
        validation_list.push(true)
      }else{
        validation_list.push(false)
      }
      //バリデーション用配列が全てtureならture、一つでもfalseならfalseをリターンする
      // eslint-disable-next-line no-unused-vars
      var result = validation_list.every(function(val, index, array){ return (val)})
      return result;
    },
  },
  methods: {
    //ゲーム更新の場合、ゲームIDから該当ゲームデータを取得
    getGameByID(id){
      //リファレンスからデータの取得
      const gameRef = firebase.firestore().collection('games').doc(id);
      //リファレンスからデータの取得
      gameRef.get().then((doc)=>{
        //取得したゲームデータから面子人数を確認しカウント用変数に格納
        this.member_i = doc.data().members.length+1
        //データ格納
        this.game = doc.data()
        this.game.id = doc.id
      })
      //データ取得に失敗した場合、ページをリロード（URL内のIDは削除）
      if(!this.game){
        this.$router.push({ name: 'Game_form' })
      }
      return
    },
    //面子追加処理
    addmembers(){
      if(this.member_No!=null){
        this.member.i = this.member_i
        this.member.No = this.member_No
        this.members.forEach(function(member){
          if(member.No == this.member.No){
            this.member.name = member.name
          }
        }.bind(this))
        this.game.members.push(this.member)
        this.member_No = null
        this.member = {}
        this.member_i++
      }
    },
    //面子削除処理
    deletemembers(){
      this.game.members.splice(-1, 1)
      this.member_i--
    },
    //ゲームデータの保存処理
    submit () {
      //URLにgame_idが含まれている場合、ゲーム編集と判断しアップデート処理を実施
      if (this.$route.params.game_id) {
        //idをもとに更新保存
        firebase.firestore().collection(`games`).doc(this.$route.params.game_id).update(this.game)
        //更新の場合は更新後に対局編集画面に遷移
        this.$router.push({ name: 'Game_edit'})
      //URLにgame_idが含まれていない場合、新規ゲーム登録と判断しデータ保存処理を実施
      } else {
        //保存日時の取得
        this.game.date = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
        //新規保存
        firebase.firestore().collection(`games`).add(this.game)
        //ゲームデータの初期化
        this.game = {}
        this.game.name = "名無しの対局"
        this.game.rate = 50
        this.game.nengu = 5
        this.game.start_score = 25
        this.game.kaeshi = 30
        this.game.uma1 = 20
        this.game.uma2 = 10
        this.game.tori = 10,
        this.game.tobashi = 10,
        this.game.members = []
        this.member_i = 1
      }
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
  }
}
</script>

<style scoped lang="scss">
//リンクの下部線非表示
a {
  text-decoration: none;
}
//面子表示の「・」非表示
ul {
  list-style: none;
}
</style>