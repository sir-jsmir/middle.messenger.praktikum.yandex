import Block from '../../utils/block';
import {render} from 'pug';
import {PropsPage} from '../../constants/types';
import Button from '../../components/button';
import TitleAuth from '../../components/title-auth';
import Input from '../../components/input';
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


export default class PageSignUp extends Block {
    constructor(props: PropsPage) {
        const _template = template;
        document.title = PAGE_SIGN_UP;

        const _titleAuth = new TitleAuth({
            title1: 'Регистрация',
            title2: 'вход',
            link: '/',
        }),

        const _form = new Form({
            page: PAGE_SIGN_UP,
            template: formTmpl,
            children: {
                inputEmail: new Input({
                    type: 'email',
                    name: 'email',
                    value: '',
                    label: 'Почта',
                    placeholder: 'Введите почту',
                }),

                inputLogin: new Input({
                    type: 'text',
                    name: 'login',
                    value: '',
                    label: 'Логин',
                    placeholder: 'Введите логин',
                }),

                inputFirstName: new Input({
                    type: 'text',
                    name: 'firstName',
                    value: '',
                    label: 'Имя',
                    placeholder: 'Введите имя',
                }),

                inputLastName: new Input({
                    type: 'text',
                    name: 'secondName',
                    value: '',
                    label: 'Фамилия',
                    placeholder: 'Введите фамилию',
                }),

                inputPhone: new Input({
                    type: 'tel',
                    name: 'phone',
                    value: '',
                    label: 'Телефон',
                    placeholder: 'Введите телефон',
                }),

                inputPassword: new Input({
                    type: 'password',
                    name: 'password',
                    value: '',
                    label: 'Пароль',
                    placeholder: 'Введите пароль',
                }),

                inputPasswordRepeat: new Input({
                    type: 'password',
                    name: 'passwordRepeat',
                    value: '',
                    label: 'Повторите пароль',
                    placeholder: 'Введите пароль',
                }),

                button: new Button({
                    title: 'Зарегистрироваться',
                    type: 'submit',
                }),
            },
        });

        super({
            template: _template,
            children: {
                titleAuth: _titleAuth,
                form: _form,
            },
        });
    }

    render(): string {
        const {template} = this.props;
        return render(template);
    }
}
