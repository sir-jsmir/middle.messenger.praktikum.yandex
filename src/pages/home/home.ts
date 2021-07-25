import Block from '../../utils/block';
import {render} from 'pug';
import {PropsPage} from '../../constants/types';
import DialogCard from '../../components/dialog-card';
import HistoryMessages from '../../components/history-messages';
import FormInputIcon from '../../components/formInputIcon';
import AppBar from '../../components/appBar/appBar';
import Profile from '../../components/profile';
import AuthAPI from '../../api/authApi';
import ChatsApi from '../../api/chatsApi';
import {PAGE_HOME} from '../../constants/namePages';
import template from './home.tmpl';
import InputForm from '../../components/input-form';
import Form from '../../components/form';
import DialogCardList from '../../components/dialogCardList';
import AppChat from '../../components/appChat';
//import svgs from './static/../../../../static/svg/*.svg';
import search from '../../../static/svg/search_24dp.svg';
import addChat from '../../../static/svg/add_24dp.svg';
import images from '../../../static/img/avatar_1.jpg';
import WebSocketMessage from '../../api/webSocket';
import HistoryMessagesList from '../../components/historyMessagesList';
import {snakeToCamel} from '../../utils/snakeCamel';
import router from '../../index';

const formTmpl = `
#message
`;
export default class PageHome extends Block {
    _appBar: Block;
    _avatarProfile: Block;
    _title: string;
    _template: string;
    _cardList: Record<string, any>;
    _activeIdDialog: number;
    _userName: string;
    _userId: string;
    _userToken: string;
    socketMessage: Record<string, string | number>[];
    _usersChat: Record<string, any>;
    _props: PropsPage;
    value: string;
    messageInChat: string;
    constructor(props: PropsPage) {
        const _template = template;
        document.title = PAGE_HOME;

        const _appBar = new AppBar();
        const _avatarProfile = new Profile({
            name: '',
            srcImg: images,
        });

        const _searchForm = new FormInputIcon({
            placeholder: 'Поиск',
            name: 'search',
            srcIcon: search,
            value: '',
            events: {
                click: {
                    tagEvent: 'button',
                    callback: (e: Event) => {
                        e.preventDefault();
                    },
                },
                input: {
                    tagEvent: 'input',
                    callback: (e: Event) => {
                        e.preventDefault();
                    },
                },
            },
        });
        const _addChat = new FormInputIcon({
            placeholder: 'Введите название чата',
            name: 'addChat',
            value: '',
            srcIcon: addChat,
            events: {
                input: {
                    tagEvent: 'input',
                    callback: (e: Event) => {
                        e.preventDefault();
                        const element = e.target as HTMLInputElement;
                        this.value = element.value;
                    },
                },
                click: {
                    tagEvent: 'button',
                    callback: (e: Event) => {
                        e.preventDefault();
                        if (this.value.length > 3) {
                            new ChatsApi().createChat(this.value)
                                .then((data) => {
                                    const result = JSON.parse(data.response);
                                    console.log(result);
                                    this.value = '';
                                    this.fetchChatsList();
                                }).catch((err) => {
                                    console.error(err);
                                });
                        } else {
                            this.setProps({
                                error: true,
                            });
                        }
                    },
                },
            },
        });

        const _dialogCardList = new DialogCardList({
            fetchChatsList: () => this.fetchChatsList(),
            events: {
                click: {
                    tagEvent: 'li',
                    callback: (e: Event) => {
                        const element = e.currentTarget as HTMLElement;
                        const _idChat = element?.dataset?.index ?? '0';
                        const idChat = +_idChat;
                        this._activeIdDialog = idChat;
                        this.socketMessage = [];
                        new ChatsApi().getChatUsers(idChat)
                            .then((data) => {
                                const result = JSON.parse(data.response);
                                for (let i = 0; i < result.length; i++) {
                                    const a = snakeToCamel(result[i]);
                                    this._usersChat[result[i].id] = {...a};
                                }
                                //result.forEach((user) => {
                                //    const a = snakeToCamel(user);  
                                //});
                            }).then(() => {
                                return this.connectToChat(idChat);
                            }).then(({token}) => {
                                return this.connectToServerSocket(this._userId, idChat, token);
                            });
                        for (const card in this._cardList) {
                            if (this._cardList[card].props.attribute['data-index'] === idChat) {
                                this._cardList[card].setProps({
                                    active: true,
                                });
                            } else {
                                this._cardList[card].setProps({
                                    active: false,
                                });
                            }
                        }
                    },
                },
            },
        });

        const _appChat = new AppChat({
            id: () => this._activeIdDialog,
            fetchChatsList: () => this.fetchChatsList.apply(this),
        });

        const _historyMessagesList = new HistoryMessagesList();

        const _form = new Form({
            page: PAGE_HOME,
            template: formTmpl,
            className: 'message-form',
            children: {
                message: new InputForm({
                    sendMessage: (text) => this.sendMessage.call(this, text),
                    setValueInput: (text) => this.setValueInput.call(this, text),
                    messageInChat: () => this.messageInChat,
                }),
            },
        });

        super({
            template: _template,
            _message: [],
            children: {
                appBar: _appBar,
                avatarProfile: _avatarProfile,
                searchForm: _searchForm,
                addChat: _addChat,
                dialogCardList: _dialogCardList,
                appChat: _appChat,
                historyMessagesList: _historyMessagesList,
                form: _form,
            },
        });
        this._props = props;
        this._cardList;
        this._activeIdDialog;
        this._userName = 'test';
        this._userId = '';
        this._userToken = '';
        this.socketMessage = [];
        this._usersChat = {};
    }

