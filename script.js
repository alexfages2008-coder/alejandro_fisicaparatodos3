// ===============================
// ⚡ CONFIGURACIÓN GLOBAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initSmoothScroll();
    initTheme();
    initParticles();
    initPhysicsCalculator();
});

// ===============================
// 🌊 ANIMACIONES AL HACER SCROLL
// ===============================
function initScrollAnimations() {
    const elements = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(50px)";
        el.style.transition = "0.6s ease";
        observer.observe(el);
    });
}

// ===============================
// 🧭 SCROLL SUAVE
// ===============================
function initSmoothScroll() {
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute("href"));
            section.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

// ===============================
// 🌗 MODO OSCURO / CLARO
// ===============================
function initTheme() {
    const toggle = document.createElement("button");
    toggle.innerText = "🌙";
    toggle.style.position = "fixed";
    toggle.style.top = "20px";
    toggle.style.right = "20px";
    toggle.style.padding = "10px";
    toggle.style.borderRadius = "50%";
    toggle.style.border = "none";
    toggle.style.cursor = "pointer";
    toggle.style.zIndex = 999;

    document.body.appendChild(toggle);

    let darkMode = true;

    toggle.addEventListener("click", () => {
        darkMode = !darkMode;

        if (!darkMode) {
            document.body.style.background = "#f5f5f5";
            document.body.style.color = "#111";
            toggle.innerText = "☀️";
        } else {
            document.body.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
            document.body.style.color = "white";
            toggle.innerText = "🌙";
        }
    });
}

// ===============================
// ✨ PARTÍCULAS DE FONDO
// ===============================
function initParticles() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = -1;

    const ctx = canvas.getContext("2d");

    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2,
            dx: Math.random() - 0.5,
            dy: Math.random() - 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "#00e5ff";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ===============================
// 🧮 CALCULADORA DE FÍSICA
// ===============================
function initPhysicsCalculator() {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.background = "rgba(0,0,0,0.8)";
    container.style.padding = "15px";
    container.style.borderRadius = "10px";
    container.style.zIndex = 999;
    container.style.width = "250px";

    container.innerHTML = `
        <h4 style="margin-bottom:10px;">Calculadora</h4>
        <input id="mass" type="number" placeholder="Masa (kg)" style="width:100%; margin-bottom:5px;">
        <input id="velocity" type="number" placeholder="Velocidad (m/s)" style="width:100%; margin-bottom:5px;">
        <button id="calcBtn" style="width:100%;">Calcular Ec</button>
        <p id="result" style="margin-top:10px;"></p>
    `;

    document.body.appendChild(container);

    document.getElementById("calcBtn").addEventListener("click", () => {
        const m = parseFloat(document.getElementById("mass").value);
        const v = parseFloat(document.getElementById("velocity").value);

        if (isNaN(m) || isNaN(v)) {
            document.getElementById("result").innerText = "Datos inválidos";
            return;
        }

        const Ec = 0.5 * m * v * v;

        document.getElementById("result").innerText = `Energía: ${Ec.toFixed(2)} J`;
    });
}

// ===============================
// 🖱️ EFECTO INTERACTIVO DEL RATÓN
// ===============================
document.addEventListener("mousemove", (e) => {
    const glow = document.createElement("div");
    glow.style.position = "fixed";
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
    glow.style.width = "10px";
    glow.style.height = "10px";
    glow.style.background = "#00e5ff";
    glow.style.borderRadius = "50%";
    glow.style.pointerEvents = "none";
    glow.style.opacity = 0.7;

    document.body.appendChild(glow);

    setTimeout(() => glow.remove(), 300);

    
});
// ===============================
// 🧠 QUIZ DE FÍSICA INTERACTIVO
// ===============================
function initQuiz() {
    const quizContainer = document.createElement("div");
    quizContainer.style.position = "fixed";
    quizContainer.style.left = "20px";
    quizContainer.style.bottom = "20px";
    quizContainer.style.width = "300px";
    quizContainer.style.background = "rgba(0,0,0,0.85)";
    quizContainer.style.padding = "20px";
    quizContainer.style.borderRadius = "15px";
    quizContainer.style.zIndex = "999";

    document.body.appendChild(quizContainer);

    const questions = [
        {
            q: "¿Cuál es la fórmula de la energía cinética?",
            options: ["E = mc²", "Ec = ½mv²", "F = ma"],
            correct: 1
        },
        {
            q: "¿Qué magnitud mide el Newton?",
            options: ["Energía", "Fuerza", "Velocidad"],
            correct: 1
        },
        {
            q: "¿Quién formuló la relatividad?",
            options: ["Newton", "Einstein", "Tesla"],
            correct: 1
        }
    ];

    let current = 0;
    let score = 0;

    function loadQuestion() {
        const q = questions[current];

        quizContainer.innerHTML = `
            <h4>Quiz de Física</h4>
            <p>${q.q}</p>
            ${q.options.map((opt, i) => `
                <button class="quiz-btn" data-index="${i}" style="display:block; margin:5px 0; width:100%;">
                    ${opt}
                </button>
            `).join("")}
            <p id="feedback"></p>
        `;

        document.querySelectorAll(".quiz-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const selected = parseInt(btn.dataset.index);

                if (selected === q.correct) {
                    score++;
                    document.getElementById("feedback").innerText = "✅ Correcto";
                } else {
                    document.getElementById("feedback").innerText = "❌ Incorrecto";
                }

                setTimeout(() => {
                    current++;
                    if (current < questions.length) {
                        loadQuestion();
                    } else {
                        showResult();
                    }
                }, 1000);
            });
        });
    }

    function showResult() {
        quizContainer.innerHTML = `
            <h4>Resultado</h4>
            <p>Puntuación: ${score}/${questions.length}</p>
            <button id="restartQuiz">Reintentar</button>
        `;

        document.getElementById("restartQuiz").addEventListener("click", () => {
            current = 0;
            score = 0;
            loadQuestion();
        });
    }

    loadQuestion();
}

// ===============================
// 🚀 INICIALIZAR QUIZ
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    initQuiz();
});
