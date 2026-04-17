# Brains Tech — Site Institucional

Site institucional em `brainstech.com.br`. Landing page única apresentando a marca, serviços e catálogo de projetos.

## Stack

- **Vite 5** + **React 18** + **Tailwind CSS 3** + **lucide-react**
- `npm run dev` → `http://localhost:5173`
- `npm run build` → gera `dist/`

## Estrutura

```
src/
  App.jsx               ← monta as sections em ordem
  index.css             ← dark bg global (#020B18), font Inter
  sections/
    Hero.jsx            ← navbar + badge IA + logo + tagline + CTAs
    Sobre.jsx           ← quem é Victor, posicionamento IA
    Servicos.jsx        ← 5 cards de serviços
    Projetos.jsx        ← catálogo array-driven (adicionar novo = add ao array)
    Contato.jsx         ← email + WhatsApp (⚠ número placeholder)
    Footer.jsx          ← copyright + "Desenvolvido com IA"
public/
  logo-white.png        ← logo branca fundo transparente (usada no site)
  favicon64.png         ← favicon ativo (logo branca sobre navy 64x64)
  Brainstech.png        ← logo original colorida (não usada no site)
```

## Design System

Tema escuro futurista. Cores customizadas no `tailwind.config.js`:

| Token | Hex | Uso |
|-------|-----|-----|
| `space-950` | `#010810` | Footer bg |
| `space-900` | `#020B18` | Fundo principal |
| `space-800` | `#051020` | Seções alternadas (Serviços, Contato) |
| `brand-500` | `#3B82F6` | Accent azul, botões primários |
| `brand-300` | `#93C5FD` | Texto secundário, badges |

**Padrões de componente:**
- Cards: `bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm`
- Section badge: `bg-brand-500/10 border border-brand-500/20 text-brand-300 rounded-full text-xs uppercase tracking-[0.15em]`
- Headings: `bg-gradient-to-r from-white to-brand-300 bg-clip-text text-transparent`
- Tags tech: `font-mono text-[10px] bg-white/5 border border-white/10`
- Orbs decorativos: `bg-brand-500/8 rounded-full blur-[120px] pointer-events-none`

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
  gradient: 'from-cor-900/80 to-cor-700/50',
  border: 'border-cor-500/30',
  iconColor: 'text-cor-300',
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

**Projetos atuais:**
- **Finanças Pessoais** (destaque, 2 colunas) → `https://financas.brainstech.com.br`
- **Dashboard Umbler** → interno, sem link público
- **Waze para ETS2** → mod pessoal, sem link público

## Pendências

- [ ] **WhatsApp**: substituir `5500000000000` em `src/sections/Contato.jsx` pelo número real (formato `55DDD9XXXXXXXX`)
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
