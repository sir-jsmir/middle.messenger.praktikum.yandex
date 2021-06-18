import {render} from 'pug';
import Block from '../../utils/block';
import template from './title-auth.tmpl';

type Props = {
    title1: string;
    title2: string;
    link: string;
}

export default class TitleAuth extends Block {
    constructor(props: Props) {
        super(props);
    }
    render(): string {
        const {title1, title2, link} = this.props;
        return render(template, {
            title1,
            title2,
            link,
        });
    }
}
