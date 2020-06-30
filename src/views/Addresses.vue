<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>点数履歴</h1>
      </v-flex>

      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='addresses'>
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'Address_edit', params: { address_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created(){
    this.addresses = this.$store.state.addresses
  },
  data () {
    return {
      headers: [
        { text: '対局名', value: 'game_name' },
        { text: '対局No', value: 'game_no' },
        { text: '面子', value: 'email' },
        { text: '点数', value: 'address' },
        { text: '操作', value: 'action', sortable: false }
      ],
      addresses: []
    }
  },
    methods: {
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteAddress({ id })
      }
    },
    ...mapActions(['deleteAddress'])
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>