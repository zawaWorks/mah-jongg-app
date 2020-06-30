import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAzjNX7jbFsbhNuYRHzkTrcjAK4g3zf-aI",
  authDomain: "mah-jangg-app.firebaseapp.com",
  databaseURL: "https://mah-jangg-app.firebaseio.com",
  projectId: "mah-jangg-app",
  storageBucket: "mah-jangg-app.appspot.com",
  messagingSenderId: "435550444819",
  appId: "1:435550444819:web:6186aae948d9f4a1148ee6",
  measurementId: "G-2TGYP36QR2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
