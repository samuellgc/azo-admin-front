import type { AlignItems, Gap, GridCols, JustifyContent } from "@/shared/types/styles";

/**
 * Mapeamento `gapClassMap`
 *
 * Associa valores do tipo `Gap` a classes CSS de espaçamento (`gap-*`) do Tailwind CSS.
 *
 * Cada chave representa a quantidade de espaço entre elementos,
 * e o valor é a classe CSS correspondente para aplicar esse espaçamento.
 */
export const gapClassMap: Record<Gap, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
  "16": "gap-16",
  "20": "gap-20",
  "24": "gap-24",
  "32": "gap-32",
  "40": "gap-40",
  "48": "gap-48",
  "56": "gap-56",
  "64": "gap-64",
  px: "gap-px",
};

/**
 * Mapeamento `justifyContentClassMap`
 *
 * Associa valores do tipo `JustifyContent` às classes CSS de justificação (`justify-*`) do Tailwind CSS.
 *
 * Cada chave representa a forma de alinhamento dos itens no eixo principal,
 * e o valor é a classe CSS correspondente para aplicar essa justificação.
 */
export const justifyContentClassMap: Record<JustifyContent, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

/**
 * Mapeamento `alignItemsClassMap`
 *
 * Associa valores do tipo `AlignItems` às classes CSS de alinhamento vertical (`items-*`) do Tailwind CSS.
 *
 * Cada chave representa o alinhamento dos itens no eixo transversal,
 * e o valor é a classe CSS correspondente para aplicar esse alinhamento.
 */
export const alignItemsClassMap: Record<AlignItems, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

/**
 * Mapeamento `gridColsClassMap`
 *
 * Associa valores do tipo `GridCols` às classes CSS de colunas em grid (`grid-cols-*`) do Tailwind CSS.
 *
 * Cada chave representa o número de colunas do grid,
 * e o valor é a classe CSS correspondente para aplicar essa configuração.
 *
 * A chave especial `"auto"` representa colunas automáticas.
 */
export const gridColsClassMap: Record<GridCols, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-2",
  "3": "grid-cols-3",
  "4": "grid-cols-4",
  "5": "grid-cols-5",
  "6": "grid-cols-6",
  "7": "grid-cols-7",
  "8": "grid-cols-8",
  "9": "grid-cols-9",
  "10": "grid-cols-10",
  "11": "grid-cols-11",
  "12": "grid-cols-12",
  auto: "grid-cols-auto",
};
