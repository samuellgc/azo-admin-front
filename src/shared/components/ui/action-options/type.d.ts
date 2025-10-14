/**
 * Representa uma opção de ação disponível em um menu ou lista de ações.
 */
export interface Option {
  /**
   * Texto ou elemento React exibido como rótulo da opção.
   */
  label?: string | React.ReactNode;

  /**
   * Define o tipo de opção:
   * - `"item"`: opção simples de clique.
   * - `"dialog"`: opção que abre um diálogo/modal.
   *
   * @default "item"
   */
  type?: "item" | "dialog";

  /**
   * Callback chamado quando a opção é clicada.
   */
  onClick?: () => void;

  /**
   * Identificador único da opção.
   */
  id: string | number;
}

/**
 * Propriedades do componente `ActionOptions`,
 * que agrupa opções de ações em um menu ou lista.
 */
export interface ActionOptionsProps {
  /**
   * Ícone exibido ao lado do menu ou botão de ação.
   */
  icon?: React.ReactNode;

  /**
   * Texto exibido como rótulo principal do grupo de ações.
   */
  label?: string;

  /**
   * Lista de opções disponíveis no menu.
   */
  items?: Option[];
}
