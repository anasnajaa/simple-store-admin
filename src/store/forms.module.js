import {i18n} from '../../util/lang'

export const forms = {
    namespaced: true,
    state: {
        forms: [{
                id: 1,
                name: 'profile',
                title: i18n.tc("profile"),
                icon: "account-multiple",
                path: "/profile",
                url: "/profile",
                visible: true,
                requiresAnon: false,
                protected: true,
                component: () => import('../views/Profile.vue')
            },
            {
                id: 2,
                name: 'home',
                title: i18n.tc("home"),
                icon: "home",
                path: "/",
                url: "/",
                visible: true,
                requiresAnon: false,
                protected: false,
                component: () => import('../views/Home.vue')
            },
            {
                id: 3,
                name: 'about',
                title: i18n.tc("about"),
                icon: "heart",
                path: "/about",
                url: "/about",
                visible: true,
                requiresAnon: false,
                protected: false,
                component: () => import('../views/About.vue')
            },
            {
                id: 4,
                name: 'login',
                title: i18n.tc("login"),
                icon: "account",
                path: "/login",
                url: "/login",
                visible: true,
                requiresAnon: true,
                protected: false,
                component: () => import('../views/Login.vue')
            },
            {
                id: 4,
                name: 'brands',
                title: i18n.tc("brands"),
                icon: "folder-text",
                path: "/brands",
                url: "/brands",
                visible: true,
                requiresAnon: false,
                protected: true,
                component: () => import('../views/Brands.vue')
            }
        ]
    },
    actions: {},
    mutations: {},
    getters: {
        allForms: state => state.forms
    }
}