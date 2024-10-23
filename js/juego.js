window.onload = () => {
    // Guardem una referencia de l'input de l'HTML
    let input = document.getElementById("in-text");

    // Obrim un popup
    let win = window.open("./lectura.html", "", "popup,width=500,height=500");


    // Enviem el text escrit dins l'input si l'usuari clica al botó
    document.getElementById("send").addEventListener("click", () => {

        win.postMessage(input.value, "http://127.0.0.1:5501");

    })

}