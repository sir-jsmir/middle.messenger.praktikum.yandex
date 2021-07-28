import {render} from 'pug';
import Block from '../../utils/block';
import IconLink from '../iconLink';
import template from './appBar.tmpl';
import settingsIcon from '../../../static/svg/settings_24dp.svg';
import logoutIcon from '../../../static/svg/logout_24dp.svg';
import AuthAPI from '../../api/authApi';
import router from '../../index';

export default class AppBar extends Block {
    constructor() {
        const profileIcon = new IconLink({
            className: 'profile',
            srcIcon: settingsIcon,
            link: '/profile',
        });

        const logout = new IconLink({
            className: 'logout',
            srcIcon: logoutIcon,
            events: {
                click: {
                    tagEvent: 'logout',
                    callback: () => {

                        router.go('/');
                        new AuthAPI().logout();
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
