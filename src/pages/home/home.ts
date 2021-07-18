import Block from '../../utils/block';
import {render} from 'pug';
import {PropsPage} from '../../constants/types';
import DialogCard from '../../components/dialog-card';
import HistoryMessages from '../../components/history-messages';
import FormInputIcon from '../../components/formInputIcon';
import AppBar from '../../components/appBar/appBar';
import Profile from '../../components/profile';
import images from '../../../static/img/*.jpg';
import AuthAPI from '../../api/authApi';
import ChatsApi from '../../api/chatsApi';
import {PAGE_HOME} from '../../constants/namePages';
import template from './home.tmpl';
import InputForm from '../../components/input-form';
import Form from '../../components/form';
import DialogCardList from '../../components/dialogCardList';
import AppChat from '../../components/appChat/appChat';
import svgs from '../../../static/svg/*.svg';
import WebSocketMessage from '../../api/webSocket';
import HistoryMessagesList from '../../components/historyMessagesList';
import router from '../../index';

const formTmpl = `
#message
`;
export default class PageHome extends Block {
    _appBar: Block;
    _avatarProfile: Block;
    _title: string;
    _template: string;
    _cardList: [];
    _activeIdDialog: number;
    _userName: string;
    _userId: string;
    _userToken: string;
    socketMessage: [];
    _usersChat: Record<string, unknown>;;

