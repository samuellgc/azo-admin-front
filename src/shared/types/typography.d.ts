/**
 * Tipo `TypographyVariant`
 *
 * Define as variantes tipográficas que representam o estilo e a semântica do texto.
 *
 * Valores possíveis:
 * - `"title"`: Texto principal, geralmente um título grande (ex: `<h1>`).
 * - `"subtitle"`: Subtítulo ou título secundário (ex: `<h2>`).
 * - `"paragraph"`: Texto de parágrafo padrão (ex: `<p>`).
 * - `"auxiliary"`: Texto auxiliar ou menor, geralmente em `<span>`.
 */
export type TypographyVariant = "title" | "subtitle" | "paragraph" | "auxiliary";

/**
 * Tipo `TypographyType`
 *
 * Define o tipo contextual do texto, geralmente para controle de cor ou significado semântico.
 *
 * Valores possíveis:
 * - `"default"`: Texto padrão.
 * - `"error"`: Texto em estado de erro.
 * - `"success"`: Texto em estado de sucesso.
 */
export type TypographyType = "default" | "error" | "success";
