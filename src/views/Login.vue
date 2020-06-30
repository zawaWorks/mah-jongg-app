<template>
  <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Login</h1>
      </v-flex>

      <v-flex xs12 mt-5>
        <v-btn color='info' @click="google_login">Googleアカウントでログイン</v-btn>
      </v-flex>
<!--
      //<v-flex xs12 mt-5>
      //  <v-btn color='info' @click="twitter_login">twitterアカウントでログイン</v-btn>
      //</v-flex>

      <v-flex>
        <v-card>
          <v-form>
            <v-card-text>
               <v-text-field placeholder="Username" v-model="username"></v-text-field>
               <v-text-field  placeholder="Password" v-model="password"></v-text-field>
            </v-card-text>
            <v-card-text>
               <div class="text-center">
                 <v-btn color="info" class="ml-2" @click="signin">ログイン</v-btn>
               </div>
            </v-card-text>
          </v-form>
        </v-card>
      </v-flex>
-->

    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Signin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['google_login','twitter_login'])
  }
}
</script>