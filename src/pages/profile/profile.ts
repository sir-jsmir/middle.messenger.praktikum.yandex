import Block from '../../utils/block';
import {render} from 'pug';
import Button from '../../components/button';
import Input from '../../components/input';
import Link from '../../components/link';
import TextLink from '../../components/text-link/textLink';
import template from './profile.tmpl';
import Profile from '../../components/profile';
import Form from '../../components/form';
import images from '../../../static/img/avatar_1.jpg';
import {PAGE_PROFILE_SETTING} from '../../constants/namePages';
import AuthAPI from '../../api/authApi';
import {snakeToCamel} from '../../utils/snakeCamel';
const formTmpl = `
form
    #inputEmail
    #inputLogin
    #inputFirstName
    #inputSecondName
    #inputDisplayName
    #inputPhone
    #textLink
    .group-elements
        #link
        #button
`;

export default class PageProfile extends Block {
    _userName: string | unknown;

    constructor() {
        const _template = template;
        document.title = PAGE_PROFILE_SETTING;

        const _profile = new Profile({
            name: '',
            srcImg: images,
        });
        const _form = new Form({
            page: PAGE_PROFILE_SETTING,
            getUserInfo: () => this.getUserInfo(),
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

                inputSecondName: new Input({
                    type: 'text',
                    name: 'secondName',
                    value: '',
                    label: 'Фамилия',
                    placeholder: 'Введите фамилию',
                }),

                inputDisplayName: new Input({
                    type: 'text',
                    name: 'displayName',
                    value: '',
                    label: 'Имя в чате',
                    placeholder: 'Введите имя для чата',
                }),
                inputPhone: new Input({
                    type: 'tel',
                    name: 'phone',
                    value: '',
                    label: 'Телефон',
                    placeholder: 'Введите номер телефона',
                }),
                textLink: new TextLink({
                    text: 'Пароль',
                    title: 'Сменить пароль',
                    link: '/password-change',
                }),

                button: new Button({
                    title: 'Сохранить изменения',
                    type: 'submit',
                }),

                link: new Link({
                    title: 'Назад',
                    link: '/chats',
                }),
            },
        });

        super({
            template: _template,
            children: {
                profile: _profile,
                form: _form,
            },
        });
        this._userName = '';
    }
    componentDidMount(): void {
        this.getUserInfo();
    }

    getUserInfo() {
        new AuthAPI().getUserInfo()
            .then((data) => {
                const userInfo = JSON.parse(data.response);
                const info = snakeToCamel(userInfo);
                const {
                    avatar,
                    displayName,
                    email,
                    firstName,
                    login,
                    phone,
                    secondName,
                } = info;

                const profile = this.props.children?.profile;
                const form = this.props.children?.form;
                const {
                    inputEmail,
                    inputLogin,
                    inputFirstName,
                    inputSecondName,
                    inputDisplayName,
                    inputPhone,
                } = form?.props.children;
                this._userName = login;

                profile?.setProps({
                    name: login,
                    srcImg: avatar || images,
                });
                inputEmail.setProps({
                    value: email,
                });
                inputLogin.setProps({
                    value: login,
                });
                inputFirstName.setProps({
                    value: firstName,
                });
                inputSecondName.setProps({
                    value: secondName,
                });
                inputDisplayName.setProps({
                    value: displayName,
                });
                inputPhone.setProps({
                    value: phone,
                });
            });
    }

    render(): string {
        return render(template);
    }
}
