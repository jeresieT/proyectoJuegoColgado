window.onload = () => {
    const vidasRestantesElem = document.getElementById("vidas-restantes");
    const imagenVidas = document.getElementById("imagen-vidas");

    // Llamada inicial para mostrar la imagen de 5 vidas
    actualizarImagenVidas(5);

    window.addEventListener("message", (event) => {
        if (event.data && typeof event.data.vidas !== "undefined") {
            const vidasRestantes = event.data.vidas;
            vidasRestantesElem.textContent = `Vidas restantes: ${vidasRestantes}`;

            actualizarImagenVidas(vidasRestantes);
        }
    });
};

function actualizarImagenVidas(vidas) {
    const imagenPath = `img/perdida${vidas}.png`; 
    const imagenVidas = document.getElementById("imagen-vidas");
    imagenVidas.src = imagenPath;
}
