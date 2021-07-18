import foo from '../../../static/svg/*.svg';
export default `
div(class='app-chat__form-add-user '+(open ? 'visible' : 'hidden'))
    input(class='app-chat__input' placeholder='Введите логин')
    img(class='icon-add-user' src='${foo.add_24dp}')
#addUser
div(class='app-chat__form-delete-user '+(openDelete ? 'visible' : 'hidden'))
    input(class='app-chat__input' placeholder='Введите логин')
    img(class='icon-add-user' src='${foo.add_24dp}')
#deleteUser
#deleteChat
`;
