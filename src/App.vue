<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <!--<v-app-bar-nav-icon v-show="$store.state.login_user" @click.stop="toggleSideMenu"></v-app-bar-nav-icon>-->
      <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>Numeri専用 麻雀点数管理（仮）</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-icon @click="logout">mdi-logout</v-icon> 
      </v-toolbar-items>
    </v-app-bar>
    <SideNav/>
    
    <v-content>
      <v-container fluid fill-height align-start>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
//import firebase from 'firebase'
import { mapActions } from 'vuex';
import SideNav from './components/SideNav'

export default {
  name: 'App',
  components: {
    SideNav
  },
  created(){
    this.$router.push({ name: 'Home'})
    this.fetchGames()
  //  firebase.auth().onAuthStateChanged(user => {
  //    if(user){
  //      this.setLoginUser(user)
  //      this.fetchAddresses()
  //      if (this.$router.currentRoute.name === 'Login') this.$router.push({ name: 'Home'})
  //    } else {
  //      this.deleteLoginUser()
  //      this.$router.push({ name: 'Login'})
  //    }
  //  })
  },
  data: () => ({
    //
  }),
  methods:{
    ...mapActions(['toggleSideMenu', 'setLoginUser', 'logout', 'deleteLoginUser', 'fetchGames'])
  }
};
</script>


<style lang="scss">
#nav {
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
