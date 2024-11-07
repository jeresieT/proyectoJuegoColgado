const displayContainer = document.getElementById('display-container');
const letraInput = document.getElementById('teclado');
let vidas = 5;
let win;
let tiempoInicio = Date.now();

function iniciarTemporizador() {
    const tiempoTranscurridoElemento = document.getElementById('tiempo-transcurrido');

    setInterval(() => {
        const tiempoActual = Date.now();
        const segundosTranscurridos = Math.floor((tiempoActual - tiempoInicio) / 1000);
        tiempoTranscurridoElemento.textContent = segundosTranscurridos;
    }, 1000);
}

// Función para reiniciar la partida
function iniciarNuevaPartida() {
    vidas = 5;
    tiempoInicio = Date.now(); // Reinicia el tiempo de inicio
    const palabra = palabra_azar(PARAULES);
    mostrarLineas(palabra);
}

// Función para elegir una palabra aleatoria
function palabra_azar(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

// Función para mostrar las líneas y letras acertadas
function mostrarLineas(palabra) {
    console.log(palabra);
    let letrasMostradas = Array(palabra.length).fill('_');
    renderizar();

    function renderizar() {
        displayContainer.innerHTML = letrasMostradas
            .map(letra => letra === '_' ? '<img src="img/linea.svg" alt="linea" class="linea-palabra">' : `<span class="letra">${letra}</span>`)
            .join('');
    }

    document.getElementById("send").onclick = () => {
        const letraIngresada = letraInput.value.toLowerCase();
        letraInput.value = ""; // Limpia el input después de cada intento

        let encontrada = false;
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i].toLowerCase() === letraIngresada) {
                letrasMostradas[i] = palabra[i];
                encontrada = true;
            }
        }

        if (!encontrada) {
            vidas--;
            actualizarVidasPopup(vidas);
            if (vidas <= 0) {
                registrarEstadistica("Perdida");
                alert("Juego terminado. No quedan vidas.");
                window.location.href = "index.html";// Reinicia la partida
                return;
            }
        }

        renderizar();

        if (!letrasMostradas.includes('_')) {
            registrarEstadistica("Ganada");
            alert("¡Felicidades! Has completado la palabra.");
            window.location.href = "index.html";// Reinicia la partida
        }
    };
}

// Función para registrar las estadísticas de la partida
function registrarEstadistica(resultado, almacenamiento = 'localStorage') {
    const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000); // Calcula tiempo en segundos
    const fecha = new Date().toLocaleDateString();

    const estadistica = { resultado, tiempoTranscurrido, fecha };
    const estadisticas = obtenerEstadisticas(almacenamiento);
    estadisticas.push(estadistica);

    if (almacenamiento === 'localStorage') {
        localStorage.setItem('estadisticas', JSON.stringify(estadisticas));
    } else if (almacenamiento === 'cookies') {
        setCookie('estadisticas', JSON.stringify(estadisticas), 365);
    }
}

// Función para abrir el popup de las vidas
function abrirPopup() {
    if (!win || win.closed) {
        win = window.open("./juego-popup.html", "", "popup,width=800,height=700");
        actualizarVidasPopup(vidas);
    }
}

// Función para actualizar el popup con el número de vidas restantes
function actualizarVidasPopup(vidasRestantes) {
    if (win) {
        win.postMessage({ vidas: vidasRestantes }, "*");
    }
}

// Función para obtener estadísticas de localStorage o cookies
function obtenerEstadisticas(almacenamiento = 'localStorage') {
    if (almacenamiento === 'localStorage') {
        return JSON.parse(localStorage.getItem('estadisticas')) || [];
    } else if (almacenamiento === 'cookies') {
        return JSON.parse(getCookie('estadisticas') || '[]');
    }
    return [];
}

// Función para mostrar las estadísticas en la tabla HTML
function mostrarEstadisticas(almacenamiento = 'localStorage') {
    const estadisticas = obtenerEstadisticas(almacenamiento);
    const tabla = document.getElementById('tabla-estadisticas');

    // Verifica si la tabla existe antes de intentar mostrar las estadísticas
    if (!tabla) return;

    estadisticas.forEach((estadistica) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${estadistica.resultado}</td>
            <td>${estadistica.tiempoTranscurrido} segundos</td>
            <td>${estadistica.fecha}</td>
        `;
        tabla.appendChild(fila);
    });
}

// Función auxiliar para establecer cookies
function setCookie(nombre, valor, dias) {
    const d = new Date();
    d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
    document.cookie = `${nombre}=${encodeURIComponent(valor)};expires=${d.toUTCString()};path=/`;
}

// Función auxiliar para obtener cookies
function getCookie(nombre) {
    const match = document.cookie.match(new RegExp('(^| )' + nombre + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
}

localStorage.removeItem("popupMostrado");
window.onload = () => {
    // Solo abre el popup si estamos en la página de juego
    if (displayContainer) {
        if (!localStorage.getItem("popupMostrado")) {
            abrirPopup();
            localStorage.setItem("popupMostrado", "true");
        }
        iniciarTemporizador();
        const palabra = palabra_azar(PARAULES);
        mostrarLineas(palabra);
    } else {
        mostrarEstadisticas('localStorage');
    }
};