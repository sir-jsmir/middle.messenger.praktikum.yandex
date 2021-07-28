import {
    PAGE_HOME,
    PAGE_PASSWORD_CHANGE,
    PAGE_PROFILE_SETTING,
    PAGE_SIGN_UP,
    PAGE_SIGN_IN,
} from '../constants/namePages';
import {ERROR_PASSWORD_CHANGE} from '../constants/errorsInput';
//import {validation} from './validation';

export const getFormData = (form: HTMLFormElement | any) => {
    const result: Record<string, string> = {};
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
    }
    return result;
};

export const verificationSubmitValues = (form: HTMLFormElement, page: string) => {
    const values: Record<string, string> = getFormData(form);
    // let resultValid = validValuesInput(values);
    switch (page) {
        case PAGE_HOME:
            break;
        case PAGE_PASSWORD_CHANGE:
            // const error = checkEqualityPasswords(values.password, values.passwordRepeat);
            return {...values};
            break;
        case PAGE_PROFILE_SETTING:
            return {...values};
            break;
        case PAGE_SIGN_UP:
            // const error = checkEqualityPasswords(values.password, values.passwordRepeat);
            return {...values};
            break;
        case PAGE_SIGN_IN:
            return {...values};
            break;
        default:
    }
}
export const checkEqualityPasswords = (password: string, passwordRepeat: string) => {
    if (password && passwordRepeat) {
        return password !== passwordRepeat ? ERROR_PASSWORD_CHANGE : '';
    }
};

//const validValuesInput = (values: Record<string, string>) => {
//    const result: Record<string, string | unknown> = {};
//    Object.keys(values).forEach((key: string) => {
//        result[key] = validation(values[key], key);
//    });
//    return result;
//};
