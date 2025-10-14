/**
 * Tipo `Gap`
 *
 * Define os valores possíveis para espaçamento (`gap`) entre elementos,
 * geralmente mapeados para classes CSS de espaçamento em Tailwind ou similares.
 *
 * Valores representam unidades relativas ou absolutas, como pixels (`px`) e múltiplos numéricos.
 */
export type Gap =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12"
  | "16"
  | "20"
  | "24"
  | "32"
  | "40"
  | "48"
  | "56"
  | "64"
  | "px";

/**
 * Tipo `GridCols`
 *
 * Define as quantidades possíveis de colunas em um grid, incluindo valores numéricos de 1 a 12
 * e o valor especial `"auto"`.
 */
export type GridCols = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "auto";

/**
 * Tipo `AlignItems`
 *
 * Define as opções para o alinhamento dos itens no eixo transversal em layouts flexbox ou grid,
 * correspondendo às propriedades CSS `align-items`.
 *
 * Valores suportados: `"start"`, `"center"`, `"end"`, `"stretch"`, `"baseline"`.
 */
export type AlignItems = "start" | "center" | "end" | "stretch" | "baseline";

/**
 * Tipo `JustifyContent`
 *
 * Define as opções para a justificação dos itens no eixo principal em layouts flexbox ou grid,
 * correspondendo às propriedades CSS `justify-content`.
 *
 * Valores suportados: `"start"`, `"center"`, `"end"`, `"between"`, `"around"`, `"evenly"`.
 */
export type JustifyContent = "start" | "center" | "end" | "between" | "around" | "evenly";

/**
 * Tipo `Direction`
 *
 * Direção genérica para componentes que suportam orientação row ou column.
 */
export type Direction = "row" | "column";

/**
 * Tipo genérico `ElementProps<T>`
 *
 * Propriedades básicas para componentes que permitem renderização dinâmica via a prop `as`.
 * Inclui:
 * - `as` (opcional): elemento ou componente React que será renderizado.
 * - `className` (opcional): classes CSS adicionais.
 * - `children` (opcional): conteúdo interno.
 *
 * Além disso, estende as propriedades padrão de elementos React do tipo `T` sem referências (`ComponentPropsWithoutRef`).
 */
export type ElementProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;
