import {i18n} from '../util/lang'

const required = (value) => {
    return !!value || i18n.tc('required');
};

const email = (value)=>{
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || i18n.tc('invalid_email');
};

export {
    required,
    email
}