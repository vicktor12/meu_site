# Brains Tech — Site Institucional

Site institucional em `brainstech.com.br`. Landing page única apresentando a marca, serviços e catálogo de projetos.

## Stack

- **Vite 5** + **React 18** + **Tailwind CSS 3** + **lucide-react**
- `npm run dev` → `http://localhost:5173`
- `npm run build` → gera `dist/`

## Estrutura

```
src/
  App.jsx               ← Loader + Cursor + Nav + sections em ordem
  config.js             ← EMAIL, WHATSAPP (vazio = botão oculto), controle do loader
  index.css             ← tokens, grain, spotlight, botões, marquee, animações
  components/           ← NeuralCanvas (cérebro 3D em canvas), Loader, Cursor, ui.jsx (Reveal, Spot, Words, Scramble, Counter, Magnetic)
  sections/             ← Nav, Hero, Marquee, Diferencial, Briefing (terminal interativo), Processo, Servicos, Projetos, Sobre, Contato, Footer
public/                 ← logo-white.png (usada), favicon64.png (ativo)
```

## Design System — "centro de comando neural"

Tema escuro futurista. Fontes: **Unbounded** (display), **Manrope** (texto), **JetBrains Mono** (HUD/tags).
Cores (tailwind.config.js): `void` #03060D (fundo), `ink-900/800` (seções alternadas), `neon` #22E5FF (IA / accent), `volt` #3B82F6, `amber-signal` #FFB547 (decisão humana — simboliza o TI no comando).

Padrões: cards = classe `.spot` (spotlight no mouse) dentro de `<Reveal>`; títulos com `.text-grad` / `.text-shimmer` (não aplicar em pai de elemento com transform/filter — usar `Words`, que passa a classe a cada palavra); CTAs `.btn-solid` e `.btn-beam`. Respeita prefers-reduced-motion.

## Posicionamento

Victor é profissional de **suporte técnico** que usa **IA como ferramenta de desenvolvimento** — não é desenvolvedor tradicional. Todos os projetos, incluindo este site, foram construídos com auxílio de IA. Esse diferencial deve aparecer explicitamente em qualquer revisão de copy.

## Serviços (5)

1. Desenvolvimento Web Full-Stack — React, Node.js, PostgreSQL
2. Aplicativos Android — React Native, Expo (apenas Android)
3. Automação de Processos — Node.js, Cron, CNAB/PDF/Excel
4. Dashboards & BI — Chart.js, Recharts, KPIs
5. Suporte Remoto — atendimento técnico à distância

## Catálogo de Projetos

Array em `src/sections/Projetos.jsx`. Para adicionar novo projeto, inserir objeto no array `projetos`:

```js
{
  id: 'slug-unico',
  icon: IconeLucide,
  status: 'Em produção',    // pill do card (live: true = bolinha verde pulsando)
  hue: '34,229,255',        // cor RGB do card
  destaque: false,           // true = ocupa 2 colunas (md:col-span-2)
  nome: 'Nome do Projeto',
  tipo: 'Tipo / Categoria',
  desc: 'Descrição curta.',
  stack: ['Tech1', 'Tech2'],
  links: [                   // array vazio = "sem demo pública"
    { label: 'Ver Demo', icon: ExternalLink, href: 'https://...', primary: true },
  ],
}
```

A seção é um **carrossel** (scroll-snap horizontal, setas, barra de progresso) com filtro por categoria. Cada projeto tem `categoria: 'Profissional' | 'Pessoal'` e `andamento: true|false` (Em andamento / Finalizado); `destaque`, `status` e `tipo` do formato antigo não existem mais (o `tipo` continua). Links usam o mesmo botão `.btn-solid` (sem campo `primary`).

**Projetos atuais (8):**
- Profissional: **Base de Conhecimento** (em andamento), **Bot Pauma**, **UTalk Analytics** — todos internos, sem link público
- Pessoal: **Browser MCP Server** → `https://github.com/vicktor12/browser-mcp-server`, **Controle de Apostas** → `https://controledeapostas.com.br`, **Finanças Pessoais** → `https://financas.brainstech.com.br`, **Excaliburr** → `https://app.excaliburr.brainstech.com.br`, **My Health** → `https://saude.brainstech.com.br`
- Não incluir dados de empresa/credenciais dos projetos profissionais nas descrições.

## Pendências

- [ ] **Deploy**: git init → push `vicktor12/brainstech-site` → EasyPanel serviço `site` → Cloudflare DNS `brainstech.com.br` → `187.77.53.139`

## Deploy (quando executar)

1. `git init && git remote add origin https://github.com/vicktor12/brainstech-site`
2. EasyPanel (projeto `financas`) → novo serviço `site` tipo App (Dockerfile)
3. Cloudflare: registro A `brainstech.com.br` → `187.77.53.139` (proxy laranja)
4. Push automático: `git push` → EasyPanel builda → site no ar

## Arquivos de imagem — não reprocessar

- `logo-white.png` foi gerada com `sharp` (pixel manipulation) a partir de `Brainstech.png`: fundo branco → transparente, pixels do cérebro → branco opaco.
- `favicon64.png` foi gerada com `sharp` composite: background navy 64×64 + `logo-white.png` 56×56 centralizada.
- Para recriar: `node -e` com `sharp` (já instalado como devDep). Python/ImageMagick não disponíveis no ambiente.
