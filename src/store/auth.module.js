export const auth = {
    namespaced: true,
    state: {
        signedIn: false,
        roles: [],
        firstName: null,
        lastName: null,
        email: null
    },
    getters: {
        getSignedIn: (state) => { return state.signedIn; },
        getRoles: (state) => { return JSON.parse(state.roles); },
        getFirstName: (state) => { return state.firstName },
        getLastName: (state) => { return state.lastName },
        getEmail: (state) => { return state.email }
    },
    actions: {
        setSignedIn: context => { context.commit('setSignedIn'); },
        setRoles: context => { context.commit('setRoles'); },
        setFirstName: context => { context.commit('setFirstName'); },
        setLastName: context => { context.commit('setLastName'); },
        setEmail: context => { context.commit('setEmail'); },
        setAuthDetails: context => { 
            context.commit('setSignedIn');
            context.commit('setRoles');
            context.commit('setFirstName');
            context.commit('setLastName');
            context.commit('setEmail');
        },
        setLoggedOut: context => {
            localStorage.clear();
            context.commit('setSignedIn');
            context.commit('setRoles');
            context.commit('setFirstName');
            context.commit('setLastName');
            context.commit('setEmail');
        }
    },
    mutations: {
        setSignedIn: state => { state.signedIn = localStorage.getItem('signedIn') === "true"; },
        setRoles: state => { state.roles = localStorage.getItem('roles') ? 
        JSON.stringify(localStorage.getItem('roles')) : [] },
        setFirstName: state => { state.firstName = localStorage.getItem('firstName')},
        setLastName: state => { state.lastName = localStorage.getItem('lastName')},
        setEmail: state => { state.email = localStorage.getItem('email') },
    }
}