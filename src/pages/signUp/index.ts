import Button from '../../components/button';
import TitleAuth from '../../components/title-auth';
import Input from '../../components/input';
import PageSignUp from './signUp';
import template from './signUp.tmpl';
import Form from '../../components/form';
import {PAGE_SIGN_UP} from '../../constants/namePages';

const formTmpl = `
form
    #inputEmail
    #inputLogin
    #inputFirstName
    #inputLastName
    #inputPhone
    #inputPassword
    #inputPasswordRepeat
    .group-elements
        #button
    .error
`;

new PageSignUp({
    title: PAGE_SIGN_UP,
    template: template,
    children: {
        titleAuth: new TitleAuth({
            title1: 'Регистрация',
            title2: 'вход',
            link: 'signin',
        }).getContent(),

        form: new Form({
            template: formTmpl,
            children: {
                inputEmail: new Input({
                    type: 'email',
                    name: 'email',
                    value: '',
                    label: 'Почта',
                    placeholder: 'Введите почту',
                }).getContent(),

                inputLogin: new Input({
                    type: 'text',
                    name: 'login',
                    value: '',
                    label: 'Логин',
                    placeholder: 'Введите логин',
                }).getContent(),

                inputFirstName: new Input({
                    type: 'text',
                    name: 'firstName',
                    value: '',
                    label: 'Имя',
                    placeholder: 'Введите имя',
                }).getContent(),

                inputLastName: new Input({
                    type: 'text',
                    name: 'lastName',
                    value: '',
                    label: 'Фамилия',
                    placeholder: 'Введите фамилию',
                }).getContent(),

                inputPhone: new Input({
                    type: 'tel',
                    name: 'phone',
                    value: '',
                    label: 'Телефон',
                    placeholder: 'Введите телефон',
                }).getContent(),

                inputPassword: new Input({
                    type: 'password',
                    name: 'password',
                    value: '',
                    label: 'Пароль',
                    placeholder: 'Введите пароль',
                }).getContent(),

                inputPasswordRepeat: new Input({
                    type: 'password',
                    name: 'passwordRepeat',
                    value: '',
                    label: 'Повторите пароль',
                    placeholder: 'Введите пароль',
                }).getContent(),

                button: new Button({
                    title: 'Зарегистрироваться',
                    type: 'submit',
                }).getContent(),
            },
        }).getContent(),
    },
});
