# CLAUDE.md — Finanças Pessoais

Sistema de **finanças pessoais self-hosted**: lançamentos manuais, importação de extratos (OFX/CFX/PDF), recorrentes, automações, relatórios, dashboard e app mobile consumindo a mesma API REST.

---

## Stack

| Camada   | Tecnologia |
|----------|------------|
| Frontend | React 18 + Vite + Tailwind CSS + lucide-react |
| Backend  | Node.js + Express |
| Banco    | PostgreSQL 14+ |
| Auth     | JWT (jsonwebtoken + bcryptjs) |
| Upload   | multer (memória, 20 MB) |
| PDF      | pdf-parse@1.1.1 |
| Charts   | recharts |
| Mobile   | React Native + Expo SDK 54 + React Navigation v7 |

**Dev:**
- Backend: `cd backend && npm run dev` → `http://localhost:3001`
- Frontend: `cd frontend && npm run dev` → `http://localhost:5173`
- Mobile: `cd mobile && npx expo start` (Expo Go no celular)

**Banco local:** `postgresql://financas:ynuiasha12@localhost:5432/financas`  
Superuser: `postgres` / `ynuiasha12`

---

## Hospedagem (Produção)

| Serviço | URL | Plataforma |
|---------|-----|------------|
| Landing + Frontend | https://financas.brainstech.com.br | VPS Hostinger (EasyPanel) |
| Backend API | https://api.financas.brainstech.com.br | VPS Hostinger (EasyPanel) |
| Banco de dados | interno (Docker EasyPanel) | VPS Hostinger |
| Painel de gestão | http://187.77.53.139:3000 | EasyPanel v2 |
| APK Android | https://github.com/vicktor12/finances-releases/releases/download/v1.0.0/financas.apk | GitHub Releases (repo público) |

**VPS:** Hostinger KVM1 · Ubuntu 25.10 · 1 CPU · 4 GB RAM · 50 GB disco · IP `187.77.53.139` · Brazil - Campinas  
**SSH:** `ssh root@187.77.53.139`  
**EasyPanel:** projeto `financas` com 3 serviços: `api` (Node.js), `web` (React/Dockerfile), `db` (PostgreSQL 17)  
**Deploy automático:** a cada `git push` na branch `main`  
**DNS:** gerenciado pelo Cloudflare (nameservers apontados pela Hostinger)

**Variáveis de ambiente da API (EasyPanel):**
- `DATABASE_URL` — connection string interna do PostgreSQL EasyPanel
- `JWT_SECRET` / `JWT_EXPIRES_IN=8h`
- `PORT=3000`
- `NODE_ENV=production`
- `FRONTEND_URL=https://financas.brainstech.com.br`
- `EMAIL_HOST/PORT/USER/PASS/FROM` — Gmail SMTP

**Variável de ambiente do Web (EasyPanel):**
- `VITE_API_URL=https://api.financas.brainstech.com.br` (injetada no build pelo Dockerfile)

---

## Funcionalidades Implementadas

### Backend — Rotas

- `GET/POST/PUT/DELETE /api/contas`
- `GET/POST/PUT/DELETE /api/categorias` + `GET /api/categorias/flat`
- `GET/POST/PUT/DELETE /api/clientes`
- `GET/POST/PUT/DELETE /api/lancamentos` + `PATCH /:id/pagar`
- `GET/POST/PUT/DELETE /api/recorrentes` + `POST /:id/gerar`
- `GET/POST/PUT/DELETE /api/automacoes`
- `GET /api/dashboard`
- `GET /api/relatorios/mensal` + `GET /api/relatorios/categorias`
- `POST /api/importacoes/preview` + `POST /api/importacoes/confirmar` (OFX + CFX + PDF)
- `POST /api/auth/login` · `POST /api/auth/setup` · `GET /api/auth/setup-necessario`
- `POST /api/auth/solicitar-reset` · `POST /api/auth/resetar-senha` (recuperação sem e-mail)
- `PUT /api/auth/trocar-senha` (autenticado)
- `GET /api/usuarios` (admin only)

### Frontend Web

**Landing page** (`/`) · Login (setup condicional + esqueci senha) · Dashboard · Lançamentos (CRUD + liquidar + saldo anterior) · Contas · Categorias · Clientes · Recorrentes · Automações · Importação (OFX+CFX+PDF, preview, ignorar, sugestão recorrente, conciliar, alerta período) · Relatórios · Usuários

### App Mobile (Expo Go)

Login (setup condicional + esqueci senha) · Dashboard · Lançamentos (CRUD + liquidar) · Contas · Recorrentes (+ gerar mês) · Relatórios (barras mensais + ranking categorias) · Categorias · Clientes · Automações · Mais / Logout

> **Não disponível no mobile:** Importação OFX/PDF, gestão de usuários.

---

## Decisões Técnicas

