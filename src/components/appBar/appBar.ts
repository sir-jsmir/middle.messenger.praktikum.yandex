import {render} from 'pug';
import Block from '../../utils/block';
import IconLink from '../iconLink';
import template from './appBar.tmpl';
import foo from '../../../static/svg/*.svg';
import AuthAPI from '../../api/authApi';
import router from '../../index';

export default class AppBar extends Block {
    constructor() {
        const {settings_24dp, logout_24dp} = foo;

        const profileIcon = new IconLink({
            className: 'profile',
            srcIcon: settings_24dp,
            link: '/profile',
        });

        const logout = new IconLink({
            className: 'logout',
            srcIcon: logout_24dp,
            events: {
                click: {
                    tagEvent: 'logout',
                    callback: () => {
                        new AuthAPI().logout();
                        router.go('/')
                    },
                },
            },
        });

        super({children: {profileIcon, logout}});
    }
    render(): string {
        return render(template);
    }
}