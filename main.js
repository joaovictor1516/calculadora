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
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
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
        if (texto === ','){
            display.textContent += texto;
        } else{
            display.textContent = texto;
        }
    } else{
        if(novoNumero){
            display.textContent = texto.toLocaleString('BR');
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
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
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

const existeDecimal = () => display.textContent.indexOf(',') !== -1;

const existeNumero = () => display.textContent.length > 0;

const adicionarDecimal = () => {
    if (!existeDecimal()){
        if (existeNumero()){
            atualizarDisplay(',');
        } else{
            atualizarDisplay('0,');
        }
    }
} 

document.getElementById('decimal').addEventListener('click', adicionarDecimal);

const mapaTeclado = {
    '0'         :'tecla0',
    '1'         :'tecla1',
    '2'         :'tecla2',
    '3'         :'tecla3',
    '4'         :'tecla4',
    '5'         :'tecla5',
    '6'         :'tecla6',
    '7'         :'tecla7',
    '8'         :'tecla8',
    '9'         :'tecla9',
    '+'         :'operadorAdicionar',
    '-'         :'operadorSubtrair',
    '/'         :'operadorDividir',
    '*'         :'operadorMultiplicar',
    '='         :'igual',
    'Enter'     :'igual',
    'Backspace' :'backspace',
    'c'         :'limparCalculo',
    'escape'    :'limparDisplay',
    ','         :'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    
    const teclaPermitida = () => {
        Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    }

    if(teclaPermitida){
        document.getElementById(mapaTeclado[tecla]).click();
    }
}

addEventListener('keydown', mapearTeclado);