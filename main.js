const html = document.querySelector('html');

const FocoBtn = document.querySelector('.button__foco-edition');
const ShortBtn = document.querySelector('.button__short-edition');
const LongBtn = document.querySelector('.button__long-edition');
let ToggleCheckBox = document.querySelector('#checkbox-input');

const PrincTitle = document.querySelector('.principal-text');
const banner = document.querySelector('.principal-img');

const music = new Audio('./sons/luna-rise-part-one.mp3');
music.loop = true;

const StartPauseBtn = document.querySelector('.button__confirm-choose');
const Startmusic = new Audio ('./sons/play.wav');
const Pausemusic = new Audio ('./sons/pause.mp3');
const BEEP = new Audio ('./sons/beep.mp3');
let SecTime = 0
let IntervalID = null;

let Timer = document.querySelector('.time')

ToggleCheckBox.addEventListener('change', () => {
    if (music.paused) {
        music.play();
    }
    else {
        music.pause();
    }
});

FocoBtn.addEventListener('click', () => {
    MudarContexto('foco');
});

ShortBtn.addEventListener('click', () => {
    MudarContexto('descanso-curto');
});

LongBtn.addEventListener('click', () => {
    MudarContexto('descanso-longo');
})

function MudarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    
    switch(contexto) {
        case 'foco':
            SecTime = 1500;
            PrincTitle.innerHTML = `Otimize sua produtividade, <strong>mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            SecTime = 300;
            PrincTitle.innerHTML = `Que tal dar uma respirada? <strong>Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            SecTime = 900;
            PrincTitle.innerHTML = `Hora de voltar à superficie. <strong>Faça uma pausa longa.</strong>`;
    }
    Temporizador();
}

const ContagemRegressiva = () => {
    if (SecTime <= 0) {
        reset();
        alert('Contagem finalizada');
        return;
    }
    else {
        SecTime -= 1;
        Temporizador();
        if (SecTime <= 5) {
            BEEP.play();
        }
    }
}

function Contagem() {
    Temporizador()
    if (IntervalID) {
        Pausemusic.play();
        reset();
        StartPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16" id="Span-icon">
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
        </svg>
        Continuar`
        return;
    }
    else {
        IntervalID = setInterval(ContagemRegressiva, 1000);
        Startmusic.play();
        StartPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16" id="Span-icon">
        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
        </svg>
        Pausar`
    }
}

function reset() {
    clearInterval(IntervalID);
    IntervalID = null;
}

function Temporizador() {
    const tempo = new Date(SecTime * 1000);
    const tempoFatorado = (tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'}));
    Timer.innerHTML = tempoFatorado;
}

StartPauseBtn.addEventListener('click', Contagem);

Temporizador();