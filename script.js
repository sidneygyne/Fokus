const html = document.querySelector('html')
const botaoIniciar = document.querySelector('.app__card-primary-button')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iconePlayPausa = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
musica.loop = true
const audioPlay = new Audio('sons/play.wav')
const audioPausa = new Audio('sons/pause.mp3')
const audioTempoFinalizado= new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500 
let intervaloId = null



const dislayTempo = document.querySelector('#time')

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
}) // obs: change = evento de alteração / usada inputs do tipo checkbox para alternar entre true e false

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos= 1500
    alterarContexto('foco')
    // html.setAttribute('data-contexto', 'foco')
    // banner.setAttribute('src', '/imagens/foco.png')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    // html.setAttribute('data-contexto', 'descanso-curto')
    // banner.setAttribute('src', '/imagens/descanso-curto.png')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    // html.setAttribute('data-contexto', 'descanso-longo')
    // banner.setAttribute('src', '/imagens/descanso-longo.png')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostraTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
                titulo.innerHTML = `
                Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;

        case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                    <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;

        case "descanso-longo":
                titulo.innerHTML = `
                    Hora de voltar à superfície.<br>
                    <strong class="app__title-strong"> Faça uma pausa longa.</strong>
                `	
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        iconePlayPausa.setAttribute('src', `imagens/play_arrow.png`)
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostraTempo()
    //console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        iconePlayPausa.setAttribute('src', `imagens/play_arrow.png`)
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000) // setInterval(o que vai ser execultado, internva de tempo para execultar ex: a cada 1 segundo temos 1000 = 1segundo)
    iniciarOuPausarBt.textContent = "Pausar"
    iconePlayPausa.setAttribute('src', `imagens/pause.png`)
}

function zerar (){
    clearInterval(intervaloId) //  clearInterval interrompe/para a execulção de setInterval declarada 
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
}


function mostraTempo (){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('bt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostraTempo()





// SOBRE O CODIGO

// Seleção de elementos do DOM:
// Você está usando corretamente o" document.querySelector()" para selecionar os elementos HTML necessários para o funcionamento do seu aplicativo.
// A nomeação das variáveis é clara e descritiva, facilitando o entendimento do código.

// Manipulação de classes e atributos:
// Você está usando corretamente o "classList.add() e classList.remove()" para adicionar e remover classes dos elementos HTML.
// A atualização dos atributos "src" do banner e "data-contexto" do HTML também está sendo feita de forma adequada.

// Lógica de alteração de contexto:
// A função "alterarContexto()" é responsável por centralizar a lógica de alteração do contexto (foco, descanso curto, descanso longo).
// Ela atualiza o tempo exibido na tela, remove a classe "active" de todos os botões e atualiza o banner e o título de acordo com o novo contexto.

// Contagem regressiva:
// A função "contagemRegressiva()" é responsável por decrementar o tempo a cada segundo e atualizar a exibição do tempo na tela.
// Ela também verifica se o tempo chegou a zero e, nesse caso, reproduz um som de alerta e zera o temporizador.

// Iniciar/Pausar o temporizador:
// O evento de clique no botão "Iniciar/Pausar" é tratado pela função "iniciarOuPausar()."
// Essa função verifica se o temporizador está em execução e, com base nisso, inicia ou pausa a contagem regressiva, atualizando o texto e o ícone do botão.

// Reprodução de áudio:
// Você implementou a funcionalidade de reprodução de áudio durante o foco, utilizando o evento de mudança do checkbox "Alternar Música".
// Também há sons de play e pause sendo reproduzidos ao iniciar e pausar o temporizador.