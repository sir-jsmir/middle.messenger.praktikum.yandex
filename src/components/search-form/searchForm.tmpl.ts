import svgs from '../../../static/svg/*.svg';
export default `
input.search-form__input(type="text" placeholder="Поиск")
button.search-form__button
    img(src="${svgs.search_24dp}")
`;