    componentDidMount() {
        new AuthAPI().getUserInfo()
            .then((data) => {
                const userInfo = JSON.parse(data.response);
                const {login, avatar, id} = userInfo;
                this._userId = id;
                this.props.children?.avatarProfile.setProps({
                    name: login,
                    srcImg: avatar || images,
                });
            })
            .then(() => {
                this.fetchChatsList();
            })
            .catch((err) => {
                console.error(err);
            });
    }
    setValueInput(value: string) {
        debugger
        this.messageInChat = value;
    }
    fetchChatsList() {
        new ChatsApi().getChats()
            .then((data) => {
                const result = JSON.parse(data.response);
                const childrenCard: Record<string, Block> = {};
                for (let i = 0; i < result.length; i++) {
                    const {last_message, avatar, title, id} = result[i];
                    childrenCard[`dialogCard${i}`] =
                        new DialogCard({
                            attribute: {'data-index': id},
                            srcImg: avatar || images,
                            name: (last_message && (last_message.user.display_name || `${last_message.user.first_name} ${last_message.user.second_name}`)) || title,
                            message: (last_message && last_message.content) || 'Сообщений нет',
                            time: '16:53',
                            status: 'received',
                            notifications: '',
                            active: false,
                        });
                }
                //result.forEach((el, index) => {
                //    const {last_message, avatar, title, id} = el;
                //    childrenCard[`dialogCard${index}`] =
                //        new DialogCard({
                //            attribute: {'data-index': id},
                //            srcImg: avatar || images,
                //            name: (last_message && (last_message.user.display_name || `${last_message.user.first_name} ${last_message.user.second_name}`)) || title,
                //            message: (last_message && last_message.content) || 'Сообщений нет',
                //            time: '16:53',
                //            status: 'received',
                //            notifications: '',
                //            active: false,
                //        });
                //});
                this._cardList = childrenCard;
                const dialogCardList = this.props.children?.dialogCardList;
                dialogCardList.setProps({
                    children: {...dialogCardList.props.children, ...childrenCard},
                    dialogCardListCount: result.length,
                });
            }).catch((err) => {
                console.error(err);
            });
    }

    fetchChatMessageList(data: []) {
        this.socketMessage = Array.isArray(data) ? data : [...this.socketMessage, data];
        let messageList: Record<string, Block> = {};
        this.socketMessage.forEach((message, index) => {
            const {content, is_read, time, user_id} = message;
            const {avatar, secondName, firstName, displayName, role} = this._usersChat[user_id];
            messageList[`messageCard${index}`] =
                new HistoryMessages({
                    srcImg: avatar || images,
                    name: displayName || `${firstName} ${secondName}`,
                    message: content,
                    time: new Date(time).toLocaleTimeString(),
                    status: is_read,
                    owner: role === 'admin' ? 'in' : 'out',
                });
        });

        const historyMessagesList = this.props.children?.historyMessagesList;

        historyMessagesList.setProps({
            children: {...historyMessagesList.props.children, ...messageList},
            messagesListCount: this.socketMessage.length,
        });
    }

    connectToChat(chatId: number) {
        return new ChatsApi().getChatUsersToken(chatId)
            .then((data) => {
                return JSON.parse(data.response);
            }).catch((err) => {
                console.error(err);
            });
    }

    fetchUsersChat(chatId: number) {
        new ChatsApi().getChatUsers(chatId)
            .then((data) => {
                const result = JSON.parse(data.response);
                result.forEach((user: any) => {this._usersChat[user.id] = {...user}});
            }).catch((err) => {
                console.log(err);
            });
    }

    connectToServerSocket(userId: string, chatId: number, token: string) {
        if (userId && chatId && token) {
            new WebSocketMessage(this.fetchChatMessageList.bind(this), userId, chatId, token)
        };
    }
    sendMessage(message: string) {
        new WebSocketMessage(this.fetchChatMessageList.bind(this)).send(message);
    }
    render(): string {
        new AuthAPI().getUserInfo()
            .then((data) => {
                const userInfo = JSON.parse(data.response);
                if (userInfo.reason) {
                    router.go('/');
                }
                this.props?.children?.avatarProfile.setProps({
                    name: userInfo.login,
                    srcImg: userInfo.avatar || images,
                });
            }).catch((err) => {
                router.go('/');
                console.error(err);
            });
        return render(template);
    }
}
