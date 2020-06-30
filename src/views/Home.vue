<template>
  <div class="about">
    <h1>なんとなく作ったホーム画面</h1>
    <h1>{{ games }}</h1>
  </div>
</template>



<script>
import { mapActions } from 'vuex';
export default {
  created () {
    //this.fetchGames()
    this.games = this.$store.state.games
    },
  data () {
    return {
      games: []
    }
  },
  methods:{
    ...mapActions(['fetchGames'])
  }
}
</script>