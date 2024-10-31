// window.onload = () => {
//     const buttons = document.querySelectorAll('.letra');
//     const display = document.getElementById('display');

//     buttons.forEach(button => {
//         button.addEventListener('click', () => {
//             display.value += button.value; 
//         });
//     });
//     let input = document.getElementById("display");

//     let win = window.open("./juego-popup.html", "", "popup,width=500,height=500");

//     document.getElementById("send").addEventListener("click", () => {

//         win.postMessage(input.value, "http://127.0.0.1:5501");

//     })
// }

window.onload = () => {
    let win = window.open("./juego-popup.html", "", "popup,width=500,height=500");
    win.postMessage("http://127.0.0.1:5501");

        const displayContainer = document.getElementById('display-container');

        const palabra = palabra_azar(PARAULES);
        mostrarLineas(palabra.length);

        function palabra_azar(array) {
            const indiceAleatorio = Math.floor(Math.random() * array.length);
            return array[indiceAleatorio];
        }
        function mostrarLineas(numLetras) {
            displayContainer.innerHTML = "";
            for (let i = 0; i < numLetras; i++) {   
                displayContainer.innerHTML = displayContainer.innerHTML + '<img src="img/linea.svg" alt="linea" class="linea-palabra">';
            }
        }
 }
console.log("entra")

// const palabra = palabra_azar(palabras);
// lineas(palabra)
// console.log(`La palabra escogida al azar es: ${palabra}`);
