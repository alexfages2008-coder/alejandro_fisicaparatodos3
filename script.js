// ===============================
// 🚀 APP INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

const App = {
    init() {
        this.cacheDOM();
        this.initScrollAnimations();
        this.initSmoothScroll();
        this.initTheme();
        this.initParticles();
        this.initPhysicsCalculator();
        this.initQuiz();
        this.initChatbot(); // 🤖 añadido
    },

    cacheDOM() {
        this.body = document.body;
    },

// ===============================
// 🌊 SCROLL ANIMATIONS
// ===============================
    initScrollAnimations() {
        const elements = document.querySelectorAll(".card");

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.2 });

        elements.forEach(el => {
            el.classList.add("hidden");
            observer.observe(el);
        });
    },

// ===============================
// 🧭 SCROLL SUAVE
// ===============================
    initSmoothScroll() {
        document.querySelectorAll("nav a").forEach(anchor => {
            anchor.addEventListener("click", e => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute("href"));
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    },

// ===============================
// 🌗 THEME
// ===============================
    initTheme() {
        const toggle = document.createElement("button");
        toggle.className = "theme-toggle";
        document.body.appendChild(toggle);

        let darkMode = localStorage.getItem("theme") !== "light";

        const updateUI = () => {
            document.body.classList.toggle("light-mode", !darkMode);
            toggle.textContent = darkMode ? "🌙" : "☀️";
        };

        updateUI();

        toggle.addEventListener("click", () => {
            darkMode = !darkMode;
            localStorage.setItem("theme", darkMode ? "dark" : "light");
            updateUI();
        });
    },

// ===============================
// ✨ PARTÍCULAS
// ===============================
    initParticles() {
        const canvas = document.createElement("canvas");
        canvas.className = "particles";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let mouse = { x: null, y: null };

        window.addEventListener("mousemove", e => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        const resize = () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const particles = Array.from({ length: 100 }, () => ({
            x: Math.random() * innerWidth,
            y: Math.random() * innerHeight,
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5
        }));

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

                if (mouse.x && Math.hypot(p.x - mouse.x, p.y - mouse.y) < 100) {
                    p.x += (p.x - mouse.x) * 0.02;
                    p.y += (p.y - mouse.y) * 0.02;
                }

                ctx.fillStyle = "#00e5ff";
                ctx.fillRect(p.x, p.y, 2, 2);
            });

            requestAnimationFrame(animate);
        }

        animate();
    },

// ===============================
// 🧮 CALCULADORA
// ===============================
    initPhysicsCalculator() {
        const box = document.createElement("div");
        box.className = "calculator";

        box.innerHTML = `
            <h4>⚡ Energía Cinética</h4>
            <input id="m" type="number" placeholder="Masa (kg)">
            <input id="v" type="number" placeholder="Velocidad (m/s)">
            <button id="calc">Calcular</button>
            <p id="res"></p>
        `;

        document.body.appendChild(box);

        const mInput = box.querySelector("#m");
        const vInput = box.querySelector("#v");
        const res = box.querySelector("#res");

        box.querySelector("#calc").addEventListener("click", () => {
            const m = parseFloat(mInput.value);
            const v = parseFloat(vInput.value);

            if (isNaN(m) || isNaN(v) || m <= 0 || v <= 0) {
                res.textContent = "❌ Introduce valores válidos";
                res.style.color = "red";
                return;
            }

            const energy = 0.5 * m * v ** 2;

            res.textContent = `⚡ ${energy.toFixed(2)} Joules`;
            res.style.color = "#00e5ff";
        });
    },

// ===============================
// 🧠 QUIZ
// ===============================
    initQuiz() {
        const container = document.getElementById("quiz-container");
        if (!container) return;

        const questions = [
            { q: "¿Fórmula de energía cinética?", options: ["E=mc²", "½mv²", "F=ma"], correct: 1 },
            { q: "Unidad de fuerza:", options: ["Joule", "Newton", "Watt"], correct: 1 },
            { q: "Autor de la relatividad:", options: ["Newton", "Einstein", "Galileo"], correct: 1 }
        ];

        let i = 0, score = 0;

        const render = () => {
            const q = questions[i];

            container.innerHTML = `
                <div class="quiz-box fade">
                    <h3>${q.q}</h3>
                    <div class="quiz-options">
                        ${q.options.map((o, idx) =>
                            `<button class="quiz-btn" data-i="${idx}">${o}</button>`
                        ).join("")}
                    </div>
                    <div class="progress">${i + 1}/${questions.length}</div>
                </div>
            `;

            container.querySelectorAll(".quiz-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    const ans = +btn.dataset.i;
                    btn.classList.add(ans === q.correct ? "correct" : "wrong");
                    if (ans === q.correct) score++;

                    setTimeout(() => {
                        i++;
                        i < questions.length ? render() : showResult();
                    }, 700);
                });
            });
        };

        const showResult = () => {
            container.innerHTML = `
                <div class="quiz-box">
                    <h2>🏆 ${score}/${questions.length}</h2>
                    <p>${score === 3 ? "💯 Perfecto!" : score === 2 ? "🔥 Muy bien!" : "💡 Sigue aprendiendo!"}</p>
                    <button id="retry">Reintentar</button>
                </div>
            `;

            container.querySelector("#retry").onclick = () => {
                i = 0;
                score = 0;
                render();
            };
        };

        render();
    },

// ===============================
// 🤖 CHATBOT
// ===============================
    initChatbot() {
        const chatbox = document.getElementById("chatbox");
        const input = document.getElementById("userInput");
        const button = document.querySelector("#chatbot button");

        if (!chatbox || !input || !button) return;

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;

            chatbox.innerHTML += `<p class="user">Tú: ${text}</p>`;

            const response = this.getResponse(text.toLowerCase());

            setTimeout(() => {
                chatbox.innerHTML += `<p class="bot">Bot: ${response}</p>`;
                chatbox.scrollTop = chatbox.scrollHeight;
            }, 400);

            input.value = "";
        };

        button.addEventListener("click", sendMessage);

        input.addEventListener("keypress", e => {
            if (e.key === "Enter") sendMessage();
        });
    },

    getResponse(input) {
        if (input.includes("velocidad")) return "v = d/t";
        if (input.includes("aceleracion") || input.includes("aceleración")) return "a = Δv/t";
        if (input.includes("newton")) return "F = m · a";
        if (input.includes("energia") || input.includes("energía")) return "E = ½mv² o mgh";
        if (input.includes("ohm")) return "V = I · R";

        return "Pregunta sobre física (velocidad, energía, fuerzas...) 🤖";
    }
};
