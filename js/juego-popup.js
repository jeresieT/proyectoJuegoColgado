window.onload = () => {
    window.addEventListener("message", (event) => {
        // Asegúrate de que el mensaje sea sobre las vidas
        if (event.data && typeof event.data.vidas !== "undefined") {
            const vidasRestantes = event.data.vidas;
            document.getElementById("vidas-restantes").textContent = `Vidas restantes: ${vidasRestantes}`;
        }
    });
    
    
}