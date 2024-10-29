import palabras from "./paraules.js"; // Asegúrate de que `paraules.js` exporte el array de palabras

window.onload = () => {
    const buttons = document.querySelectorAll('.letra');
    const display = document.getElementById('display');
    let intentosRestantes = 6;
    let letrasErroneas = [];
    let palabraSecreta = palabra_azar(palabras);
    let palabraMostrar = "_".repeat(palabraSecreta.length);

    // Mostrar la palabra inicial con guiones bajos
    display.value = palabraMostrar;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            intentarLetra(button.value.toLowerCase());
            button.disabled = true; // Desactiva la letra seleccionada
        });
    });

    function palabra_azar(array) {
        const indiceAleatorio = Math.floor(Math.random() * array.length);
        return array[indiceAleatorio];
    }

    function intentarLetra(letra) {
        if (palabraSecreta.includes(letra)) {
            // Actualizar los guiones en el display si se acierta la letra
            let nuevaPalabraMostrar = "";
            for (let i = 0; i < palabraSecreta.length; i++) {
                nuevaPalabraMostrar += palabraSecreta[i] === letra ? letra : palabraMostrar[i];
            }
            palabraMostrar = nuevaPalabraMostrar;
            display.value = palabraMostrar;
        } else {
            if (!letrasErroneas.includes(letra)) {
                letrasErroneas.push(letra);
                intentosRestantes--;
            }
        }

        verificarEstadoJuego();
    }

    function verificarEstadoJuego() {
        if (intentosRestantes === 0) {
            alert("¡Perdiste! La palabra era: " + palabraSecreta);
            reiniciarJuego();
        } else if (!palabraMostrar.includes("_")) {
            alert("¡Felicidades! Has ganado.");
            reiniciarJuego();
        }
    }

    function reiniciarJuego() {
        palabraSecreta = palabra_azar(palabras);
        palabraMostrar = "_".repeat(palabraSecreta.length);
        intentosRestantes = 6;
        letrasErroneas = [];
        display.value = palabraMostrar;
        buttons.forEach(button => button.disabled = false); // Reactiva los botones
    }

    // Popup para intercambiar datos (puedes modificar la URL según el caso)
    let win = window.open("../juego-popup.html", "", "popup,width=500,height=500");
    document.getElementById("send").addEventListener("click", () => {
        win.postMessage(display.value, "*"); // Enviar la palabra actual al popup
    });

    // Escuchar mensajes del popup
    window.addEventListener("message", (event) => {
        if (event.origin === "http://127.0.0.1:5501") { // Cambia al origen correcto
            alert("Mensaje recibido del popup: " + event.data);
        }
    });
};
