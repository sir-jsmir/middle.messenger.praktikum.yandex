import Button from '../../components/button';
import TitleAuth from '../../components/title-auth';
import Input from '../../components/input';
import template from './signIn.tmpl';
import PageSignIn from './signIn';
import Link from '../../components/link';
import Form from '../../components/form';
import {PAGE_SIGN_IN} from '../../constants/namePages';

const formTmpl = `
form
    #inputLogin
    #inputPassword
    .group-elements
        #link
        #button
`;

new PageSignIn({
    title: PAGE_SIGN_IN,
    template: template,
    children: {
        titleAuth: new TitleAuth({
            title1: 'Вход',
            title2: 'регистрация',
            link: 'signup',
        }).getContent(),

        form: new Form({
            template: formTmpl,
            children: {
                inputLogin: new Input({
                    type: 'text',
                    name: 'login',
                    value: '',
                    label: 'Логин',
                    placeholder: 'Введите логин',
                }).getContent(),

                inputPassword: new Input({
                    type: 'password',
                    name: 'password',
                    value: '',
                    label: 'Пароль',
                    placeholder: 'Введите пароль',
                }).getContent(),

                link: new Link({
                    title: 'Забыл пароль?',
                    href: '#',
                }).getContent(),

                button: new Button({
                    title: 'Вход',
                    type: 'submit',
                }).getContent(),
            }
        }).getContent();
    },
});
