import Button from '../../components/button';
import Input from '../../components/input';
import PagePasswordChange from './passwordChange';
import Link from '../../components/link';
import template from './passwordChange.tmpl';
import Profile from '../../components/profile';
import Form from '../../components/form';
import images from '../../../static/img/*.jpg';
import {PAGE_PASSWORD_CHANGE} from '../../constants/namePages';

const formTempl = `
form
    #inputOldPassword
    #inputNewPassword
    #inputNewPasswordRepeat
    .group-elements
        #link
        #button
`;

new PagePasswordChange({
    title: PAGE_PASSWORD_CHANGE,
    template: template,
    children: {
        profile: new Profile({
            name: 'John Les',
            srcImg: images.avatar_1,
        }).getContent(),
        form: new Form({
            page: PAGE_PASSWORD_CHANGE,
            template: formTempl,
            children: {
                inputOldPassword: new Input({
                    type: 'password',
                    name: 'oldPassword',
                    value: '',
                    label: 'Старый пароль',
                    placeholder: 'Введите пароль',
                }).getContent(),

                inputNewPassword: new Input({
                    type: 'password',
                    name: 'password',
                    value: '',
                    label: 'Новый пароль',
                    placeholder: 'Введите пароль',
                }).getContent(),

                inputNewPasswordRepeat: new Input({
                    type: 'password',
                    name: 'passwordRepeat',
                    value: '',
                    label: 'Повторить пароль',
                    placeholder: 'Введите пароль',
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
