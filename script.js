// mapeamento básico de algumas cores
const questions = [
  {
    key: "style",
    title: "1. Qual estilo combina mais com você?",
    options: [
      {
        label: "Moderno & Minimalista",
        value: "moderno",
        desc: "Design limpo, focado na experiência do usuário",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/84373e74-172c-467b-b3c2-d599a94b762e.png",
      },
      {
        label: "Retrô & Descontraído",
        value: "retro",
        desc: "Anos 90 vibes com fontes pixeladas",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c52c1cbd-be23-4039-b41e-a062b8519d7a.png",
      },
      {
        label: "Artístico & Criativo",
        value: "artistico",
        desc: "Quebrando padrões com design ousado",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d6d2c016-e7b3-41f1-8063-16fbd2d969df.png",
      },
      {
        label: "Técnico & Informativo",
        value: "tecnico",
        desc: "Dados, gráficos e informações precisas",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/666766cb-c572-497b-911f-c693ce5ba407.png",
      },
    ],
  },
  {
    key: "function",
    title: "2. Qual seria sua função principal?",
    options: [
      {
        label: "Prover Diversão",
        value: "diversao",
        desc: "Jogos, memes e conteúdo leve",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1a84cd7e-bb32-42b5-876d-29fa11e7e3cb.png",
      },
      {
        label: "Compartilhar Conhecimento",
        value: "conhecimento",
        desc: "Tutoriais, artigos e aprendizado",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1c36a9a9-9d8d-408c-aa42-2ce8c41fccdb.png",
      },
      {
        label: "Conectar Pessoas",
        value: "conexao",
        desc: "Rede social ou comunidade",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aa4aab0e-9e81-41e7-9509-28bd23996b19.png",
      },
      {
        label: "Resolver Problemas",
        value: "utilidade",
        desc: "Ferramentas e utilidades práticas",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9efa3e16-78fc-44b2-bc95-5f942ca6aa8b.png",
      },
    ],
  },
  {
    key: "bug",
    title: "3. Qual seria seu bug mais charmoso?",
    options: [
      {
        label: "Carregar pra sempre",
        value: "carregamento",
        desc: "Spinner infinito de paciência",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c1513165-bccd-4853-aa91-2b1851981fb4.png",
      },
      {
        label: "Comportamento aleatório",
        value: "aleatorio",
        desc: "Surpresas a cada atualização",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ab04de73-467d-4266-a93a-e875fd4d28b5.png",
      },
      {
        label: "Formulários rebeldes",
        value: "formulario",
        desc: "Teima em não enviar seus dados",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/679a0a7f-2051-4ef5-b8c9-98a74e9cce57.png",
      },
      {
        label: "Funciona só no IE6",
        value: "navegador",
        desc: "Teima em não se atualizar",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/732db3c6-8cec-47cf-bcda-2d15bc378626.png",
      },
    ],
  },
  {
    key: "food",
    title: "4. Qual prato ou sobremesa combina com você?",
    options: [
      {
        label: "Hambúrguer Artesanal",
        value: "hamburguer",
        desc: "Saboroso e satisfatório",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c7cc6b27-705b-426e-a334-adb50a41f1c1.png",
      },
      {
        label: "Poke Bowl",
        value: "poke",
        desc: "Equilibrado e nutritivo",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3c15d6fa-a357-4270-9f8b-d0716579d2c8.png",
      },
      {
        label: "Brigadeiro",
        value: "brigadeiro",
        desc: "Doce e contagiante",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cfb39400-2c85-49a2-b9ff-604871d72d3e.png",
      },
      {
        label: "Churros",
        value: "churros",
        desc: "Crocante por fora, macio por dentro",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8b53b1da-f5f4-4914-bc58-c48936c1c274.png",
      },
    ],
  },
  {
    key: "animal",
    title: "5. Se fosse um pet, seria...",
    options: [
      {
        label: "Cachorro",
        value: "cachorro",
        desc: "Leal e cheio de energia",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/30776722-f069-40f3-917d-93a71b7260e6.png",
      },
      {
        label: "Gato",
        value: "gato",
        desc: "Independente e misterioso",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3af5a5a9-a322-4647-b670-c74a96ddfc1b.png",
      },
      {
        label: "Peixe",
        value: "peixe",
        desc: "Tranquilo e observador",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6da2900a-6a73-4290-8f40-dcafa7d21efe.png",
      },
      {
        label: "Hamster",
        value: "hamster",
        desc: "Ativo e cheio de truques",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b7eb4cd9-8c9b-42c0-b487-29f0800c8312.png",
      },
    ],
  },
];

let currentQuestion = 0;
const answers = {};
let userName, userAge, userCity, userTeam, userColor, userHobby;

