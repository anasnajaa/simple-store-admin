const saveSetting = (key, value)=>{
    try {
        if(localStorage.settings){
            let settings = JSON.parse(localStorage.settings);
            settings[key] = value;
            localStorage.settings = JSON.stringify(settings);
        } else {
            localStorage.settings = JSON.stringify({[key]: value})
        }
        return true;
    } catch (error) {
        return false;
    }
};

export const settings = {
    namespaced: true,
    state: {
        sideNavVisible: null,
        lang: null
    },
    getters: {
        getSideNavVisible: (state)=> { return state.sideNavVisible },
        getLang: (state)=> { return state.lang }    
    },
    actions: {
        initSettings: ({dispatch}, app) =>{
            const defaultSettings = {
                sideNavVisible: true,
                lang: "en"
            };

            let userSettings = {};

            if(localStorage.settings){
                userSettings = JSON.parse(localStorage.settings);
            }

            const allSettings = {...defaultSettings, ...userSettings};
            dispatch("setSideNavVisible", allSettings.sideNavVisible);
            dispatch("setLang", {app, lang: allSettings.lang});
        },
        setSideNavVisible: (context, sideNavVisible) => {
            if(saveSetting("sideNavVisible", sideNavVisible)){
                context.commit('SET_SIDE_NAV_VISIBLE', sideNavVisible);
            }
        },
        setLang: (context, {app, lang}) =>{
            if(saveSetting("lang", lang)){
                context.commit('SET_LANG', lang);
                app.$vuetify.rtl = lang === "ar";
                app.$vuetify.lang.current = lang;
                app.$i18n.locale = lang;
            }
        }
    },
    mutations: {
        SET_SIDE_NAV_VISIBLE: (state, sideNavVisible) => { 
            state.sideNavVisible = sideNavVisible;
        },
        SET_LANG: (state, lang)=>{
            state.lang = lang;
        }
    }
}