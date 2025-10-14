# Frontend - Boas Praticas e Convencoes

Este documento resume os acordos para manter consistencia entre times que usam o **Next Boilerplate**.

---

## Stack Utilizada

- **Next.js 15 (App Router)**
- **React 19 + TypeScript 5**
- **Tailwind CSS 4**
- **shadcn/ui + Radix UI**
- **Redux Toolkit**
- **React Hook Form + Zod**
- **Biome (lint + format)**
- **Vitest + Testing Library + Playwright**

---

## Estrutura de Pastas

Organize codigo por **feature module**, mantendo responsabilidades proximas.

```
app/
  (auth)/
    login/
      page.tsx
      components/
      hooks/
      schema.ts
shared/
  components/
    shadcn/
      ui/
  hooks/
  lib/
  styles/
  utils/
```

Diretrizes gerais:
- Tudo que for compartilhado fica em `src/shared`.
- Mantenha componentes, hooks, schema e testes da feature juntos.
- Evite niveis profundos de aninhamento sem necessidade.

---

## Convencoes de Nomenclatura

| Tipo                      | Convencao         | Exemplo                  |
| ------------------------- | ----------------- | ------------------------ |
| Pastas de rota            | `kebab-case`      | `user-profile/page.tsx`  |
| Componentes (arquivos)    | `kebab-case.tsx`  | `user-card.tsx`          |
| Componentes exportados    | `PascalCase`      | `export const UserCard`  |
| Hooks                     | `camelCase`       | `useUserSession.ts`      |
| Tipos                     | `PascalCase`      | `type UserCardProps = {}`|
| Testes                    | `*.test.tsx`      | `user-card.test.tsx`     |

---

## Componentes

- Baseie-se nos componentes de `shared/components/shadcn/ui`.
- Componentes devem ser puros e previsiveis.
- Cada componente pode ter pasta propria (`component-name/index.tsx`, `component-name.test.tsx`).
- Nao coloque logica de negocio no componente: extraia para hooks ou servicos.

---

## Hooks

- Use o prefixo `use`.
- Concentre logica reutilizavel (chamadas HTTP, formatos, timers).
- Utilize `useCallback` e `useMemo` apenas quando houver ganho real.

---

## Estado Global (Redux Toolkit)

- Prefira `createSlice`, `createAsyncThunk` e RTK Query.
- Sempre tipar estado, payloads e thunks.
- Reutilize selectors centralizados, evitando logica duplicada em componentes.

---

## Formularios

- Padrao: **React Hook Form** + **Zod**.
- Schemas de validacao ficam em `schema.ts`.
- Utilize `zodResolver` para aproveitar a tipagem.

---

## UI e Estilos

- Tailwind CSS como camada principal de estilos.
- Use `cn`/`clsx` para montar classes dinamicas.
- Evite strings enormes de classe: quebre em helpers ou subcomponentes.
- Prefira composicao a heranca quando extender componentes shadcn.

---

## Testes

- Unitarios com **Vitest** e **Testing Library**.
- Nomeie arquivos como `*.test.tsx` ou `*.spec.ts`.
- Testes devem ser rapidos, isolados e legiveis.
- Use `@vitest/coverage-v8` para garantir cobertura minima definida pelo time.
- Para fluxos criticos, complemente com cenarios E2E no **Playwright**.

---

## Qualidade e Git

- Husky + lint-staged rodam Biome format/lint antes do commit.
- Commits seguem padrao semantico (`feat:`, `fix:`, `chore:`...).
- Nao use `any` sem justificativa forte; prefira tipos derivados do Zod ou interfaces locais.
- Atualize testes quando alterar comportamento.

---

## Acessibilidade e Seguranca

- Sempre defina `rel="noopener noreferrer"` quando usar `target="_blank"`.
- Utilize atributos `aria-*` para fornecer contexto.
- Componentes Radix/shadcn ja nascem acessiveis: nao quebre props padrao.
- Sanitize dados externos antes de renderizar conteudo dinamico.

---

## Checklist para Pull Requests

- [ ] Componentes e hooks estao tipados?
- [ ] Testes foram criados ou atualizados?
- [ ] `pnpm lint` e `pnpm test` passaram?
- [ ] Codigo esta organizado por feature/module?
- [ ] Dependencias novas foram documentadas?
- [ ] Validacao de formularios cobre os casos principais?
