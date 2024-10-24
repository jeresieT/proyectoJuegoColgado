// window.onload = () => {
//     const buttons = document.querySelectorAll('.letra');
//     const display = document.getElementById('display');

//     buttons.forEach(button => {
//         button.addEventListener('click', () => {
//             display.value += button.value; 
//         });
//     });
//     // Guardem una referencia de l'input de l'HTML
//     let input = document.getElementById("display");

//     // Obrim un popup
//     let win = window.open("./juego-popup.html", "", "popup,width=500,height=500");


//     // Enviem el text escrit dins l'input si l'usuari clica al botó
//     document.getElementById("send").addEventListener("click", () => {

//         win.postMessage(input.value, "http://127.0.0.1:5500");

//     })

// }
const palabras = require("./paraules");

function palabra_azar(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    const palabraEscogida = array[indiceAleatorio];
    console.log(indiceAleatorio)
    console.log(array[indiceAleatorio])
    return palabraEscogida;
}


function lineas(palabra) {
    let x = 0
    for (i = 0; i < palabra.length; i++) {
        x++
    }
    console.log(x)
}

const palabra = palabra_azar(palabras);
lineas(palabra)
console.log(`La palabra escogida al azar es: ${palabra}`);
