'use strict';

const display = document.getElementById("display");
const numeros = document.querySelectorAll('[id *= tecla]');
const operadores = document.querySelectorAll('[id *= operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => {
    operador !== undefined;
}
const calcular = () => {
    if(operacaoPendente){
        const numeroAtual = parseFloat(display.textContent);
        novoNumero = true;
        
        if(operador === '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }
        else if(operador === 'x'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }
        else if(operador === '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }
        else if(operador === '÷'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

const atualizarDisplay = (texto) => {
    if(display.textContent === '0'){
        display.textContent = texto;
    } else{
        if(novoNumero){
            display.textContent = texto;
            novoNumero = false;
        }
        else{
            display.textContent += texto;
        }
    }
}

const inserirNumero = (evento) => {
   atualizarDisplay(evento.target.textContent);
}

const selecionaOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero = true;
        numeroAnterior = parseFloat(display.textContent);
        operador = evento.target.textContent;
    }
}

const limparDisplay = () => {
    display.textContent = '0';
}

document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    numeroAnterior = undefined;
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));
operadores.forEach(operador => operador.addEventListener('click', selecionaOperador));

const igual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', igual);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}

document.getElementById('inverter').addEventListener('click', inverterSinal);

const removerUltimoNumero = () => {
    novoNumero = true;
    if(display.textContent.length > 1){
        atualizarDisplay(display.textContent.substring(0, display.textContent.length -1));
    } else{
        atualizarDisplay('0');
    }
}

document.getElementById('backspace').addEventListener('click', removerUltimoNumero);