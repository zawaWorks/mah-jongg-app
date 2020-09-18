<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'User_view' }">面子管理</router-link> |
      <router-link :to="{ name: 'Personal_Result' }">個人成績</router-link>
    </div>
    <v-layout row wrap justify-center>
      <v-flex xs12 mt-5 justify-center>
        <v-divider></v-divider>
        <v-data-table
         :headers='headers'
         :loading='loading'
         loading-text="Loading... Please wait"
         :items='Personal_Result_list'
         >
          <template v-slot:item.name="{ item }">
            <v-chip :color="'blue'" dark>{{ item.name }}</v-chip>
          </template>
         </v-data-table>
      <!--  
        <div>
          <p>
            {{kari_Personal_Result_list[0].rank[0]}}<br>
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
import 'firebase/firestore';
import { myMixin } from "../components/utility";
export default {
  mixins: [myMixin],
  created(){
    this.loading = true
    //スコアデータの取得
    this.getScores()
    //面子データの取得
    this.getMembers()
    //this.Count()
    this.ScoreAnalize()
    this.loading = false
  },
  data () {
    return {
      loading:true,
      scores: [],
      members:[],
      kari_Personal_Result_list:[],
      Personal_Result_list:[],
      headers: [
        { text: '面子名', value: 'name' },
        { text: '対戦数(回)', value: 'total_count' },
        { text: '累計スコア(点)', value: 'total_score[0]' },
        { text: '累計得点(点)', value: 'total_score[1]' },
        { text: '累計失点(点)', value: 'total_score[2]' },
        { text: '累計ポイント(pt)', value: 'total_point' },
        { text: '1位回数(回)', value: 'rank[0]' },
        { text: '2位回数(回)', value: 'rank[1]' },
        { text: '3位回数(回)', value: 'rank[2]' },
        { text: '4位回数(回)', value: 'rank[3]' },
        { text: '1位率(%)', value: 'rank_rate[0]' },
        { text: '2位率(%)', value: 'rank_rate[1]' },
        { text: '3位率(%)', value: 'rank_rate[2]' },
        { text: '4位率(%)', value: 'rank_rate[3]' },
        { text: '連対率(%)', value: 'rentai' },
        { text: 'ラス回避率(%)', value: 'rasu' },
        { text: '飛ばし回数(回)', value: 'tobashi' },
        { text: '箱下回数(回)', value: 'hako' },
        { text: '焼き鳥回数(回)', value: 'tori' },
        { text: '飛ばし率(%)', value: 'tobashi' },
        { text: '箱下率(%)', value: 'hako_rate' },
        { text: '焼き鳥率(%)', value: 'tori_rate' },
        { text: '最高点数(点)', value: 'max_score' },
        { text: '最低点数(点)', value: 'min_score' },
      ],
    }
  },
  watch:{
  },
  methods: {
    async Count(){
      var mixin_members = []
      var mixin_member = {}
      //firestoreからなんか取ってくるとかの重い処理をするとこの行↓で実行が止まってくれる！
      await firebase.firestore().collection("users").orderBy("No").get()
      .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              mixin_member = doc.data();
              mixin_member.id = doc.id;
              mixin_members.push(mixin_member);
            });
          })
      this.members = Object.values(mixin_members)
      //面子データをもとに成績表示用配列を定義
      this.members.forEach((function(member){
        var Personal_Result = {}
        Personal_Result.name = member.name
        var count = 0
        var rank = [0,0,0,0]
        var tobashi = 0
        var hako = 0
        var tori = 0
        var max_score = null
        var min_score = null
        var total_score = [0,0,0]
        var total_point = 0
        this.scores.forEach((function(score){
          if(member.No == score.member1.name_no || member.No == score.member2.name_no || member.No == score.member3.name_no || member.No == score.member4.name_no){
            count++
          }
          if(member.No == score.member1.name_no){
            if(score.member1.rank == 1){ rank[0]++ }
            else if(score.member1.rank == 2){ rank[1]++ }
            else if(score.member1.rank == 3){ rank[2]++ }
            else if(score.member1.rank == 4){ rank[3]++ }
            if(score.member1.tobashi == "1"){ tobashi++ }
            if(score.member1.hako == "1"){ hako++ }
            if(score.member1.tori == "1"){ tori++ }
            if(score.member1.score > max_score){ 
              max_score = score.member1.score
            }
            if(score.member1.score < min_score){
              min_score = score.member1.score
            }
            total_score[0] = total_score[0] + score.member1.result
            if(score.member1.result > 0){ 
              total_score[1] = total_score[1] + score.member1.result
            }else if(score.member1.result < 0){
              total_score[2] = total_score[2] + score.member1.result
            }            
          }else if(member.No == score.member2.name_no){
            if(score.member2.rank == 1){ rank[0]++ }
            else if(score.member2.rank == 2){ rank[1]++ }
            else if(score.member2.rank == 3){ rank[2]++ }
            else if(score.member2.rank == 4){ rank[3]++ }
            if(score.member2.tobashi == "1"){ tobashi++ }
            if(score.member2.hako == "1"){ hako++ }
            if(score.member2.tori == "1"){ tori++ }
            if(score.member2.score > max_score){ 
              max_score = score.member2.score
            }
            if(score.member2.score < min_score){
              min_score = score.member2.score
            }
            total_score[0] = total_score[0] + score.member2.result
            if(score.member2.result > 0){ 
              total_score[1] = total_score[1] + score.member2.result
            }else if(score.member2.result < 0){
              total_score[2] = total_score[2] + score.member2.result
            }            
          }else if(member.No == score.member3.name_no){
            if(score.member3.rank == 1){ rank[0]++ }
            else if(score.member3.rank == 2){ rank[1]++ }
            else if(score.member3.rank == 3){ rank[2]++ }
            else if(score.member3.rank == 4){ rank[3]++ }
            if(score.member3.tobashi == "1"){ tobashi++ }
            if(score.member3.hako == "1"){ hako++ }
            if(score.member3.tori == "1"){ tori++ }
            if(score.member3.score > max_score){ 
              max_score = score.member3.score
            }
            if(score.member3.score < min_score){
              min_score = score.member3.score
            }
            total_score[0] = total_score[0] + score.member3.result
            if(score.member3.result > 0){ 
              total_score[1] = total_score[1] + score.member3.result
            }else if(score.member3.result < 0){
              total_score[2] = total_score[2] + score.member3.result
            }            
          }else if(member.No == score.member4.name_no){
            if(score.member4.rank == 4){ rank[0]++ }
            else if(score.member4.rank == 2){ rank[1]++ }
            else if(score.member4.rank == 3){ rank[2]++ }
            else if(score.member4.rank == 4){ rank[3]++ }
            if(score.member4.tobashi == "1"){ tobashi++ }
            if(score.member4.hako == "1"){ hako++ }
            if(score.member4.tori == "1"){ tori++ }
            if(score.member4.score > max_score){ 
              max_score = score.member4.score
            }
            if(score.member4.score < min_score){
              min_score = score.member4.score
            }
            total_score[0] = total_score[0] + score.member4.result
            if(score.member4.result > 0){ 
              total_score[1] = total_score[1] + score.member4.result
            }else if(score.member4.result < 0){
              total_score[2] = total_score[2] + score.member4.result
            }            
          }
        }.bind(this)))
        Personal_Result.count = count
        Personal_Result.rank = rank
        Personal_Result.tobashi = tobashi
        Personal_Result.hako = hako
        Personal_Result.tori = tori
        Personal_Result.max_score = max_score
        Personal_Result.min_score = min_score
        total_point = total_score[0] * 50
        Personal_Result.total_point = total_point
        Personal_Result.total_score = total_score
        this.kari_Personal_Result_list.push(Personal_Result)
      }.bind(this)))
      return 0;
    },
    async ScoreAnalize () {
      await this.Count()
      this.kari_Personal_Result_list.forEach((function(Personal_Result){
        var rank_rate = []
        var keta = 100
        //Personal_Result.top_rate = this.orgRound((Personal_Result.rank[0] / Personal_Result.count * 100),0.2)
        Personal_Result.total_count = Personal_Result.count
        Personal_Result.rentai = this.round(((Personal_Result.rank[0] + Personal_Result.rank[1]) / Personal_Result.count * 100),keta)
        Personal_Result.rasu = this.round(((Personal_Result.rank[0] + Personal_Result.rank[1] + Personal_Result.rank[2]) / Personal_Result.count * 100),keta)
        rank_rate[0] = this.round((Personal_Result.rank[0] / Personal_Result.count * 100),keta)
        rank_rate[1] = this.round((Personal_Result.rank[1] / Personal_Result.count * 100),keta)
        rank_rate[2] = this.round((Personal_Result.rank[2] / Personal_Result.count * 100),keta)
        rank_rate[3] = this.round((Personal_Result.rank[3] / Personal_Result.count * 100),keta)
        Personal_Result.rank_rate = rank_rate
        Personal_Result.tobashi_rate = this.round((Personal_Result.tobashi / Personal_Result.count * 100),keta)
        Personal_Result.hako_rate = this.round((Personal_Result.hako / Personal_Result.count * 100),keta)
        Personal_Result.tori_rate = this.round((Personal_Result.tori / Personal_Result.count * 100),keta)

        this.Personal_Result_list.push(Personal_Result)
      }.bind(this)))
      return 0;
    },
    round(value, base) {
      return Math.round(value * base) / base;
    }
  }
}
</script>

<style scoped lang="scss">
//リンクの下部線非表示
a {
  text-decoration: none;
}
</style>