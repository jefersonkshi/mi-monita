// Contador de tiempo
const fechaInicio = new Date("2025-11-01T00:00:00");

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    const elementos = document.getElementsByTagName("p");
    let elementoContador = null;

    for (let el of elementos) {
        if (el.textContent.includes("Calculando el tiempo...") || el.textContent.includes("días")) {
            elementoContador = el;
            break;
        }
    }

    if (!elementoContador) return;

    if (diferencia < 0) {
        elementoContador.innerHTML = "<strong>¡Llegó el día! 💙</strong>";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    elementoContador.innerHTML = `<strong>${dias}</strong> días, <strong>${horas}</strong> horas, <strong>${minutos}</strong> minutos y <strong>${segundos}</strong> segundos`;
}

setInterval(actualizarContador, 1000);
actualizarContador();

// Función del botón "Abrir mi regalo"
function sorpresa() {
    const mensaje = document.getElementById("mensajeFinal");
    const audio = document.getElementById("musica");
    
    if (audio) {
        audio.play().catch(e => console.log("Audio bloqueado o cargando"));
    }
    
    if (mensaje) {
        mensaje.style.display = "block";
        mensaje.scrollIntoView({ behavior: 'smooth' });
    }
}
