<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Game_form' }">対局設定</router-link> |
      <router-link :to="{ name: 'Game_edit' }">対局編集</router-link>
    </div>
    <v-layout row wrap justify-center>
      <v-flex xs12 mt-5 justify-center>
        <v-divider></v-divider>
        <v-data-table :headers='headers' :items='games'>
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'Game_form', params: { game_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <!--
        <div>
          <p>
            {{this.games}}<br>
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
import { myMixin } from "../components/utility";
import firebase from 'firebase';
export default {
  mixins: [myMixin],
  created(){
    //ゲームデータの取得
    this.getGames()
    //スコアデータの取得
    this.getScores()
  },
  data () {
    return {
      games: [],
      scores: [],
      headers: [
        { text: '日時', value: 'date' },
        { text: '対局名', value: 'name' },
        { text: '操作', value: 'action', sortable: false }
      ],
    }
  },
  watch:{
  },
    methods: {
    //idをキーとしたゲームデータ削除
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？対局を削除すると関連する点数データも削除されます')) {
        //データ削除
        firebase.firestore().collection(`games`).doc(id).delete()
        //スコアデータをループし削除対象のgame_idと一致するデータを順次削除
        this.scores.forEach((function(score){
          //game_idをもとに対象判定
          if(score.game_id == id){
            //データ削除
            firebase.firestore().collection(`scores`).doc(score.id).delete()
          }
        }.bind(this)))
      }
      //ゲームデータの再取得
      this.getGames()
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