const descMap = {
  style: {
    moderno: "moderno e minimalista",
    retro: "retrô e descontraído",
    artistico: "artístico e criativo",
    tecnico: "técnico e informativo",
  },
  function: {
    diversao: "diversão e entretenimento",
    conhecimento: "aprendizado em cards",
    conexao: "feed de posts e chat",
    utilidade: "ferramentas práticas",
  },
  bug: {
    carregamento: "com loading infinito",
    aleatorio: "com comportamento imprevisível",
    formulario: "com formulários rebeldes",
    navegador: "compatível só com IE6",
  },
  food: {
    hamburguer: "inspirado em hambúrguer artesanal",
    poke: "no estilo poke bowl",
    brigadeiro: "doce como brigadeiro",
    churros: "crocante como churros",
  },
  animal: {
    cachorro: "leal como um cachorro",
    gato: "misterioso como um gato",
    peixe: "tranquilo como um peixe",
    hamster: "ativo como um hamster",
  },
};

function buildPrompt(ans) {
  const s = descMap.style[ans.style];
  const f = descMap.function[ans.function];
  const b = descMap.bug[ans.bug];
  const fo = descMap.food[ans.food];
  const a = descMap.animal[ans.animal];

  return `
    Landing page ${s},
    funcionalidade de ${f},
    bug ${b},
    tema ${fo},
    mascote ${a},
    esquema de cores ${userColor},
    torcedor do ${userTeam},
    perfil: ${userAge} anos em ${userCity}, hobby ${userHobby},
    header, hero, cards, footer, responsivo, flat vector.
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("📦 DOM pronto, registrando botões…");

  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", fn);
      console.log(`✅ Listener em #${id}`);
    } else {
      console.warn(`⚠️ Elemento #${id} não existe`);
    }
  };

  bind("start-btn", startQuiz);
  bind("next-btn", nextQuestion);
  bind("prev-btn", prevQuestion);
  bind("restart-btn", () => location.reload());
  bind("download-btn", downloadResult);
});

async function startQuiz() {
  userName = document.getElementById("user-name-input").value.trim();
  userAge = document.getElementById("user-age-input").value.trim();
  userCity = document.getElementById("user-city-input").value.trim();
  userTeam = document.getElementById("user-team-input").value.trim();
  userColor = document.getElementById("user-color-input").value;
  userHobby = document.getElementById("user-hobby-input").value.trim();

  if (
    ![userName, userAge, userCity, userTeam, userColor, userHobby].every(
      (x) => x
    )
  ) {
    return showToast("Preencha TODOS os campos antes de continuar!");
  }

  // 1) Verifica bloqueio antes de prosseguir
  let checkData;
  try {
    checkData = await fetch("api/check-block.php").then((r) => r.json());
  } catch {
    return showToast("Erro ao verificar bloqueio.");
  }
  if (checkData.bloqueado) {
    const btn = document.getElementById("start-btn");
    btn.disabled = true;
    btn.textContent = `⛔ Bloqueado — tente novamente às ${checkData.desbloqueio_em}`;
    return;
  }

  // 2) Registra o acesso
  let info;
  try {
    const res = await fetch("api/log-access.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });
    const text = await res.text();
    if (!res.ok) {
      const data = JSON.parse(text || "{}");
      throw new Error(data.error || text);
    }
    info = JSON.parse(text);
  } catch (err) {
    return showToast("Erro ao registrar acesso: " + err.message);
  }

  // 3) Bloqueio pelo log-access
  if (info.bloqueado) {
    return showToast(
      "⛔ Você excedeu o limite de tentativas. Tente novamente em 30 minutos."
    );
  }

  // 4) Libera o quiz
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("quiz-area").classList.remove("hidden");
  renderQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    // oculta quiz + tela de boas-vindas
    document.getElementById("quiz-area").classList.add("hidden");
    document.getElementById("welcome").classList.add("hidden");
    // mostra overlay de loading
    document.getElementById("loading-screen").classList.remove("hidden");
    // aguarda um tick para aplicar o CSS antes de gerar
    setTimeout(renderResult, 50);
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function renderQuestion() {
  document.getElementById("prev-btn").disabled = currentQuestion === 0;
  const q = questions[currentQuestion];
  document.getElementById("question-title").textContent = q.title;
  document.getElementById("progress-bar").textContent = `Pergunta ${
    currentQuestion + 1
  } de ${questions.length}`;
  const optionsEl = document.getElementById("options");
  optionsEl.innerHTML = "";

  q.options.forEach((opt) => {
    const div = document.createElement("div");
    div.className =
      "option-card p-4 border-2 border-gray-200 rounded-lg text-center transition hover:scale-105 cursor-pointer";
    div.setAttribute("role", "button");
    div.dataset.value = opt.value;
    div.innerHTML = `
      <img src="${opt.img}" alt="${opt.label}" class="w-full h-40 object-cover rounded mb-3" />
      <h3 class="font-bold text-lg">${opt.label}</h3>
      <p class="text-sm text-gray-600">${opt.desc}</p>
    `;
    div.onclick = () => {
      answers[q.key] = opt.value;
      document
        .querySelectorAll(".option-card")
        .forEach((c) =>
          c.classList.remove("border-indigo-500", "bg-indigo-50")
        );
      div.classList.add("border-indigo-500", "bg-indigo-50");
      document.getElementById("next-btn").disabled = false;
    };
    optionsEl.appendChild(div);
  });
  document.getElementById("next-btn").disabled = true;
}

async function renderResult() {
  const overlay = document.getElementById("loading-screen");
  const result = document.getElementById("result");
  const domEl = document.getElementById("domain-name");
  const descEl = document.getElementById("description");
  const nameEl = document.getElementById("user-name");
  const imgEl = document.getElementById("result-image");
  const internalSpin = document.getElementById("result-loading");

  // 1) Esconde o resultado e mostra o overlay global
  result.classList.add("hidden");
  overlay.classList.remove("hidden");

  // 2) Dispara texto e imagem em paralelo
  let txt, imgData;
  try {
    [txt, imgData] = await Promise.all([
      fetch("api/gerar-texto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          age: userAge,
          city: userCity,
          team: userTeam,
          color: userColor,
          style: answers.style,
          function: answers.function,
          hobby: userHobby,
        }),
      }).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch("api/gerar-imagem.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: buildPrompt(answers) }),
      }).then((r) => (r.ok ? r.json() : Promise.reject())),
    ]);
  } catch {
    // fallback
    txt = {
      domain: generateDomainName() + ".dev",
      description: `Fallback: ${userName}`,
    };
    imgData = { data: [{ url: "https://via.placeholder.com/512" }] };
  }

  // 3) Atualiza DOM
  domEl.textContent = txt.domain;
  domEl.style.color = userColor;
  descEl.textContent = txt.description;
  nameEl.textContent = userName;
  imgEl.src = imgData.data[0].url;

  // 4) Aguarda a imagem carregar (ou falhar)
  await new Promise((resolve) => {
    imgEl.onload = resolve;
    imgEl.onerror = resolve;
  });

  // 5) Esconde o overlay e mostra o resultado
  overlay.classList.add("hidden");
  internalSpin.classList.add("hidden");
  result.classList.remove("hidden");
}

