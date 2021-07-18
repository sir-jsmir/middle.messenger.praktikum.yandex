import Block from '../../utils/block';
import {render} from 'pug';
import {PropsPage} from '../../constants/types';
import Button from '../../components/button';
import Input from '../../components/input';
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

export default class PagePasswordChange extends Block {
    constructor(props: PropsPage) {
        const _template = template;
        document.title = PAGE_PASSWORD_CHANGE;
        const _profile = new Profile({
            name: 'Загрузка данных',
            srcImg: images.avatar_1,
        }),
        const _form = new Form({
            page: PAGE_PASSWORD_CHANGE,
            template: formTempl,
            children: {
                inputOldPassword: new Input({
                    type: 'password',
                    name: 'oldPassword',
                    value: '',
                    label: 'Старый пароль',
                    placeholder: 'Введите пароль',
                }),

                inputNewPassword: new Input({
                    type: 'password',
                    name: 'newPassword',
                    value: '',
                    label: 'Новый пароль',
                    placeholder: 'Введите пароль',
                }),

                inputNewPasswordRepeat: new Input({
                    type: 'password',
                    name: 'passwordRepeat',
                    value: '',
                    label: 'Повторить пароль',
                    placeholder: 'Введите пароль',
                }),

                button: new Button({
                    title: 'Сохранить изменения',
                    type: 'submit',
                }),

                link: new Link({
                    title: 'Назад',
                    link: '/profile',
                }),
            },
        }),
        super({
            template: _template,
            children: {
                profile: _profile,
                form: _form,
            },
        });
    }

    componentDidMount() {
    }

    render(): string {
        const {template} = this.props;
        return render(template);
    }
}
