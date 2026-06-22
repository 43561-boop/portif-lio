/* ============================================================
   DAVI NORIYASU KUSUMI — PORTFOLIO
   script.js · Sem frameworks, HTML/CSS/JS puro
   ============================================================ */

'use strict';

// ============================================================
// CURSOR PERSONALIZADO
// ============================================================
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let rafId;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Cursor ring com lag suave
function animateRing() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  rafId = requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect no cursor
document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card, .achievement').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});


// ============================================================
// CANVAS DE PARTÍCULAS
// ============================================================
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const COUNT = 70;
  const COLORS = ['rgba(0,212,255,', 'rgba(139,92,246,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  for (let i = 0; i < COUNT; i++) particles.push(createParticle());

  // Conexão entre partículas próximas
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 120) * 0.12;
          ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0)  p.x = W;
      if (p.x > W)  p.x = 0;
      if (p.y < 0)  p.y = H;
      if (p.y > H)  p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    requestAnimationFrame(loop);
  }

  loop();
})();


// ============================================================
// NAVBAR SCROLL
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ============================================================
// MENU MOBILE
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fechar menu ao clicar em link
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ============================================================
// DIGITAÇÃO HERO
// ============================================================
(function typewriter() {
  const phrases = [
    'Aprendendo Python...',
    'Construindo projetos...',
    'Evoluindo como desenvolvedor...',
    'Sempre aprendendo algo novo...',
    'Transformando ideias em código...',
  ];

  const el = document.getElementById('typing-text');
  if (!el) return;

  let phraseIdx = 0, charIdx = 0, deleting = false;
  const DELAY_TYPE = 65;
  const DELAY_DELETE = 35;
  const DELAY_PAUSE = 1800;
  const DELAY_NEXT = 400;

  function type() {
    const phrase = phrases[phraseIdx];

    if (deleting) {
      el.textContent = phrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = phrase.substring(0, charIdx + 1);
      charIdx++;
    }

    if (!deleting && charIdx === phrase.length) {
      setTimeout(() => { deleting = true; type(); }, DELAY_PAUSE);
      return;
    }

    if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, DELAY_NEXT);
      return;
    }

    setTimeout(type, deleting ? DELAY_DELETE : DELAY_TYPE);
  }

  setTimeout(type, 800);
})();


// ============================================================
// FADE-IN COM INTERSECTION OBSERVER
// ============================================================
(function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();


// ============================================================
// ANIMAÇÃO DAS BARRAS DE SKILL
// ============================================================
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(el => observer.observe(el));
})();


// ============================================================
// TERMINAL INTERATIVO
// ============================================================
(function initTerminal() {
  const input  = document.getElementById('term-input');
  const output = document.getElementById('terminal-output');
  const body   = document.getElementById('terminal-body');

  if (!input) return;

  // Histórico de comandos
  let history = [], histIdx = -1;

  // Banco de respostas
  const commands = {
    whoami: () => `<span class="term-result">
  Davi Noriyasu Kusumi
  Idade: 16 anos
  Cidade: Campinas, SP — Brasil
  Status: Estudante | Programador em formação
</span>`,

    skills: () => `<span class="term-result">
  Linguagens:
    ● Python       ████████░░  aprendendo
    ● HTML         █████████░  desenvolvendo
    ● CSS          ████████░░  desenvolvendo
    ● JavaScript   ██████░░░░  iniciando

  Ferramentas:
    ● Git / GitHub ███████░░░  usando
    ● VS Code      ██████████  favorito
</span>`,

    goals: () => `<span class="term-result">
  [ ] Evoluir como desenvolvedor
  [ ] Criar projetos relevantes
  [ ] Conquistar um estágio
  [ ] Dominar Python e Front-end
  [ ] Tornar-se desenvolvedor Full Stack
</span>`,

    projects: () => `<span class="term-result">
  1. Gladiatus
     Linguagem: Python
     Status: ativo
     Link: github.com/43561-boop/Gladiatus

  2. ??? [em desenvolvimento]
</span>`,

    contact: () => `<span class="term-result">
  GitHub:   github.com/43561-boop
  Email:    seuemail@email.com
  LinkedIn: em breve...
</span>`,

    help: () => `<span class="term-result">
  Comandos disponíveis:

  whoami    →  quem sou eu
  skills    →  minhas habilidades
  goals     →  meus objetivos
  projects  →  meus projetos
  contact   →  como me contatar
  clear     →  limpar terminal
  help      →  esta mensagem
</span>`,

    clear: () => {
      output.innerHTML = '';
      return null;
    },

    // Easter eggs
    'sudo rm -rf /': () => `<span class="term-error">
  Acesso negado. 😄 Bom tentar!
</span>`,

    hello: () => `<span class="term-result">
  Olá! Seja bem-vindo ao portfólio de Davi.
  Digite 'help' para ver os comandos.
</span>`,

    python: () => `<span class="term-result">
  &gt;&gt;&gt; print("Hello, World!")
  Hello, World!

  Python é minha linguagem favorita. 🐍
</span>`,
  };

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Adiciona ao histórico
    history.unshift(raw);
    if (history.length > 20) history.pop();
    histIdx = -1;

    // Exibe o comando
    output.innerHTML += `<div class="term-prompt-line">davi@portfolio:~$ <span class="term-cmd">${escapeHTML(raw)}</span></div>`;

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result !== null) {
        output.innerHTML += `<div>${result}</div>`;
      }
    } else {
      output.innerHTML += `<div class="term-error">  Comando não encontrado: '${escapeHTML(cmd)}'. Digite 'help' para ajuda.</div>`;
    }

    output.innerHTML += '<br/>';
    body.scrollTop = body.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // Enter para executar
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      runCommand(input.value);
      input.value = '';
    }

    // Histórico com setas
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) {
        histIdx++;
        input.value = history[histIdx];
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        histIdx--;
        input.value = history[histIdx];
      } else {
        histIdx = -1;
        input.value = '';
      }
    }
  });

  // Botões de hint
  document.querySelectorAll('.hint-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.cmd;
      runCommand(input.value);
      input.value = '';
      input.focus();
    });
  });

  // Focar input ao clicar no terminal
  document.querySelector('.terminal')?.addEventListener('click', () => input.focus());

  // Comando inicial automático para dar boas-vindas
  setTimeout(() => {
    runCommand('whoami');
  }, 600);
})();


// ============================================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // altura do navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ============================================================
// EFEITO PARALLAX SUAVE NO HERO
// ============================================================
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
      heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
    }
  }, { passive: true });
})();


// ============================================================
// ACTIVE NAV LINK NO SCROLL
// ============================================================
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();
