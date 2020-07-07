<template>
  <v-navigation-drawer v-model="$store.state.drawer" temporary fixed>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img v-if="photoURL" :src="photoURL">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters} from 'vuex'
import { mapActions } from 'vuex';
export default {
  data () {
    return {
      items: [
        { title: 'ホーム', icon: 'mdi-home', link: { name: 'Home' } },
        { title: '対局作成', icon: 'mdi-account-multiple', link: { name: 'Game_edit' } },
        { title: '点数入力', icon: 'mdi-clipboard-outline', link: { name: 'Score_input' } },
        { title: 'ランキング', icon: 'mdi-chess-queen', link: { name: 'Ranking_view' } }
      ]
    }
  },
  computed: {
    ...mapGetters(['userName', 'photoURL'])
  },
  methods:{
    ...mapActions(['logout'])
  }
}
</script>