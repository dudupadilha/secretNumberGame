let selectedNumbers = [];
let limitNumber = 10;
let secretNumber = randomNumber();
let attempts = 1;


function showText(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function initialText(){
    showText('h1', 'Jogo do número secreto');
    showText('p', 'Acerte um numero entre 1 e 10');
}

initialText();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == secretNumber){
        showText('h1', 'Acertou');
        let palavraTentativa = attempts > 1? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Você descobriu o número secreto em ${attempts} ${palavraTentativa}`
        showText('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else if(chute > secretNumber){
        showText('h1', 'Errou!');
        showText('p', 'O numero é menor');
    }else {
        showText('h1', 'Errou!');
        showText('p', 'o numero é maior');
    }
    attempts++;
    limparCampo();

}

function randomNumber(){
    let numeroEscolhido = parseInt(Math.random() * limitNumber + 1);
    let quantidadeElementos = selectedNumbers.length;

    if(quantidadeElementos == limitNumber){
        selectedNumbers = [];
    }

    if(selectedNumbers.includes(numeroEscolhido)){
        return randomNumber();
    }else {
        selectedNumbers.push(numeroEscolhido);
        console.log(selectedNumbers);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    secretNumber = randomNumber();
    limparCampo();
    attempts = 1;
    initialText();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}