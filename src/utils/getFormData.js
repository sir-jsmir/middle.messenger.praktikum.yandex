export const getFormData = (form) => {
    let result = {}
    if (form) {
        const elem = form.elements;
        for (let i = 0; i < elem.length; i++) {
            switch (elem[i].type) {
                case 'submit':
                    break;
                case 'radio':
                    break;
                case 'checkbox':
                    break;
                default:
                    result[elem[i].name] = elem[i].value;
            }
        }
    }
    return result
}