| Decisão | Motivo |
|---------|--------|
| `pdf-parse@1.1.1` (não v2) | v2 exporta classe `{PDFParse}` — API incompatível. v1 exporta função direta. |
| Hash MD5 diferente OFX vs PDF | `fitid+data+valor` (OFX) vs `pdf_+data+desc+valor` (PDF). Dedup cross-format coberto pelo alerta de período. |
| Sugestão de recorrente 100% manual | Evitar falsos positivos — tolerância de R$1 gerava 23 sugestões erradas. |
| `::date` cast no PATCH /pagar | PostgreSQL rejeita string de data sem cast explícito com `COALESCE`. |
| Alerta de período não-bloqueante | Deduplicação por hash já protege; alerta avisa sem bloquear reimportação legítima. |
| Tipo de conta: enum PostgreSQL | Valores válidos: `conta_corrente` `poupanca` `carteira` `cartao_credito` `investimento` `outro`. |
| `async-storage@2.2.0` (não v3) | v3 requer native build — não funciona no Expo Go. |
| Estilos inline no mobile | NativeWind v4 removeu `styled()`. Objetos JS inline são compatíveis sem config extra de babel. |
| IP do backend auto-detectado | `client.ts` usa `Constants.expoGoConfig?.debuggerHost` (expo-constants) para extrair o IP do Metro bundler. Não precisa alterar manualmente ao trocar de rede. |
| Recuperação de senha via e-mail | `POST /auth/solicitar-reset` gera código (6 chars, 15 min) e envia por e-mail via nodemailer (Gmail SMTP + App Password). Resposta não expõe o código. Colunas `reset_token` e `reset_token_expires` adicionadas via `ADD COLUMN IF NOT EXISTS`. Config: `EMAIL_HOST/PORT/USER/PASS/FROM` no `.env`. |
| `GET /api/lancamentos` — param `mes` | Espera `YYYY-MM` (ex: `2026-04`), não mês e ano separados. |
| Safe area no mobile | `SafeAreaProvider` em `App.tsx`; cada tela usa `useSafeAreaInsets().top` no header. `paddingTop: 48` fixo não funciona em todos os dispositivos. |
| APK em repo público separado | Repo principal `finances` é privado (código). APK distribuído via `finances-releases` (público) no GitHub Releases. Evita expor código-fonte para download público. |
| Landing integrada ao frontend | Rota `/` é pública (`Landing.jsx`). Rotas protegidas usam paths absolutos sem parent route. Catch-all redireciona para `/` (antes ia para `/dashboard`). Usuário logado vê CTA "Ir para o Dashboard". |
| Build APK via EAS Build | `eas build -p android --profile preview` gera APK (não AAB). `eas.json` com `appVersionSource: local`. `android.package: com.brainstech.financas`. URL de produção em `client.ts`: `https://api.financas.brainstech.com.br`. |

---

## Próximas Ações

**Alta prioridade**
1. **Fluxo de caixa projetado** — combinar lançamentos reais com recorrentes futuros para projetar saldo por mês
2. **Edição pós-importação** — lançamentos importados só podem ser excluídos hoje; falta permitir editar categoria, cliente e vínculo com recorrente
3. **Exportação CSV/Excel** — lançamentos filtrados para planilhas/contador

**Média prioridade**
4. **Transferências entre contas** — tipo `transferencia` que debita/credita sem afetar DRE
5. **Tags nos lançamentos** — campo `tags` já existe no banco, falta expor na UI
6. **Metas financeiras** — meta de despesa por categoria com progresso no dashboard
7. **Notificações de vencimento** — push via `expo-notifications`
8. **Importação no mobile** — `expo-document-picker` para OFX/PDF

**Futuro**
9. Multi-usuário com isolamento por `usuario_id` nas entidades
10. Open Finance via Pluggy
11. Testes automatizados — jest + supertest nas rotas críticas
12. ~~Deploy~~ — **concluído**: VPS Hostinger + EasyPanel + Cloudflare DNS
13. ~~Landing page~~ — **concluído**: `financas.brainstech.com.br` com hero, features, download do APK
14. ~~APK Android~~ — **concluído**: EAS Build (Expo) · distribuído via `github.com/vicktor12/finances-releases`

---

## Estrutura de Arquivos

```
finances/
├── CLAUDE.md / README.md
├── backend/
│   ├── schema.sql / .env
│   └── src/
│       ├── server.js / db.js
│       └── routes/
│           ├── auth.js          ← login, setup, recuperação de senha (solicitar-reset, resetar-senha)
│           ├── lancamentos.js   ← PATCH /pagar usa ::date cast
│           ├── importacoes.js   ← OFX + PDF parser, alerta de sobreposição de período
│           └── [contas, categorias, clientes, recorrentes, automacoes, dashboard, relatorios, usuarios].js
├── frontend/src/
│   ├── App.jsx / utils/api.js / context/AuthContext.jsx
│   └── pages/
│       └── [Landing, Login, Dashboard, Lancamentos, Contas, Categorias, Clientes,
│            Recorrentes, Automacoes, Importacao, Relatorios, Usuarios].jsx
└── mobile/
    ├── App.tsx                  ← SafeAreaProvider + AuthProvider + RootNavigator
    ├── package.json             ← expo ~54 · RN 0.81.5 · react 19.1.0 · async-storage@2.2.0
    └── src/
        ├── api/client.ts        ← HTTP client · timeout 10s · IP auto-detect via expo-constants
        ├── context/AuthContext.tsx
        ├── navigation/RootNavigator.tsx  ← Stack: Login | Tabs(Dashboard, Lancamentos, Contas, Recorrentes, Relatórios, Mais→[Categorias,Clientes,Automacoes])
        ├── screens/
        │   └── [Login, Dashboard, Lancamentos, Contas, Recorrentes, Relatorios,
        │         Mais, Categorias, Clientes, Automacoes]Screen.tsx
        └── utils/formatters.ts  ← fmt.moeda · fmt.data · fmt.mes
```
