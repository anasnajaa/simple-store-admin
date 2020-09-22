import Vue from 'vue';
import VueI18n from 'vue-i18n';
import stringsEn from './strings_en.json';
import stringsAr from './strings_ar.json';

Vue.use(VueI18n);

const currentLang = ()=>{
    try {
        const settingsObject =  JSON.parse(localStorage.settings);
        if(settingsObject.lang){
            return settingsObject.lang;
        }
        return "en";
    } catch (error) {
        return "en";
    }
};

const i18n = new VueI18n({
    locale:  currentLang(), 
    messages: {
      en: stringsEn,
      ar: stringsAr
    }
});

export {i18n};