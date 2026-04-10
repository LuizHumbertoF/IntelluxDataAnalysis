# Intellux Data Analysis

Este projeto é uma ferramenta de análise de dados de perfis do Instagram, desenvolvida como parte do processo seletivo da Intellux. A aplicação automatiza a coleta de métricas públicas e utiliza Inteligência Artificial para gerar relatórios estratégicos de engajamento e marketing digital.

## Funcionamento da Aplicação

1.  **Entrada:** O usuário insere um @username do Instagram na interface reativa.
2.  **Coleta (Scraping):** O backend recebe a requisição e aciona um Ator no **Apify** (`instagram-profile-scraper`) para buscar dados em tempo real (seguidores, posts recentes, curtidas e comentários).
3.  **Processamento:** O sistema calcula automaticamente as médias de engajamento baseadas nas últimas publicações coletadas.
4.  **Análise (IA):** Os dados processados são enviados ao **Google Gemini API**, que gera um relatório personalizado com insights e sugestões de melhoria.
5.  **Saída:** O relatório é exibido na interface de forma clara, permitindo uma leitura rápida do desempenho do perfil.

## Tecnologias Utilizadas

### **Frontend**
* **React + TypeScript:** Interface moderna, tipada e reativa.
* **Vite:** Tooling de alto desempenho para o desenvolvimento.
* **Tailwind CSS:** Estilização utilitária e design responsivo.
* **React Icons:** Iconografia intuitiva.
* **React Router:** Para rotas de páginas sem ser necessário atualização da página

### **Backend**
* **Node.js + Express:** API para orquestração de serviços.
* **Apify SDK:** Integração para extração de dados do Instagram.
* **Google Generative AI SDK:** Integração com os modelos de linguagem Gemini.
* **TSX:** Execução e monitoramento de arquivos TypeScript em tempo real.

### **Arquitetura de Projeto**
* **NPM Workspaces (Monorepo):** Gerenciamento unificado de dependências. Permite que o Frontend e o Backend coexistam no mesmo repositório com uma única pasta `node_modules` na raiz, facilitando a portabilidade e instalação.

## Como Rodar o Projeto Localmente

### **Pré-requisitos**
* Node.js instalado (v18 ou superior).
* Uma conta no [Apify](https://apify.com/) para obter o Token de API.
* Uma conta no [Google AI Studio](https://aistudio.google.com/) para obter a chave do Gemini.

### **Instalação**

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/LuizHumbertoF/IntelluxDataAnalysis.git
    cd IntelluxDataAnalysis
    ```

2.  **Instalação Única (Root):**
    Graças ao uso de Workspaces, você instala as dependências de todo o projeto (Front e Back) com um único comando na raiz:
    ```bash
    npm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    * Na raiz do projeto, crie um arquivo `.env`.
    * Use o arquivo `.env.example` como base e preencha com suas chaves:
    ```env
    APIFY_TOKEN=sua_chave_apify
    GEMINI_TOKEN=sua_chave_gemini
    ```

### **Execução**

Para rodar a aplicação completa (Frontend e Backend simultaneamente):
```bash
npm run start
```

### Próximos Passos

* Ajuste de modelo de IA para um em que o limite de requisições seja menor, possi-
bilitando um número de consultas maior na plataforma
* Adição de exportação de relatórios em formato PDF.
* Correção de bugs e aperfeiçoamento de cobertura de erro do usuário.