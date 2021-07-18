import {
    PAGE_HOME,
    PAGE_PASSWORD_CHANGE,
    PAGE_PROFILE_SETTING,
    PAGE_SIGN_UP,
    PAGE_SIGN_IN
} from '../constants/namePages';
import {ERROR_PASSWORD_CHANGE} from '../constants/errorsInput';
import {validation} from './validation';

export const getFormData = (form, page) => {
    let result = {};
    if (!form) result;
    const elem = form.elements;
    for (let i = 0; i < elem.length; i++) {
        switch (elem[i].type) {
            case 'submit':
                break;
            case 'radio':
                break;
            case 'checkbox':
                break;
            default:
                result[elem[i].name] = elem[i].value;
        }
    };
    return result;
};

export const verificationSubmitValues = (form, page) => {
    const values: Record<string, string> = getFormData(form, page);
    let resultValid = validValuesInput(values);
    switch (page) {
        case PAGE_HOME:
            break;
        case PAGE_PASSWORD_CHANGE:
            const error = checkEqualityPasswords(values.password, values.passwordRepeat);
            //return {...values, passwordRepeat: {value: '', messageError: error}}
            return {...values}
            break;
        case PAGE_PROFILE_SETTING:
            return {...values}
            break;
        case PAGE_SIGN_UP:
            const error = checkEqualityPasswords(values.password, values.passwordRepeat);
            //return {...resultValid, passwordRepeat: {value: '', messageError: error}}
            return {...values}
            break;
        case PAGE_SIGN_IN:
            //return {...resultValid, passwordRepeat: {value: '', messageError: error}}
            return {...values}
            break;
        default:
    }
}
export const checkEqualityPasswords = (password, passwordRepeat) => {
    if (password && passwordRepeat) {
        return password !== passwordRepeat ? ERROR_PASSWORD_CHANGE : '';
    }
}

const validValuesInput = (values) {
    let result = {};
    Object.keys(values).forEach(key => {
        result[key] = validation(values[key], key)
    })
    return result;
}
