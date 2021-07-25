import Block from '../../utils/block';
import {render} from 'pug';
import {PropsPage} from '../../constants/types';
import router from '../../index';
import AuthApi from '../../api/authApi';
import Button from '../../components/button';
import TitleAuth from '../../components/title-auth';
import Input from '../../components/input';
import template from './signIn.tmpl';
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
export default class PageSignIn extends Block {
    constructor(props: PropsPage) {
        document.title = PAGE_SIGN_IN;
        const _template = template;
        const _titleAuth = new TitleAuth({
            title1: 'Вход',
            title2: 'регистрация',
            link: '/signup',
        });

        const _form = new Form({
            page: PAGE_SIGN_IN,
            template: formTmpl,
            children: {
                inputLogin: new Input({
                    type: 'text',
                    name: 'login',
                    value: '',
                    label: 'Логин',
                    placeholder: 'Введите логин',
                }),

                inputPassword: new Input({
                    type: 'password',
                    name: 'password',
                    value: '',
                    label: 'Пароль',
                    placeholder: 'Введите пароль',
                }),

                link: new Link({
                    title: 'Забыл пароль?',
                    link: '#',
                }),

                button: new Button({
                    title: 'Вход',
                    type: 'submit',
                }),
            },
        });

        super({
            ...props,
            template: _template,
            children: {
                titleAuth: _titleAuth,
                form: _form,
            },
        });
    }

    render(): string {
        const {template} = this.props;
        console.log(typeof template)
        new AuthApi().getUserInfo()
            .then((result) => {
                const userInfo = JSON.parse(result.response);
                if (!userInfo.reason) {
                    router.go('/chats');
                }
            }).catch((er) => {
                console.error(er);
            });
        return render(template);
    }
}
