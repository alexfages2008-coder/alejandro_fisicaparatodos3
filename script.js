// Mostrar fórmula al hacer clic en tarjeta
const cards = document.querySelectorAll('.card[data-formula]');
const formulaDisplay = document.getElementById('formulaDisplay');

cards.forEach(card => {
  card.addEventListener('click', () => {
    formulaDisplay.textContent = card.dataset.formula;
  });
});

// Chatbot funcional simple
const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.textContent = text;
  div.classList.add(sender);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateResponse(msg) {
  msg = msg.toLowerCase();

  if (msg.includes('mru')) return 'MRU: Movimiento rectilíneo uniforme, fórmula v = d / t';
  if (msg.includes('mrua')) return 'MRUA: Movimiento rectilíneo uniformemente acelerado, fórmula v = v₀ + at';
  if (msg.includes('fuerza')) return 'Fuerza: F = m · a (segunda ley de Newton)';
  if (msg.includes('energía') || msg.includes('energia')) return 'Energía cinética: Ec = ½ · m · v²';
  if (msg.includes('trabajo')) return 'Trabajo: W = F · d';
  if (msg.includes('derivada')) return 'Derivada: tasa de cambio instantánea de una función';
  if (msg.includes('integral')) return 'Integral: área bajo la curva de una función';
  if (msg.includes('hola') || msg.includes('buenas')) return '¡Hola! Pregúntame sobre física o matemáticas.';
  if (msg.includes('gracias')) return '¡De nada! Aquí estoy para ayudarte.';

  return 'Lo siento, no entiendo esa pregunta. Intenta con términos como MRU, fuerza, energía, derivada...';
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(`Tú: ${message}`, 'user');
  chatInput.value = '';

  setTimeout(() => {
    const botResponse = generateResponse(message);
    addMessage(`Bot: ${botResponse}`, 'bot');
  }, 600);
}

sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
