// ==========================================
// CONFIGURATION & INITIAL STATE
// ==========================================
// Fecha desde que empezaron a hablar
const fechaInicio = new Date("2025-11-01T00:00:00");

const musica = document.getElementById("musica");
const musicIndicator = document.getElementById("music-indicator");
let musicaIniciada = false;

// ==========================================
// BIENVENIDA (WELCOME ALERT)
// ==========================================
window.onload = () => {
    setTimeout(() => {
        alert("💙 Feliz cumpleaños, mi monita. Espero que este pequeño detalle te saque una sonrisa. Con cariño, Jeferson 💙");
    }, 1200);
};

// ==========================================
// MUSIC PLAYBACK CONTROL
// ==========================================
function iniciarMusica() {
    if (musicaIniciada) return;
    
    musica.play().then(() => {
        musicaIniciada = true;
        musicIndicator.classList.remove('hidden');
        musicIndicator.classList.add('playing');
    }).catch(err => {
        console.log("Esperando interacción de usuario para reproducir audio...", err);
    });
}

function toggleMusica() {
    if (musica.paused) {
        musica.play();
        musicIndicator.classList.add('playing');
    } else {
        musica.pause();
        musicIndicator.classList.remove('playing');
    }
}

// ==========================================
// ABRIR CARTA (OPEN LETTER)
// ==========================================
function abrirCarta() {
    const carta = document.getElementById("carta");
    
    // Revelar la carta (soporta tanto clases CSS como display inline)
    carta.classList.remove("oculto");
    carta.style.display = "block";

    // Scroll suave a la carta
    carta.scrollIntoView({
        behavior: "smooth"
    });

    // Iniciar y actualizar estado de la música
    iniciarMusica();
    if (musica.paused && musicaIniciada) {
        musica.play().catch(() => {});
        musicIndicator.classList.add('playing');
    }

    // Confeti sutil al abrir la carta
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#2196f3', '#79d4ff', '#ffffff', '#0d2c63']
        });
    }

    // Cambiar texto del botón
    const btnRegalo = document.getElementById('btn-regalo');
    if (btnRegalo) {
        btnRegalo.innerHTML = "¡Regalo Abierto! 💌";
    }
}

// ==========================================
// CONTADOR (RELATIONSHIP TIMER)
// ==========================================
function actualizarContador() {
    const ahora = new Date();
    let diferencia = ahora - fechaInicio;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const meses = Math.floor(dias / 30);
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();

    // Mantener exactamente la estructura de texto y emojis proporcionada
    document.getElementById("contador").innerHTML = `
        💙 ${meses} meses <br><br>
        📅 ${dias} días <br><br>
        🕒 ${horas} horas <br><br>
        ⏱️ ${minutos} minutos
    `;
}

// Iniciar contador
setInterval(actualizarContador, 1000);
actualizarContador();

// ==========================================
// CORAZONES FLOTANDO (HEARTS RAIN)
// ==========================================
setInterval(() => {
    const corazon = document.createElement("div");
    corazon.className = "corazon";
    corazon.innerHTML = "💙";

    // Posición y tamaño aleatorios provistos por el usuario
    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.fontSize = (20 + Math.random() * 30) + "px";

    // Drift side-to-side para más fluidez estética
    const drift = (Math.random() * 60 - 30) + "px";
    const driftEnd = (Math.random() * 120 - 60) + "px";
    corazon.style.setProperty('--drift', drift);
    corazon.style.setProperty('--drift-end', driftEnd);

    document.body.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, 7000);
}, 400);

// Spawnea corazones flotantes interactivos adicionales al hacer click en el fondo
document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && !e.target.closest('.music-indicator') && !e.target.closest('.imagenes img')) {
        const clickCorazon = document.createElement('div');
        clickCorazon.className = 'corazon';
        clickCorazon.innerHTML = '💙';
        clickCorazon.style.left = e.clientX + 'px';
        clickCorazon.style.top = e.clientY + 'px';
        
        // Ajustes de animación rápidos para click
        clickCorazon.style.animation = 'float-up 4s linear forwards';
        const drift = (Math.random() * 80 - 40) + 'px';
        const driftEnd = (Math.random() * 160 - 80) + 'px';
        clickCorazon.style.setProperty('--drift', drift);
        clickCorazon.style.setProperty('--drift-end', driftEnd);
        
        document.body.appendChild(clickCorazon);
        setTimeout(() => clickCorazon.remove(), 4000);
    }
});

// ==========================================
// CONFETTI + SORPRESA
// ==========================================
function sorpresa() {
    document.getElementById("mensajeFinal").style.display = "block";

    // Confetti exacto provisto por el usuario
    confetti({
        particleCount: 180,
        spread: 180,
        origin: { y: .6 }
    });

    document.getElementById("mensajeFinal").scrollIntoView({
        behavior: "smooth"
    });

    // Iniciar música si estaba en pausa
    iniciarMusica();
    if (musica.paused && musicaIniciada) {
        toggleMusica();
    }
}

// ==========================================
// ZOOM DE IMÁGENES
// ==========================================
document.querySelectorAll(".imagenes img").forEach(img => {
    img.addEventListener("click", () => {
        if (img.style.transform === "scale(1.4)") {
            img.style.transform = "scale(1)";
            img.style.zIndex = "1";
        } else {
            // Resetear cualquier otra imagen que pueda estar en zoom primero
            document.querySelectorAll(".imagenes img").forEach(otherImg => {
                otherImg.style.transform = "scale(1)";
                otherImg.style.zIndex = "1";
            });
            
            img.style.transform = "scale(1.4)";
            img.style.zIndex = "999";
        }
    });
});

// ==========================================
// IMAGEN FALLBACK HANDLER (MANEJO DE ERRORES)
// ==========================================
function handleImageError(imgElement, imageNumber) {
    const cardContainer = imgElement.parentElement;
    
    // Crear placeholder para fotos no cargadas
    const placeholderHTML = `
        <div class="polaroid-placeholder" style="cursor: default;">
            <svg viewBox="0 0 24 24" style="width: 44px; height: 44px; margin-bottom: 12px; fill: #e53e3e; animation: heart-pulse 2s infinite ease-in-out;">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span style="font-size: 0.85rem; font-weight: 500; color: #4a5568;">Foto ${imageNumber} pendiente</span>
            <span style="font-size: 0.7rem; opacity: 0.6; color: #718096; margin-top: 6px; font-family: monospace;">img/foto${imageNumber}.jpg</span>
        </div>
    `;
    
    // Ocultar imagen rota e insertar placeholder
    imgElement.style.display = 'none';
    cardContainer.insertBefore(document.createRange().createContextualFragment(placeholderHTML), cardContainer.firstChild);
}

// ==========================================
// BACKGROUND DYNAMIC STARS (ESTRELLAS ADICIONALES)
// ==========================================
function crearEstrellasFondo() {
    const body = document.body;
    const totalEstrellas = 30;
    
    for (let i = 0; i < totalEstrellas; i++) {
        const estrella = document.createElement('div');
        estrella.className = 'star-particle';
        
        estrella.style.top = Math.random() * 100 + 'vh';
        estrella.style.left = Math.random() * 100 + 'vw';
        
        const tamano = Math.random() * 3 + 1;
        estrella.style.width = tamano + 'px';
        estrella.style.height = tamano + 'px';
        estrella.style.setProperty('--opacity', Math.random() * 0.6 + 0.3);
        estrella.style.setProperty('--duration', (Math.random() * 4 + 2) + 's');
        
        body.appendChild(estrella);
    }
}
crearEstrellasFondo();
