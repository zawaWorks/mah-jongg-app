<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'User_view' }">面子管理</router-link> |
      <router-link :to="{ name: 'Personal_Result' }">個人成績</router-link>
    </div>
    <v-layout row wrap justify-center>
      <v-flex xs12 mt-5 justify-center>
        <v-card>
          <v-form>
            <v-card-text>
               <v-text-field v-model="member.name" label="面子を追加" required></v-text-field>
            </v-card-text>
            <v-card-text>
              <div class="text-center">
                <v-btn color="info" class="ml-2" @click="submit">確定</v-btn>
                <v-btn v-if="member.id" @click="cancel">キャンセル</v-btn>
              </div>
            </v-card-text>
            <v-data-table :headers='headers' :items='members' :items-per-page='10000'>
              <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="userupdate(item.id)">mdi-pencil</v-icon>
                <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-form>
        </v-card>
      <!--
        <div>
          <p>
            {{member.name}}<br>
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
  created(){
    //面子データの取得
    //this.members = this.getMembers()
    this.getMembers()
  },
  data () {
    return {
      dialog: false,
      members:[],
      member:{
        id:null,
        name:null,
        No:null,
      },
      headers: [
        { text: 'No', value: 'No' },
        { text: '名前', value: 'name' },
        { text: '操作', value: 'action', sortable: false }
      ],
    }
  },
  computed:{
  },
  watch:{
  },
  methods: {
    //面子データの保存処理
    submit () {
      //member.idが!nullな場合、面子編集と判断しアップデート処理を実施
      if (this.member.id) {
        //idをもとに更新保存
        firebase.firestore().collection(`users`).doc(this.member.id).update(this.member)
      //member.idがnullな場合、新規面子登録と判断しデータ保存処理を実施
      } else {
        //保存日時の取得
        this.member.date = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
        //面子Noの採番
        if(this.members.length == 0){
          this.member.No = 1
        }else{
          this.member.No = this.members.slice(-1)[0].No + 1
        }
        //新規保存
        firebase.firestore().collection(`users`).add(this.member)
        
      }
      //面子データの初期化
      this.member = {}
      this.member.name = null
      this.member.id = null
      //保存後に面子データを再取得
      this.members.splice(0)
      this.getMembers()
    },
    //idをキーとして面子データ更新
    userupdate(id) {
      //idから編集対象の面子データを特定
      this.members.forEach((function(member){
        if(id == member.id){
          this.member.id = id
          this.member.name = member.name
          this.member.No = member.No
        }
      }.bind(this)))
      //画面トップまで自動スクロール
      this.scrollTop()
    },
    //idをキーとした面子データ削除
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        //データ削除
        firebase.firestore().collection(`users`).doc(id).delete()
        //画面トップまで自動スクロール
        this.scrollTop()
        //削除後に面子データを再取得
        this.getMembers()
      }
    },
    //面子データの更新をキャンセル
    cancel() {
      //面子データの初期化
      this.member = {}
      this.member.name = null
      this.member.id = null
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
</style>

