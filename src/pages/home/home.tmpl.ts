import foo from '../../../static/svg/*.svg';
export default `
.chat
    .sidebar
        .sidebar__content
            .app-bar
                .app-bar__setting-profile
                    a(href="../profile/index.html") 
                        img(src='${foo.settings_24dp}') 
                .app-bar__log-out
                    a(href="../signIn/index.html") 
                        img(src='${foo.logout_24dp}')
            #avatarProfile
            #searchForm
            nav
            ul.chat-list
                #dialogCard1
                #dialogCard2
                #dialogCard3
                #dialogCard4
                #dialogCard5
    main.content
        .msg
            #historyMessages1
            #historyMessages2
            #historyMessages3
            #historyMessages4
        footer.footer
            #form
`;
