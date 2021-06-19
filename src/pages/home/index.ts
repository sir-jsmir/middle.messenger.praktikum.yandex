import template from './home.tmpl';
import SearchForm from '../../components/search-form';
import DialogCard from '../../components/dialog-card';
import HistoryMessages from '../../components/history-messages';
import InputForm from '../../components/input-form';
import PageHome from './home';
import images from '../../../static/img/*.jpg';
import svgs from '../../../static/svg/*.svg';
import Profile from '../../components/profile';
import Form from '../../components/form';
import {PAGE_HOME} from '../../constants/namePages';

const formTmpl = `
#message
`;

new PageHome({
    title: PAGE_HOME,
    template: template,
    children: {
        avatarProfile: new Profile({
            name: 'John Les',
            srcImg: images.avatar_1,
        }).getContent(),

        searchForm: new SearchForm({}).getContent(),

        dialogCard1: new DialogCard({
            srcImg: images.avatar_2,
            name: 'Юлия',
            message: 'Вот они молодцы мы только приехали, тоже сейчас будем кушать',
            time: '16:55',
            status: 'sent',
            notifications: '',
            active: true,
        }).getContent(),

        dialogCard2: new DialogCard({
            srcImg: images.avatar_3,
            name: 'Евгений',
            message: 'Хорошо',
            time: '16:54',
            status: 'read',
            notifications: '',
            active: false,
        }).getContent(),

        dialogCard3: new DialogCard({
            srcImg: images.avatar_4,
            name: 'Иван',
            message: 'Вот они молодцы мы только приехали, тоже сейчас будем кушать',
            time: '16:53',
            status: 'received',
            notifications: '',
            active: false,
        }).getContent(),

        dialogCard4: new DialogCard({
            srcImg: images.avatar_2,
            name: 'София',
            message: 'Вот они молодцы мы только приехали, тоже сейчас будем кушать',
            time: '16:50',
            status: 'sent',
            notifications: '',
            active: false,
        }).getContent(),

        dialogCard5: new DialogCard({
            srcImg: images.avatar_3,
            name: 'Александр',
            message: 'Вот они молодцы мы только приехали, тоже сейчас будем кушать',
            time: '16:44',
            status: 'read',
            notifications: '',
            active: false,
        }).getContent(),

        historyMessages1: new HistoryMessages({
            srcImg: images.avatar_2,
            name: 'Юлия',
            message: 'Вот они молодцы мы только приехали, тоже сейчас будем кушать',
            time: '16:55',
            status: '',
            owner: 'in',
        }).getContent(),

        historyMessages2: new HistoryMessages({
            srcImg: images.avatar_3,
            name: 'John Les',
            message: 'Вот они молодцы мы только приехали, тоже сейчас будем кушать',
            time: '16:55',
            status: 'read',
            owner: 'out',
        }).getContent(),

        historyMessages3: new HistoryMessages({
            srcImg: images.avatar_2,
            name: 'Юлия',
            message: 'Вот они молодцы мы только приехали, тоже сейчас будем кушать',
            time: '16:55',
            status: '',
            owner: 'in',
        }).getContent(),

        historyMessages4: new HistoryMessages({
            srcImg: images.avatar_3,
            name: 'John Les',
            message: 'Вот они молодцы мы только приехали, тоже сейчас будем кушать',
            time: '16:55',
            status: 'read',
            owner: 'out',
        }).getContent(),
        form: new Form({
            template: formTmpl,
            className: 'message-form',
            children: {
                message: new InputForm().getContent(),
            },
        }).getContent(),
    },
});
