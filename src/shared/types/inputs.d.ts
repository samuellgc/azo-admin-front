import type { TypographyType, TypographyVariant } from "./typography";

/**
 * Tipo `HelperText`
 *
 * Representa o texto auxiliar exibido abaixo de um input, com controle de estilo via variantes e tipos tipográficos.
 *
 * @property variant - Variante tipográfica para o texto auxiliar (ex: título, parágrafo).
 * @property text - Texto a ser exibido.
 * @property type - Tipo do texto, usado para indicar contexto como erro, sucesso, etc.
 */
type HelperText = {
  variant?: TypographyVariant;
  text?: string;
  type?: TypographyType;
};

/**
 * Tipo `InputWrapperProps`
 *
 * Propriedades para o componente `InputWrapper`.
 * Estende as propriedades padrão de um elemento `<input>`, adicionando suporte a:
 * - Rótulo (`label`).
 * - Associação de `htmlFor` para acessibilidade.
 * - Indicador de erro (`hasError`).
 * - Estado desabilitado (`disabled`).
 * - Ícones à esquerda e à direita (`leftIcon`, `rightIcon`).
 * - Texto auxiliar (`helperText`) com controle de estilo.
 * - Conteúdo filho para customização.
 * - Classes CSS adicionais.
 */
export type InputWrapperProps = React.ComponentProps<"input"> & {
  label?: string;
  htmlFor?: string;
  hasError?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: HelperText;
  children?: ReactNode;
  className?: string;
};

/**
 * Tipo `SelectWrapperProps`
 *
 * Propriedades para o componente `SelectWrapper`.
 * Estende as propriedades do `InputWrapperProps` e adiciona suporte a:
 * - `items`: Uma lista de opções disponíveis para seleção, onde cada item contém:
 *   - `label` (string): O texto exibido para o usuário.
 *   - `value` (string): O valor associado à opção.
 *
 * @property items - Lista de opções disponíveis para o seletor.
 */
export type SelectWrapperProps = InputWrapperProps & {
  value: string;
  onChange: (value: string) => void; // corrige typo e tipo
  items: { label: string; value: string }[];
};

/**
 * Tipo `RadioWrapperProps`
 *
 * Propriedades para o componente `RadioWrapper`.
 * Define um grupo de botões de rádio com suporte a:
 * - `items`: Uma lista de opções disponíveis, onde cada item contém:
 *   - `label` (string): O texto exibido para o usuário.
 *   - `value` (string): O valor associado à opção.
 * - `defaultValue`: O valor padrão selecionado no grupo de botões de rádio.
 * - `className`: Classes CSS adicionais para estilização.
 * - `label`: O rótulo exibido acima do grupo de botões de rádio.
 * - `helperText`: Texto auxiliar exibido abaixo do grupo, com controle de estilo.
 *
 * @property items - Lista de opções disponíveis para o grupo de botões de rádio.
 * @property defaultValue - Valor padrão selecionado no grupo.
 * @property className - Classes CSS adicionais para estilização.
 * @property label - Rótulo exibido acima do grupo de botões de rádio.
 * @property helperText - Texto auxiliar exibido abaixo do grupo.
 */
export interface RadioWrapperProps {
  items: { label: string; value: string }[];
  defaultValue?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  helperText?: HelperText;
}
