const LimparTudo = document.querySelector('#btn_limpar-tudo');
const LimparConcluidas = document.querySelector('#btn_limpar-concluidas');
const Form = document.querySelector('.form-addtask');
const btnAddTask = document.querySelector('.btn_add');
const textarea = document.querySelector('#textarea-add');
const ulTask = document.querySelector('.task-list');
const CancelBtn = document.querySelector('.cancel');
const ActiveTaskParagraph = document.querySelector('.work-active-task');

let listaTarefas = JSON.parse(localStorage.getItem('listaTarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

btnAddTask.addEventListener('click', () => {
    Form.classList.toggle('hidden');
});

Form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    listaTarefas.push(tarefa);
    const elementoLista = CriarTarefa(tarefa);
    ulTask.append(elementoLista);
    Form.classList.add('hidden');
    textarea.textContent = '';
    AtualizarTarefa();
});

function AtualizarTarefa() {
    localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas))
};

function CriarTarefa (tarefa) {
    const li = document.createElement('li');
    li.classList.add('add-list-box');

    const div = document.createElement('div');
    div.classList.add('left-content');

    const svg = document.createElement('svg');
    svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>`;

    const p = document.createElement('p');
    p.textContent = tarefa.descricao
    p.classList.add('task-name');

    const button = document.createElement('button');
    button.classList.add('edit-button');

    const img = document.createElement('img');
    img.classList.add('image-edit-button');
    img.setAttribute('src', './imagens/edit.png');
    
    img.onclick = () => {        
        if (tarefa.completo) {
            alert('Tarefa Concluida! não pode mais editar');
        }
        else {
            const Editando = prompt('Editando Tarefa...');
            if (Editando) {
                p.textContent = Editando;
                tarefa.descricao = Editando;
                AtualizarTarefa();
            }
        }
 
    }
    if (tarefa.completo) {
        li.classList.remove('add-list-box-active');
        li.classList.add('add-list-box-complete');
        ActiveTaskParagraph.textContent = '';
        img.setAttribute('disabled', 'disabled');
    }
    else {
        li.onclick = () => {
            document.querySelectorAll('.add-list-box-active')
                .forEach(elemento => {
                    elemento.classList.remove('add-list-box-active');
                });
                if (tarefa.completo) {
                    li.classList.remove('add-list-box-active');
                }
            if (tarefaSelecionada == tarefa) {
                ActiveTaskParagraph.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li;
            ActiveTaskParagraph.textContent = tarefa.descricao;

            li.classList.add('add-list-box-active');
        }
    }

    li.append(div);
    li.append(button);

    div.append(svg);
    div.append(p);

    button.append(img);

    return li
}

listaTarefas.forEach(tarefa => {
    let elementoLista = CriarTarefa(tarefa);
    ulTask.append(elementoLista);
});

document.addEventListener('focoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        ActiveTaskParagraph.textContent = '';
        liTarefaSelecionada.classList.remove('add-list-box-active');
        tarefaSelecionada.completo = true;
        liTarefaSelecionada.classList.add('add-list-box-complete');
        AtualizarTarefa();
    }
})

function SeletorChave (seletor) {
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
}

LimparConcluidas.onclick = () => {
    const seletor = '.add-list-box-complete';
    SeletorChave(seletor);

    listaTarefas = listaTarefas.filter(tarefa => !tarefa.completo);
    AtualizarTarefa();
};

LimparTudo.onclick = () => {
    const seletor = '.add-list-box';
    SeletorChave(seletor);

    listaTarefas = [];
    AtualizarTarefa();
}

//Finalmente terminei rsrsrs//
