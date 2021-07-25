import {render} from 'pug';
import Block from '../../utils/block';
import template from './page500.tmpl';
import {PAGE_500} from '../../constants/namePages';
export default class Page500 extends Block {
    constructor() {
        document.title = PAGE_500;
        const _template = template;
        super({template: _template});
    }

    render(): string {
        const {template} = this.props;
        return render(template);
    }
}
