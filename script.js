// =======================
// CONTENIDO DINÁMICO
// =======================

const formulas = {
  "mru": "MRU: v = d / t",
  "mrua": "MRUA: v = v0 + at",
  "energia": "Energía cinética: Ec = 1/2 · m · v²",
  "fuerza": "Fuerza: F = m · a",
  "trabajo": "Trabajo: W = F · d · cos(θ)",
  "gravitacion": "Ley de gravitación: F = G · (m1·m2) / r²"
};

function mostrarFormula(tipo) {
  const resultado = document.getElementById("resultadoFormula");
  if (formulas[tipo]) {
    resultado.innerText = formulas[tipo];
  } else {
    resultado.innerText = "Fórmula no encontrada";
  }
}

// =======================
// CHATBOT SIMPLE
// =======================

function enviarMensaje() {
  const input = document.getElementById("inputChat");
  const chat = document.getElementById("chatBox");

  const mensaje = input.value.toLowerCase();

  if (mensaje.trim() === "") return;

  agregarMensaje("Tú", mensaje);

  let respuesta = generarRespuesta(mensaje);

  setTimeout(() => {
    agregarMensaje("Bot", respuesta);
  }, 500);

  input.value = "";
}

// =======================
// RESPUESTAS DEL BOT
// =======================

function generarRespuesta(msg) {

  // Física
  if (msg.includes("mru")) {
    return "MRU: velocidad constante. Fórmula: v = d/t";
  }

  if (msg.includes("mrua")) {
    return "MRUA: hay aceleración. Fórmula: v = v0 + at";
  }

  if (msg.includes("fuerza")) {
    return "La fuerza se calcula con F = m · a";
  }

  if (msg.includes("energia")) {
    return "Energía cinética: Ec = 1/2 · m · v²";
  }

  if (msg.includes("gravedad")) {
    return "Ley de gravitación universal: F = G·(m1·m2)/r²";
  }

  // Matemáticas
  if (msg.includes("derivada")) {
    return "Una derivada mide la variación de una función.";
  }

  if (msg.includes("integral")) {
    return "Una integral calcula el área bajo la curva.";
  }

  if (msg.includes("ecuacion")) {
    return "Una ecuación es una igualdad con incógnitas.";
  }

  // Saludos
  if (msg.includes("hola")) {
    return "¡Hola! Pregúntame sobre física o matemáticas.";
  }

  if (msg.includes("gracias")) {
    return "¡De nada! 😄";
  }

  return "No estoy seguro. Intenta preguntar sobre fórmulas, MRU, energía, derivadas...";
}

// =======================
// MOSTRAR MENSAJES
// =======================

function agregarMensaje(usuario, texto) {
  const chat = document.getElementById("chatBox");

  const mensaje = document.createElement("div");
  mensaje.innerHTML = `<strong>${usuario}:</strong> ${texto}`;

  chat.appendChild(mensaje);
  chat.scrollTop = chat.scrollHeight;
}

// =======================
// ENTER PARA ENVIAR
// =======================

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputChat");

  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      enviarMensaje();
    }
  });
});
