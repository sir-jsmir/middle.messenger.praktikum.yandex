import { getFormData } from "../../utils/getFormData";

window.onload = () => {
    const form = document.querySelector('.form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const result = getFormData(form);
        console.log(result)
        // window.location.href = '../home/index.html';
    })
};

