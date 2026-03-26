// ===============================
// 🚀 INICIO GLOBAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initSmoothScroll();
    initTheme();
    initParticles();
    initPhysicsCalculator();
    initQuiz(); // NUEVO
});

// ===============================
// 🌊 ANIMACIONES
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
    });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(50px)";
        el.style.transition = "0.6s";
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
            document.querySelector(this.getAttribute("href"))
                .scrollIntoView({ behavior: "smooth" });
        });
    });
}

// ===============================
// 🌗 MODO OSCURO
// ===============================
function initTheme() {
    const toggle = document.createElement("button");
    toggle.innerText = "🌙";
    toggle.className = "theme-toggle";
    document.body.appendChild(toggle);

    let darkMode = true;

    toggle.onclick = () => {
        darkMode = !darkMode;

        document.body.classList.toggle("light-mode");

        toggle.innerText = darkMode ? "🌙" : "☀️";
    };
}

// ===============================
// ✨ PARTÍCULAS
// ===============================
function initParticles() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    let particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        dx: Math.random() - 0.5,
        dy: Math.random() - 0.5
    }));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;

            ctx.fillStyle = "#00e5ff";
            ctx.fillRect(p.x, p.y, 2, 2);
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ===============================
// 🧮 CALCULADORA
// ===============================
function initPhysicsCalculator() {
    const box = document.createElement("div");
    box.className = "calculator";

    box.innerHTML = `
        <h4>Calculadora</h4>
        <input id="m" placeholder="Masa">
        <input id="v" placeholder="Velocidad">
        <button id="calc">Calcular</button>
        <p id="res"></p>
    `;

    document.body.appendChild(box);

    document.getElementById("calc").onclick = () => {
        let m = parseFloat(document.getElementById("m").value);
        let v = parseFloat(document.getElementById("v").value);

        if (!m || !v) {
            res.innerText = "Datos inválidos";
            return;
        }

        res.innerText = "E = " + (0.5 * m * v * v).toFixed(2) + " J";
    };
}

// ===============================
// 🧠 QUIZ INTERACTIVO (PRO)
// ===============================
function initQuiz() {
    const container = document.getElementById("quiz-container");

    const questions = [
        {
            q: "¿Fórmula de energía cinética?",
            options: ["E=mc²", "½mv²", "F=ma"],
            correct: 1
        },
        {
            q: "Unidad de fuerza:",
            options: ["Joule", "Newton", "Watt"],
            correct: 1
        },
        {
            q: "Autor de la relatividad:",
            options: ["Newton", "Einstein", "Galileo"],
            correct: 1
        }
    ];

    let i = 0;
    let score = 0;

    function load() {
        let q = questions[i];

        container.innerHTML = `
            <div class="quiz-box">
                <h3>${q.q}</h3>
                ${q.options.map((o, idx) =>
                    `<button class="quiz-btn" data-i="${idx}">${o}</button>`
                ).join("")}
                <p id="feedback"></p>
            </div>
        `;

        document.querySelectorAll(".quiz-btn").forEach(btn => {
            btn.onclick = () => {
                let ans = parseInt(btn.dataset.i);

                if (ans === q.correct) {
                    score++;
                    feedback.innerText = "✅ Correcto";
                } else {
                    feedback.innerText = "❌ Incorrecto";
                }

                setTimeout(() => {
                    i++;
                    i < questions.length ? load() : result();
                }, 800);
            };
        });
    }

    function result() {
        container.innerHTML = `
            <div class="quiz-box">
                <h3>Puntuación: ${score}/${questions.length}</h3>
                <button id="retry">Reintentar</button>
            </div>
        `;

        document.getElementById("retry").onclick = () => {
            i = 0;
            score = 0;
            load();
        };
    }

    load();
}
