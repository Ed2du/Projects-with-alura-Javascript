const BtnAddTask = document.querySelector('.btn_add');
const Form = document.querySelector('.form-addtask');

let textarea = document.querySelector('#textarea-add');
let SubmitBtn = document.querySelector('.submit-form');

BtnAddTask.addEventListener('click', () => {
    Form.classList.toggle('hidden');
});

textarea.addEventListener('submit', (evento) => {
    evento.preventDefault();
});

