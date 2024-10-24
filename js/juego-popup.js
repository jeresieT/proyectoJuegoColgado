window.onload = () => {
    let text = document.getElementById("mostrar");

    // Escoltem missatges enviats a la finestra
    window.addEventListener("mostrar", (e) => {

        // Ens assegurem que el missatge ve del mateix origen al que estem
        if (e.origin == "http://127.0.0.1:5500") {
            console.log(e);
            text.innerText += e.data + "\n";
        }

    })
}