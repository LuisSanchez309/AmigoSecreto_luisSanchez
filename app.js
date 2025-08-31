// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
//declaracion de arrays
// Lista principal de amigos y lista de los que ya fueron sorteados
let amigos = [];
let amigosSeleccionados = [];

//para mostrar una notificacion en la pantalla
function mostrarNotificacion(mensaje) {
    const contenedor = document.getElementById("notificaciones");
    const notificacion = document.createElement("div");
    notificacion.classList.add("notificacion");

    notificacion.innerHTML = `
        <span>${mensaje}</span>
        <button class="cerrar-notificacion" onclick="this.parentElement.remove()">✖</button>
    `;

    contenedor.appendChild(notificacion);
    //se cierra automaticamente despues de 3seg
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

//Agrega un nuevo amigo a la lista
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    //valida si esta vacio
    if (nombre === "") {
        mostrarNotificacion("Por favor, escribe un nombre.");
        return;
    }
    //valida que sea letras   
    const soloTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloTexto.test(nombre)) {
        mostrarNotificacion("El nombre solo puede contener letras y espacios.");
        return;
    }
    //si el nombre habia sido agregado anteriormente
    if (amigos.includes(nombre)) {
        mostrarNotificacion("Ese nombre ya fue agregado.");
        return;
    }
    //Agrega un nuevo amigo a la lista
    amigos.push(nombre);
    input.value = "";
    actualizarLista();
    mostrarNotificacion("Amigo agregado con éxito.");
}

//Actualiza visualmente la lista de amigos en pantalla.
function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((nombre) => {
        const li = document.createElement("li");
        li.textContent = nombre;
        //valida si esta sorteado ya ese nombre
        if (amigosSeleccionados.includes(nombre)) {
            li.style.textDecoration = "line-through";
            li.style.color = "#888";
        }

        lista.appendChild(li);
    });
}

//relaliza el sorteo de amigos
function sortearAmigo() {
    if (amigos.length === 0) {
        mostrarNotificacion("La lista está vacía, agrega amigos primero.");
        return;
    }

    const disponibles = amigos.filter((n) => !amigosSeleccionados.includes(n));
    //valida si todos los amigos ya fueron sorteados
    if (disponibles.length === 0) {
        mostrarNotificacion("Todos los amigos ya fueron sorteados.");
        cambiarBotonANuevo();
        return;
    }

    const indice = Math.floor(Math.random() * disponibles.length);
    const elegido = disponibles[indice];

    amigosSeleccionados.push(elegido);
    document.getElementById("resultado").innerHTML = `🎉 El amigo secreto es: <strong>${elegido}</strong> 🎉`;
    mostrarNotificacion(`El amigo secreto es: ${elegido}`);

    actualizarLista();

    if (amigosSeleccionados.length === amigos.length) {
        mostrarNotificacion("Se han sorteado todos los amigos. Fin del juego.");
        cambiarBotonANuevo();
    }
}

//Cambia el botón de sorteo a la opción de reiniciar el juego.
 
function cambiarBotonANuevo() {
    const boton = document.querySelector(".button-draw");
    boton.textContent = "Nuevo Sorteo";
    boton.onclick = reiniciarJuego;

    const icono = document.createElement("img");
    icono.src = "assets/reiniciar.png";
    icono.alt = "Ícono reinicio";
    boton.prepend(icono);
}

//Restablece todos los valores para iniciar un nuevo juego.
 
function reiniciarJuego() {
    amigos = [];
    amigosSeleccionados = [];
    document.getElementById("amigo").disabled = false;
    document.querySelector(".button-add").disabled = false;
    document.getElementById("amigo").value = "";
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    const boton = document.querySelector(".button-draw");
    boton.textContent = "Sortear amigo";
    boton.onclick = sortearAmigo;

    const icono = document.createElement("img");
    icono.src = "assets/play_circle_outline.png";
    icono.alt = "Ícono sorteo";
    boton.prepend(icono);

    mostrarNotificacion("Se ha reiniciado el juego.");
}
