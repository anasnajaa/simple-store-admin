<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left clipped-right>
      <v-app-bar-nav-icon @click.stop="changeSideNavVisibility()" />
      <v-toolbar-title>
        <div class="d-flex align-center">
          {{ $t('app_name') }}
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="changeLang">mdi-translate</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid >
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>

    <v-navigation-drawer 
      v-model="sideNavVisible"
      app 
      clipped
      :right="lang === 'ar'"
      >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ userName }}</v-list-item-title>
            <v-list-item-subtitle>{{ signedIn ? $t('logged_in'): $t('logged_out') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="form in forms" :key="form.id" :to="{path: form.url}">
          <v-list-item-action>
            <v-icon>mdi-{{ form.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ form.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

     <template v-if="signedIn" v-slot:append>
        <div class="pa-2">
          <v-btn @click="logout" block>{{ $t('logout') }}</v-btn>
        </div>
      </template>

    </v-navigation-drawer>

    <v-overlay :value="overlay" :opacity=".9">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    
  </v-app>
</template>

<script>

import {logout} from '../api/account.api'

export default {  
  name: 'App',

  components: {
  },
  data(){
    return {
      overlay: false,
      sideNavVisible: false
    };
  },
  computed: {
    signedIn(){
      return this.$store.getters["auth/getSignedIn"];
    },
    lang(){
      return this.$store.getters["settings/getLang"];
    },
    forms(){
      let f = this.$store.getters["forms/allForms"];
      if(this.signedIn){
        f = f.filter((item) => !item.requiresAnon);
      } else {
        f = f.filter((item) => !item.protected);
      }
      return f;
    },
    userName(){
      if(this.signedIn){
        let fName = "";
        let lName = "";
        if(this.lang === "en"){
          fName = this.$store.getters["auth/getFirstName"];
          lName = this.$store.getters["auth/getLastName"];
        } else {
          fName = this.$store.getters["auth/getFirstName"];
          lName = this.$store.getters["auth/getLastName"];
        }
        return `${fName} ${lName}`;
      } else {
        return this.$t('guest');
      }
    }
  },
  methods: {
    changeLang(){
      this.overlay = true;
      this.$store.dispatch("settings/setLang", {app: this, lang: this.$vuetify.rtl ? "en" : "ar"}).then(()=>{
        window.location.reload();
      });
    },
    async logout(){
      try {
        const resp = await logout();
        console.log(resp.data);
        if(resp.status === 200 && resp.data.status === 1){
          this.$store.dispatch("auth/setLoggedOut");
          this.$router.push({ name: "home", params: {} });
        }
      } catch (error) {
        console.log(error);
      }
    },
    changeSideNavVisibility(){
      this.sideNavVisible = !this.sideNavVisible
      //this.$store.dispatch("settings/setSideNavVisible", !this.sideNavVisible);
    }
  }
};
</script>

<style>

</style>