import {render} from 'pug';
import Block from '../../utils/block';
import template from './page404.tmpl';
import {PAGE_404} from '../../constants/namePages';
export default class Page404 extends Block {
    constructor() {
        document.title = PAGE_404;
        const _template = template;

        super({template: _template});
    }

    render(): string {
        const {template} = this.props;
        return render(template);
    }
}
