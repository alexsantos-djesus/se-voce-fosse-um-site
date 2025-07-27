# Se Você Fosse Um Site

> 🖥️ Um mini-quiz interativo que, com base nas suas preferências, gera um nome de domínio, descrição e mockup de um site personalizado.

---

## 📄 Conteúdo

- [Funcionalidades](#-funcionalidades)  
- [Tecnologias](#️-tecnologias)  
- [Pré-requisitos](#-pré-requisitos)  
- [Instalação](#-instalação)  
- [Uso](#-uso)  
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [APIs PHP](#-apis-php)
- [Personalizações Futuras](#-personalizações-futuras)  
- [Licença](#-licença)  

---

## ✨ Funcionalidades

- Tela de boas-vindas para coleta de **nome**, **idade**, **cidade**, **time**, **cor favorita** e **hobby**  
- Quiz de 5 perguntas com seleção de **estilo**, **função**, **bug**, **prato** e **pet**  
- Geração de **domínio** e **descrição** via API do ChatGPT  
- Geração de **imagem mockup** via API de Imagens do OpenAI  
- Spinner global enquanto aguarda as APIs  
- Download da tela final como imagem (para compartilhar em stories)  

---

## 🛠️ Tecnologias

- **Vanilla JS** (ES6 modules)  
- **Tailwind CSS** para estilos  
- **HTML2Canvas** para capturar e baixar o resultado  
- **PHP (cURL)** para chamadas aos endpoints:
  - `api/gerar-texto.php` (ChatGPT)
  - `api/gerar-imagem.php` (Image API)  
- **Composer** + **vlucas/phpdotenv** para gerenciar variáveis de ambiente  

---

## 🔧 Pré-requisitos

- PHP 7.4+ com cURL habilitado  
- Composer  
- Chave de API da OpenAI  
- Servidor local ou hospedagem com PHP  

---

## 🚀 Instalação

1. **Clone o repositório**  
   ```bash
   git clone https://github.com/seu-usuario/se-voce-fosse-um-site.git
   cd se-voce-fosse-um-site

2. **Clone o repositório**
   ```bash
   composer install

3. **Clone o repositório**
  Até o diretório raiz, crie um arquivo .env com:

        OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx

4. **Abra no seu servidor local**
  - Se usar o PHP Built-in:
    
        php -S localhost:8000 -t public

  - Acesse http://localhost:8000 no navegador.

---

## 📝 Uso
  1. Preencha seus dados na tela de boas-vindas.
  2. Responda às 5 perguntas do quiz.
  3. Ao final, aguarde o spinner global rodar enquanto texto e imagem são gerados.
  4. Clique em Download para salvar a tela final como PNG.

---

## 📂 Estrutura do Projeto
    .
    ├── public/
    │   ├── index.html          ← HTML principal
    │   ├── style.css           ← CSS customizado
    │   ├── js/
    │   │   ├── script.js       ← Lógica do quiz e integração
    │   │   └── color-list.js   ← Lista de cores para tradução
    │   └── api/
    │       ├── gerar-texto.php ← Endpoint ChatGPT
    │       └── gerar-imagem.php← Endpoint Image API
    ├── vendor/                 ← Dependências PHP (composer)
    ├── .env                    ← Variáveis de ambiente (não comitar)
    └── README.md               ← Este arquivo

---

## 🔌 APIs PHP

gerar-texto.php

- Recebe (JSON POST):
  
      {
        "name": "...",
        "age": "...",
        "city": "...",
        "team": "...",
        "color": "#hex",
        "style": "...",
        "function": "...",
        "hobby": "..."
      }
  
- Retorna (JSON):

      {
      "domain": "meusite.dev",
      "description": "Descrição gerada pelo ChatGPT..."
      }

gerar-imagem.php

- Recebe (JSON POST):

      { "prompt": "Texto para geração de mockup" }

- Retorna (JSON):

      {
        "data": [
          { "url": "https://..." }
        ]
      }

---

## 💡 Personalizações Futuras

- 🔄 Recarregar apenas mockup sem refazer todo o quiz.
- 🎨 Tema escuro automático usando CSS custom properties.
- 📱 Animações SVG no loading.
- 🌐 Suporte a múltiplos idiomas.

---

## 📝 Licença
MIT © [ALEX SANTOS DE JESUS - DEBUGUEI]
