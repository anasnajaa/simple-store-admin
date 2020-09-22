import httpClient from './httpClient';

const END_POINT = '/account/';


const getProfile = () => httpClient.get(END_POINT + `profile`);

const logout = () => httpClient.post(END_POINT + `logout`);

const login = (username, password) => httpClient.post(END_POINT + "login", { username, password });

const register = (
    email, password, 
    firstName, lastName, 
    roleId) => httpClient.post(END_POINT + "login", { email, password, firstName, lastName, roleId });

export {
    login,
    getProfile,
    register,
    logout
}