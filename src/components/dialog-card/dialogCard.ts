import {render} from 'pug';
import Block from '../../utils/block';
import Avatar from '../avatar';
import template from './dialogCard.tmpl';

type Props = {
    srcImg: string;
    active: boolean;
    name: string;
    message: string;
    time: string;
    status: string;
    notifications: string;
}

export default class DialogCard extends Block {
    constructor(props: Props) {
        const {srcImg, active} = props;
        const avatar = new Avatar({srcImg}).getContent();
        const className = active && 'chat-item_is-active';
        super({tagName: 'li', className, children: {avatar}, ...props});
    }
    render(): string {
        const {name, message, time, status, notifications} = this.props;
        return render(template, {
            name,
            message,
            time,
            status,
            notifications,
        });
    }
}