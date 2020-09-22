import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import UUID from 'vue-uuid';
// eslint-disable-next-line no-unused-vars
import styles from '../styles/main.scss';
import VueI18n from 'vue-i18n';
import stringsEn from '../util/strings_en.json';
import stringsAr from '../util/strings_ar.json';

Vue.config.productionTip = false;

Vue.use(UUID);
Vue.use(VueI18n);
Vue.use(require('vue-moment'));

const i18n = new VueI18n({
  locale: 'en', 
  messages: {
    en: stringsEn,
    ar: stringsAr
  }, 
});


new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: h => h(App),
  mounted(){
    this.$store.dispatch("auth/setAuthDetails");
    this.$store.dispatch("settings/initSettings", this);
  }
}).$mount('#app');
