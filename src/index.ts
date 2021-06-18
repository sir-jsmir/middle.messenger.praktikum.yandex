//import './style.scss';
//import {getFormData} from './utils/verificationSubmitValues';

//window.onload = () => {
//    const form = document.querySelector('.form');
//    const error = document.querySelector('.error');
//    form?.addEventListener('submit', (e) => {
//        e.preventDefault();
//        const result = getFormData(form);
//        console.log(result);
//        debugger
//        const {password, password2} = result;
//        if (password === password2) {
//            window.location.href = '../home/index.html';
//        } else {
//            document.querySelector('.error').textContent = 'пароли не верны';
//            console.log('пароли не верны');
//        }
//    })
//};