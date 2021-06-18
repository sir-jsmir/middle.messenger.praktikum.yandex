import svgs from '../../../static/svg/*.svg';
export default `
.input-form__message 
    input(type="text" placeholder="Написать сообщение")
.input-form__icon-emoji
    img(src="${svgs.icon_emoji_24dp}")
.input-form__media-attach
    img(src="${svgs.attach_file_24dp}")
.input-form__send-message
    img(src="${svgs.send_24dp}")
`;
