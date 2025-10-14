# Next Boilerplate

Boilerplate moderno baseado em **Next.js 15** e **React 19**, estruturado para acelerar o desenvolvimento de front-ends modulares, performaticos e faceis de manter. O projeto ja vem pronto para ser usado em equipes que precisam de padronizacao, testes automatizados, linting e ambiente containerizado.

---

## Objetivos do Projeto
- Garantir uma arquitetura escalavel organizada por dominio.
- Oferecer DX consistente com formatter, lint, testes e hooks de Git prontos.
- Facilitar a adocao de componentes reutilizaveis e estilizacao com Tailwind.
- Manter qualidade atraves de testes unitarios, cobertura e validacoes de schema.

---

## Estrutura de Pastas

```
src/
  app/
    layout.tsx
    page.tsx
    (auth)/
      layout.tsx
      login/
        page.tsx
        types.d.ts
        components/
        hooks/
  shared/
    components/
      shadcn/
        ui/
    contexts/
    hooks/
    images/
    lib/
    styles/
    types/
    utils/
```

---

## Principais Ferramentas

**Base**
- Next.js 15.3.5 (App Router, Turbopack, React Compiler)
- React 19 e TypeScript 5

**Estado e Formularios**
- Redux Toolkit para estado global
- React Hook Form + Zod + @hookform/resolvers

**UI e Estilizacao**
- Tailwind CSS 4
- shadcn/ui com Radix UI
- clsx, class-variance-authority e tailwind-merge
- lucide-react para icones SVG

**Qualidade**
- Biome (lint + format) com lint-staged e Husky
- Vitest, Testing Library, jsdom e @vitest/coverage-v8
- Playwright para testes E2E
- @next/bundle-analyzer para auditoria de bundle

---

## Scripts Disponiveis

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "biome lint",
  "format": "biome format --write",
  "check-format": "biome format",
  "prepare": "husky",
  "test": "vitest run",
  "test:watch": "vitest watch"
}
```

---

## Ambiente e Pre-requisitos

- Node.js 20 ou superior (recomendado usar a versao 23.x indicada no `Dockerfile`).
- pnpm 10 (habilite via `corepack enable`).
- Docker e Docker Compose opcionais para espelhar o ambiente de producao/dev.

---

## Como Rodar o Projeto

### Usando Docker (recomendado para inicio rapido)
1. Construa e suba o container:
   ```bash
   docker-compose up --build
   ```
2. A aplicacao ficara disponivel em `http://localhost:3005`.
3. Para executar comandos dentro do container:
   ```bash
   docker-compose exec boilerplate-frontend pnpm test
   docker-compose exec boilerplate-frontend pnpm lint
   docker-compose exec boilerplate-frontend pnpm add <pacote>
   ```

### Executando localmente com pnpm
1. Instale dependencias:
   ```bash
   pnpm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
3. Demais comandos uteis:
   ```bash
   pnpm test         # roda testes unitarios
   pnpm lint         # roda o linter do Biome
   pnpm format       # formata arquivos modificados
   pnpm build        # build para producao
   pnpm start        # sobe a build em modo producao
   ```

---

## Qualidade de Codigo e Testes
- Husky + lint-staged executam Biome antes de cada commit.
- Vitest fornece testes rapidos com jsdom e Testing Library.
- @vitest/coverage-v8 gera relatorios de cobertura.
- Playwright pode ser usado para cenarios ponta a ponta.

---

## Documentacao Complementar
- `docs/frontend-guidelines.md`: convencoes de codigo, estruturacao de pastas e checklist de PRs.
- `biome.json`: configuracao de lint/format.
- `vitest.config.mts`: setup de testes unitarios.

---

## Proximos Passos
- Configure variaveis de ambiente a partir de `.env.example`.
- Leia as diretrizes em `docs/frontend-guidelines.md` antes de criar novas features.
- Ajuste o `docker-compose.yml` conforme as necessidades da sua infraestrutura.
