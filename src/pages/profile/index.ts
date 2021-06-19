import Button from '../../components/button';
import Input from '../../components/input';
import PageProfile from './profile';
import Link from '../../components/link';
import TextLink from '../../components/text-link/textLink';
import template from './profile.tmpl';
import Profile from '../../components/profile';
import Form from '../../components/form';
import images from '../../../static/img/*.jpg';
import {PAGE_PROFILE_SETTING} from '../../constants/namePages';

const formTmpl = `
.form
    #inputEmail
    #inputLogin
    #inputFirstName
    #inputLastName
    #inputFirstNameChat
    #inputPhone
    #textLink
    .group-elements
        #link
        #button
`;

new PageProfile({
    title: PAGE_PROFILE_SETTING,
    template: template,
    children: {
        profile: new Profile({
            name: 'John Les',
            srcImg: images.avatar_1,
        }).getContent(),
        form: new Form({
            template: formTmpl,
            children: {
                inputEmail: new Input({
                    type: 'email',
                    name: 'email',
                    value: 'asd@mail.ru',
                    label: 'Почта',
                    placeholder: 'Введите почту',
                }).getContent(),

                inputLogin: new Input({
                    type: 'text',
                    name: 'login',
                    value: 'John',
                    label: 'Логин',
                    placeholder: 'Введите логин',
                }).getContent(),

                inputFirstName: new Input({
                    type: 'text',
                    name: 'firstName',
                    value: 'John',
                    label: 'Имя',
                    placeholder: 'Введите имя',
                }).getContent(),

                inputLastName: new Input({
                    type: 'text',
                    name: 'lastName',
                    value: 'Smir',
                    label: 'Фамилия',
                    placeholder: 'Введите фамилию',
                }).getContent(),

                inputFirstNameChat: new Input({
                    type: 'text',
                    name: 'firstNameChat',
                    value: 'John',
                    label: 'Имя в чате',
                }).getContent(),

                textLink: new TextLink({
                    text: 'Пароль',
                    title: 'Сменить пароль',
                    href: '../password-change/index.html',
                }).getContent(),

                button: new Button({
                    title: 'Сохранить изменения',
                    type: 'submit',
                }).getContent(),

                link: new Link({
                    title: 'Назад',
                    href: '../home/index.html',
                }).getContent(),
            },
        }).getContent(),
    },
});