    constructor() {
        const _template = template;
        document.title = PAGE_HOME;

        const _appBar = new AppBar();

        const _avatarProfile = new Profile({
            name: '',
            srcImg: images.avatar_1,
        });

        const _searchForm = new FormInputIcon({
            placeholder: 'Поиск',
            name: 'search',
            srcIcon: svgs.search_24dp,
            value: '',
            events: {
                click: {
                    tagEvent: 'button',
                    callback: (e) => {
                        e.preventDefault();
                    }
                },
                input: {
                    tagEvent: 'input',
                    callback: (e) => {
                        e.preventDefault();
                    }
                }
            }
        });
        const _addChat = new FormInputIcon({
            placeholder: 'Введите название чата',
            name: 'addChat',
            value: '',
            srcIcon: svgs.add_24dp,
            events: {
                input: {
                    tagEvent: 'input',
                    callback: (e) => {
                        e.preventDefault();
                        this.value = e.target.value
                    }
                },
                click: {
                    tagEvent: 'button',
                    callback: (e) => {
                        e.preventDefault();
                        if (this.value.length > 3) {
                            new ChatsApi().createChat(this.value)
                                .then((data) => {
                                    const result = JSON.parse(data.response);
                                    this.value: '';
                                    this.fetchChatsList();
                                })
                        } else {
                            this.setProps({
                                error: true,
                            });
                        }
                    }
                }
            }
        });

        const _dialogCardList = new DialogCardList({
            fetchChatsList: () => this.fetchChatsList(),
            events: {
                click: {
                    tagEvent: 'li',
                    callback: (e: Event) => {
                        const idChat = +e.currentTarget?.dataset.index;
                        this._activeIdDialog = idChat;
                        this.socketMessage = [];
                        new ChatsApi().getChatUsers(idChat)
                            .then((data) => {
                                const result = JSON.parse(data.response);
                                result.forEach((user) => {
                                    this._usersChat[user.id] = {...user}
                                })
                            }).then(() => {
                                return this.connectToChat(idChat);
                            }).then(({token}) => {
                                return this.connectToServerSocket(this._userId, idChat, token);
                            })
                        for (let card in this._cardList) {
                            if (this._cardList[card].props.attribute['data-index'] === idChat) {
                                this._cardList[card].setProps({
                                    active: true,
                                })
                            } else {
                                this._cardList[card].setProps({
                                    active: false,
                                })
                            }
                        }
                    },
                },
            };
        });

        const _appChat = new AppChat({
            id: () => this._activeIdDialog,
            fetchChatsList: () => this.fetchChatsList()
        })

        const _historyMessagesList = new HistoryMessagesList();

        const _form = new Form({
            template: formTmpl,
            className: 'message-form',
            children: {
                message: new InputForm({
                    message: ''
                    events: {
                        click: {
                            tagEvent: '.input-form__send-message',
                            callback: () => {
                                if (this.message.length > 0) {
                                    this.sendMessage(this.message)
                                }
                            }
                        },
                        input: {
                            tagEvent: 'input',
                            callback: (e: Event) => {
                                this.message = e.target.value
                            }
                        }
                    }
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

        this._cardList = '';
        this._activeIdDialog = '';
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
                this.props.children.avatarProfile.setProps({
                    name: login,
                    srcImg: avatar || images.avatar_1,
                });
            })
            .then(() => {
                this.fetchChatsList();
            })
            .then(() => {

            })
    }

    fetchChatsList() {
        new ChatsApi().getChats()
            .then((data) => {
                const result = JSON.parse(data.response);
                let childrenCard = {};
                result.forEach((el, id) => {
                    const {last_message, avatar, title} = el;
                    childrenCard[`dialogCard${id}`] =
                        new DialogCard({
                            attribute: {'data-index': el.id},
                            srcImg: avatar || images.avatar_4,
                            name: (last_message && (last_message.user.display_name || `${last_message.user.first_name} ${last_message.user.second_name}`)) || title,
                            message: (last_message && last_message.content) || 'Сообщений нет',
                            time: '16:53',
                            status: 'received',
                            notifications: '',
                            active: false,
                        });
                })
                this._cardList = childrenCard;
                const {dialogCardList} = this.props.children;
                dialogCardList.setProps({
                    children: {...dialogCardList.props.children, ...childrenCard},
                    dialogCardListCount: result.length,
                });
            });
    }

    loadingMessageList() {
        let messageList = {};
        this.socketMessage.forEach((message, index) => {
            const {chat_id, content, id, is_read, time, user_id} = message;
            const {avatar, second_name, first_name, display_name} = this._usersChat[user_id];
            messageList[`messageCard${index}`] =
                new HistoryMessages({
                    srcImg: avatar || images.avatar_2,
                    name: display_name || `${first_name} ${second_name}`,
                    message: content,
                    time: time,
                    status: is_read,
                    owner: 'in',
                });
        })
        const {historyMessagesList} = this.props.children;

        historyMessagesList.setProps({
            children: {...historyMessagesList.props.children, ...messageList},
            messagesListCount: this.socketMessage.length,
        });
    }

    fetchChatMessageList(data: []) {
        this.socketMessage = Array.isArray(data) ? data : [...this.socketMessage, data];
        let messageList = {};
        this.socketMessage.forEach((message, index) => {
            const {chat_id, content, id, is_read, time, user_id} = message;
            const {avatar, second_name, first_name, display_name} = this._usersChat[user_id];
            messageList[`messageCard${index}`] =
                new HistoryMessages({
                    srcImg: avatar || images.avatar_2,
                    name: display_name || `${first_name} ${second_name}`,
                    message: content,
                    time: time,
                    status: is_read,
                    owner: 'in',
                });
        })
        const {historyMessagesList} = this.props.children;

        historyMessagesList.setProps({
            children: {...historyMessagesList.props.children, ...messageList},
            messagesListCount: this.socketMessage.length,
        });
    }

    connectToChat(chatId: number) {
        return new ChatsApi().getChatUsersToken(chatId)
            .then((data) => {
                return JSON.parse(data.response);
            })
    }

    fetchUsersChat(chatId: number) {
        new ChatsApi().getChatUsers(chatId)
            .then((data) => {
                const result = JSON.parse(data.response);
                result.forEach((user) => {
                    this._usersChat[user.id] = {...user}
                })
            })
    }

    connectToServerSocket(userId: string, chatId: number, token) {
        if (userId && chatId && token) {
            new WebSocketMessage(userId, chatId, token, this.fetchChatMessageList.bind(this))
        }
    }
    sendMessage(message: string) {
        new WebSocketMessage().send(message);
    }
    render(): string {
        new AuthAPI().getUserInfo()
            .then((data) => {
                const userInfo = JSON.parse(data.response);
                if (userInfo.reason) {
                    router.go('/');
                }
                this.props.children.avatarProfile.setProps({
                    name: userInfo.login,
                    srcImg: userInfo.avatar || images.avatar_1,
                });
            });
        const {template} = this.props;
        return render(template);
    }
}
