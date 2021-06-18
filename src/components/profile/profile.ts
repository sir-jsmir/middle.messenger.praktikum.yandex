import {render} from 'pug';
import Block from '../../utils/block';
import AvatarProfile from '../avatarProfile';
import template from './profile.tmpl';

type Props = {
    name: string;
    srcImg: string;
    avatarProfile?: string;
    className?: string;
}

export default class Profile extends Block {
    constructor(props: Props) {
        super({...props});
    }
    render(): string {
        const {name, srcImg} = this.props;
        return render(template, {
            name,
            avatarProfile: new AvatarProfile({srcImg}).render(),
        });
    }
}