function traduzirCor(hex) {
  hex = hex.toLowerCase();
  const cor = window.colorList.find((c) => c.hex.toLowerCase() === hex);
  const nomeIngles = cor?.name || hex;

  for (let chave in window.traducoes) {
    if (nomeIngles.toLowerCase().includes(chave.toLowerCase())) {
      return window.traducoes[chave];
    }
  }

  return nomeIngles; // fallback: nome em inglês ou o próprio hex
}

function generateDomainName() {
  const parts = {
    style: {
      moderno: ["dev"],
      retro: ["retro"],
      artistico: ["art"],
      tecnico: ["tech"],
    },
    function: {
      diversao: ["fun"],
      conhecimento: ["learn"],
      conexao: ["connect"],
      utilidade: ["tools"],
    },
    food: {
      hamburguer: ["burger"],
      poke: ["bowl"],
      brigadeiro: ["sweet"],
      churros: ["crunch"],
      animal: ["pet"],
    },
    bug: ["bug"],
  };
  const s = parts.style[answers.style] || ["web"];
  const f = parts.function[answers.function] || ["app"];
  const d = parts.food[answers.food] || ["site"];
  const name = userName.toLowerCase().replace(/\s+/g, "");
  const combos = [`${s[0]}${f[0]}`, `${name}${s[0]}`, `${d[0]}${f[0]}`];
  return combos[Math.floor(Math.random() * combos.length)];
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.querySelector("span").textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 3000);
}

// 1) converte uma URL de imagem (Azure) em data-URL via seu proxy PHP
async function toDataURL(url) {
  const proxyUrl = `api/proxy-image.php?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxyUrl);
  if (!res.ok) throw new Error(`Proxy falhou: ${res.status}`);
  const blob = await res.blob();
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

// 2) download bonito, sem bagunçar layout
async function downloadResult() {
  const resultEl = document.getElementById("result");

  // Clona o conteúdo
  const clone = resultEl.cloneNode(true);
  Object.assign(clone.style, {
    position: "",
    top: "0",
    left: "0",
    visibility: "hidden",
    zIndex: "9999",
    width: `${resultEl.offsetWidth}px`,
    height: `${resultEl.offsetHeight}px`,
    background: "linear-gradient(to right, #8b5cf6, #ec4899)", // mesmo fundo do original
    padding: "2rem",
    boxSizing: "border-box",
  });

  // Remove botões e overlay
  clone
    .querySelectorAll("div.absolute, #restart-btn, #download-btn")
    .forEach((el) => (el.style.display = "none"));

  // Corrige a imagem
  const img = clone.querySelector("#result-image");
  if (img && !img.src.startsWith("data:")) {
    img.crossOrigin = "anonymous";
    img.src = await toDataURL(img.src);
    await img.decode();
    img.classList.remove("hidden");
  }

  // Adiciona à página para renderizar
  document.body.appendChild(clone);
  await new Promise((r) => requestAnimationFrame(r)); // aguarda layout

  // Captura
  const canvas = await html2canvas(clone, {
    useCORS: true,
    scale: 2,
    backgroundColor: null,
  });

  // Remove clone
  document.body.removeChild(clone);

  // Gera download
  canvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.download = "meu-site-quiz.png";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

// 3) vincula ao botão
document
  .getElementById("download-btn")
  .addEventListener("click", downloadResult);
