import icon from '../../../static/svg/icon_emoji_24dp.svg';
import attach from '../../../static/svg/attach_file_24dp.svg';
import send from '../../../static/svg/send_24dp.svg';
export default `
.input-form__message 
    input(type="text" value= _value placeholder="Написать сообщение")
.input-form__icon-emoji
    img(src="${icon}")
.input-form__media-attach
    img(src="${attach}")
.input-form__send-message
    img(src="${send}")
`;
