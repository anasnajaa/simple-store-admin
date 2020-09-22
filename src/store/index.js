import Vue from 'vue';
import Vuex from 'vuex';
import { forms } from './forms.module';
import { auth } from './auth.module';
import { settings } from './settings.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    forms,
    auth,
    settings
  }
});
