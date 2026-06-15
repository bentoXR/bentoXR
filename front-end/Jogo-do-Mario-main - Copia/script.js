const sonic = document.querySelector('.sonic');
const contador = document.querySelector('.contador');
let quantidadePulos = 0;

let velocidadeAtual = 1.5;
let intervaloVelocidade;

const iniciarTemporizadorVelocidade = () => {
    clearInterval(intervaloVelocidade);
    velocidadeAtual = 1.5;
    espinho.style.animationDuration = `${velocidadeAtual}s`;
    
    intervaloVelocidade = setInterval(() => {
        velocidadeAtual = velocidadeAtual / 1.20;
        espinho.style.animationDuration = `${velocidadeAtual}s`;
    }, 20000);
}


const pular = () => {
    if (sonic.classList.contains('pulo')) return;

    sonic.src = 'assets/imgs/spin.gif';
    sonic.classList.add('pulo');

    quantidadePulos++;
    contador.textContent = `Pulos: ${quantidadePulos}`;

    setTimeout(() => {
        sonic.classList.remove('pulo');
        if (fimDeJogo.style.visibility !== 'visible') {
            sonic.src = 'assets/imgs/sonic.gif';
        }
    }, 500);
}
const espinho = document.querySelector('.espinho');
const passaro = document.querySelector('.passaro');

const fimDeJogo = document.querySelector('.fim-de-jogo');
const botaoReiniciar = document.querySelector('.reiniciar');
const loopJogo = setInterval(() => {

    const posicaoEspinho = espinho.offsetLeft;
    const posicaoSonic = +window.getComputedStyle(sonic).bottom.replace('px', '');
    const posicaoPassaro = +window.getComputedStyle(passaro).left.replace('px', '');

    if (posicaoEspinho <= 100 && posicaoEspinho > 0 && posicaoSonic < 270) {

        espinho.style.animation = 'none';
        espinho.style.left = `${posicaoEspinho}px`;

        sonic.style.animation = 'none';
        sonic.style.bottom = `${posicaoSonic}px`;

        sonic.src = 'assets/imgs/fim-de-jogo.png';
        sonic.style.width = '105px';
        sonic.style.marginLeft = '0px';

        passaro.style.animation = 'animacao-passaro 20s infinite linear';
        passaro.style.left = `${posicaoPassaro}px`;

        fimDeJogo.style.visibility = 'visible';

        clearInterval(loopJogo);
        clearInterval(intervaloVelocidade);
    }
}, 10);

const reiniciar = () => {

    fimDeJogo.style.visibility = 'hidden';
    espinho.style.animation = 'espinho-animations 1.5s infinite linear';
    espinho.style.left = ``;

    sonic.src = 'assets/imgs/sonic.gif';
    sonic.style.width = '104px';
    sonic.style.bottom = '210px';
    sonic.style.marginLeft = '';
    sonic.style.animation = '';
    passaro.style.left = ``;

    quantidadePulos = 0;
    contador.textContent = `Pulos: ${quantidadePulos}`;

    iniciarTemporizadorVelocidade();

    const loopJogo = setInterval(() => {

        const posicaoEspinho = espinho.offsetLeft;
        const posicaoSonic = +window.getComputedStyle(sonic).bottom.replace('px', '');
        const posicaoPassaro = +window.getComputedStyle(passaro).left.replace('px', '');

        if (posicaoEspinho <= 100 && posicaoEspinho > 0 && posicaoSonic < 270) {

            espinho.style.animation = 'none';
            espinho.style.left = `${posicaoEspinho}px`;

            sonic.style.animation = 'none';
            sonic.style.bottom = `${posicaoSonic}px`;

            sonic.src = 'assets/imgs/fim-de-jogo.png';
            sonic.style.width = '105px';
            sonic.style.marginLeft = '0px';

            passaro.style.animation = 'animacao-passaro 20s infinite linear';
            passaro.style.left = `${posicaoPassaro}px`;

            fimDeJogo.style.visibility = 'visible';

            clearInterval(loopJogo);
            clearInterval(intervaloVelocidade);
        }
    }, 10);
}

iniciarTemporizadorVelocidade();

document.addEventListener('keydown', () => fimDeJogo.style.visibility === 'visible' ? reiniciar() : pular());
document.addEventListener('touchstart', () => fimDeJogo.style.visibility === 'visible' ? reiniciar() : pular());

botaoReiniciar.addEventListener('click', reiniciar);