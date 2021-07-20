import {render} from 'pug';
import Block from '../../utils/block';
import IconLink from '../iconLink';
import template from './appChat.tmpl';
import foo from '../../../static/svg/*.svg';
import ChatsAPI from '../../api/chatsApi';
import UserApi from '../../api/userApi';

export default class AppChat extends Block {
    constructor(props) {
        const {person_add_24dp, delete_outline_24dp, person_remove_24dp} = foo;

        const addUser = new IconLink({
            className: 'app-chat__add-user',
            srcIcon: person_add_24dp,
            events: {
                click: {
                    tagEvent: 'app-chat__add-user',
                    callback: () => {
                        console.log('add Person');
                        this.setProps({
                            open: !this.props.open,
                        });
                    },
                },
            },
        });
        const deleteUser = new IconLink({
            className: 'app-chat__delete-user',
            srcIcon: person_remove_24dp,
            events: {
                click: {
                    tagEvent: 'app-chat__delete-user',
                    callback: () => {
                        console.log('delete Person');
                        this.setProps({
                            openDelete: !this.props.openDelete,
                        });
                    },
                },
            },
        });
        const deleteChat = new IconLink({
            className: 'app-chat__delete-chat',
            srcIcon: delete_outline_24dp,
            events: {
                click: {
                    tagEvent: 'app-chat__delete-chat',
                    callback: () => {
                        const id = this.props.id();
                        new ChatsAPI().deleteChat(id)
                            .then((data) => {
                                this.props.fetchChatsList()
                            });
                    },
                },
            },
        });
        const events = {
            input: {
                tagEvent: 'input',
                callback: (e) => {
                    this.value = e.target.value;
                }
            },
            click: {
                tagEvent: 'img',
                callback: () => {
                    if (this.value.length > 0) {
                        new UserApi().searchUser(this.value)
                            .then((data) => {
                                const result = JSON.parse(data.response);
                                const id = this.props.id();
                                if (this.props.openDelete) {
                                    new ChatsAPI().deleteUsersChat(result[0].id, id)
                                        .then(data => {
                                            const result = JSON.parse(data.response);
                                        });
                                } else {
                                    new ChatsAPI().addUsersChat(result[0].id, id)
                                        .then(data => {
                                            const result = JSON.parse(data.response);
                                        });
                                }

                            });
                    };
                },
            },
        };
        super({
            className: 'app-chat',
            open: false,
            openDelete: false,
            children: {addUser, deleteChat, deleteUser},
            value: '',
            events,
            ...props,
        });
    }
    render(): string {
        const {open, openDelete} = this.props;
        return render(template, {open, openDelete});
    }
}
