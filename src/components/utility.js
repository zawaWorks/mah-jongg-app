import firebase from 'firebase'
import 'firebase/firestore';

export const myMixin = {
    methods: {
        async getGames(){
          var mixin_games = []
          var mixin_game = {}
          await firebase.firestore()
          .collection("games").orderBy("date", "desc")
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
              mixin_game = doc.data();
              mixin_game.id = doc.id;
              mixin_games.push(mixin_game);
              });
              this.games = Object.values(mixin_games)
            }.bind(this))
          return JSON.stringify(mixin_games)
        },
        getGameByID:function(id){
          console.log(id)
          const gameRef = firebase.firestore().collection('games').doc(id);
          //async () => { await 
            gameRef.get().then((doc)=>{
              console.log(doc.data())
              this.target_game = doc.data()
              this.target_game.id = id
            })
          //}
          return
        },
        async getScores(){
          var mixin_scores = []
          var mixin_score = {}
          await firebase.firestore()
          .collection("scores").orderBy("date", "desc")
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              mixin_score = doc.data();
              mixin_score.id = doc.id;
              mixin_scores.push(mixin_score);
            });
            this.scores = Object.values(mixin_scores)
          }.bind(this))
          return JSON.stringify(mixin_scores)
        },
        async getMembers(){
          var mixin_members = []
          var mixin_member = {}
          await firebase.firestore()
          .collection("users").orderBy("No")
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              mixin_member = doc.data();
              mixin_member.id = doc.id;
              mixin_members.push(mixin_member);
            });
          })
          this.members = Object.values(mixin_members) //※追加
          return JSON.stringify(mixin_members)
        },
    }
};