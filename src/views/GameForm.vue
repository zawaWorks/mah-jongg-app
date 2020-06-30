<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>

      <v-flex xs12 class="text-center">
        <h1>対局設定</h1>
      </v-flex>

      <v-flex>
        <v-card>
          <v-form>
            <v-card-text>
               <v-text-field v-model="game.name" label="対局名"></v-text-field>
               <p>対局形式</p>
                <v-radio-group v-model="game.mode" row>
                 <v-radio label="四麻" value="4"></v-radio>
                 <v-radio label="三麻" value="3"></v-radio>
                </v-radio-group>
            </v-card-text>
            <div class="text-center">
              <v-btn v-if="!detail" @click="detail=!detail">詳細表示</v-btn>
              <v-btn v-else @click="detail=!detail">非表示</v-btn>
            </div>
            <v-card-text v-show="detail">
               <v-text-field v-model="game.rate" label="レート"></v-text-field>
               <v-text-field v-model="game.nengu" label="年貢"></v-text-field>
               <v-text-field v-model="game.start_score" label="原点"></v-text-field>
               <v-text-field v-model="game.kaeshi" label="原点返し"></v-text-field>
               <v-text-field v-model="game.uma" label="ウマ"></v-text-field>
               <v-text-field v-model="game.oka" label="オカ"></v-text-field>
            </v-card-text>
            <v-card-text>
              <p>面子リスト</p>
              <ul>
                <li v-for="(item, name) in game.members" :key="name">{{item.No}}.{{item.name}}</li>
              </ul>
              <v-text-field v-model="member_name" label="名前"></v-text-field>
              <v-btn @click="addmembers">面子追加</v-btn>
            </v-card-text>
            <v-card-text>
               <div class="text-center">
                 <v-btn @click="$router.push({ name: 'Home' })">キャンセル</v-btn>
                 <v-btn color="info" class="ml-2" @click="submit">対局作成</v-btn>
               </div>
            </v-card-text>
          </v-form>
        </v-card>
      </v-flex>

      <v-flex>
        <div>
          <hr>
          {{ $data.game }}
        </div>
      </v-flex>
-->
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    created () {
    this.game.name = "名無しの対局"
    this.game.mode = "4"
    this.game.rate = 0.3
    this.game.nengu = 10
    this.game.start_score = 25
    this.game.kaeshi = 30
    this.game.uma = 20
    this.game.oka = 10
    this.game.members = []
  },
  data () {
    return {
      headers: [
        { text: 'No', value: 'No' },
        { text: '名前', value: 'name' },
      ],
      game: {},
      members:[],
      member: {},
      member_name : null,
      row: null,
      detail: false,
      member_No: 1,
      game_No:1,
    }
  },
  methods: {
    addmembers(){
      this.member.No = this.member_No
      this.member.name = this.member_name
      this.game.members.push(this.member)
      this.member_name = null
      this.member = {}
      this.member_No++
    },
    submit () {
      //this.game.id = null
      this.addGame(this.game)
      this.game = {}
      this.game.name = "名無しの対局"
      this.game.mode = "4"
      this.game.rate = 0.3
      this.game.nengu = 10
      this.game.start_score = 25000
      this.game.kaeshi = 30000
      this.game.uma = 20
      this.game.oka = 10
      this.game.members = []
      this.member_No = 1
      this.game_No++
    },
      ...mapActions(['addGame'])
  }
}
</script>