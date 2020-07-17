<template>
  <v-container text-xs-center justify-center>
    <div id="nav">
      <router-link :to="{ name: 'Game_form' }">対局設定</router-link> |
      <router-link :to="{ name: 'Game_edit' }">対局編集</router-link>
    </div>
    <v-layout row wrap justify-center>

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
                <li v-for="(item, name) in game.members" :key="name">{{item.No}}.{{item.name}}</li>
              </ul>
              <v-text-field v-model="member_name" label="名前">
                <template v-slot:append>
                  <v-btn color="info" @click="addmembers">追加</v-btn>
                  <v-btn @click="deletemembers">取消</v-btn>
                </template>
              </v-text-field>
            </v-card-text>
            <v-card-text>
               <div class="text-center">
                <v-btn @click="$router.push({ name: 'Home' })">キャンセル</v-btn>
                <v-btn v-if="!update" color="info" class="ml-2" @click="submit">対局作成</v-btn>
                <v-btn v-else color="info" class="ml-2" @click="submit">対局更新</v-btn>
               </div>
            </v-card-text>
          </v-form>
        </v-card>
      <!--
        <div>
          <p>
            {{game}}<br>
            {{member_No}}<br>
            {{test}}

          </p>
        </div>
      -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    created () {
    //this.fetchGames()
    if (!this.$route.params.game_id) return
    const game = this.$store.getters.getGameById(this.$route.params.game_id)
    this.member_No = game.members.slice(-1)[0].No+1
    this.update = true
    if (game) {
      this.game = game
    } else {
      this.$router.push({ name: 'Game_form' })
    }
  },
  data () {
    return {
      headers: [
        { text: 'No', value: 'No' },
        { text: '名前', value: 'name' },
      ],
      game: {
        name:"名無しの対局",
        mode:"4",
        rate:50,
        nengu:5,
        start_score:25,
        kaeshi:30,
        uma1:20,
        uma2:10,
        tori:10,
        tobashi:10,
        members:[],
      },
      member: {},
      member_name : null,
      detail: false,
      update:false,
      member_No: 1,
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
    deletemembers(){
      this.game.members.splice(-1, 1)
      this.member_No--
    },
    submit () {
      if (this.$route.params.game_id) {
        this.updateGame({ id: this.$route.params.game_id, game: this.game })
        this.$router.push({ name: 'Game_edit'})
      } else {
      this.game.date = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
      this.addGame(this.game)
      this.game = {}
      this.game.name = "名無しの対局"
      this.game.mode = "4"
      this.game.rate = 0.3
      this.game.nengu = 10
      this.game.start_score = 25
      this.game.kaeshi = 30
      this.game.uma1 = 20
      this.game.uma2 = 10
      this.game.members = []
      this.member_No = 1
      }
      this.scrollTop()
    },
    scrollTop: function(){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
      ...mapActions(['addGame','fetchGames','updateGame'])
  }
}
</script>