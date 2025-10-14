import type { RowSelectionState, SortingState } from "@tanstack/react-table";

/**
 * Representa a configuração de paginação da tabela.
 */
export interface Pagination {
  /** Página atual exibida (1-based). */
  currentPage: number;

  /** Número total de páginas disponíveis. */
  totalPages: number;

  /** Número total de itens disponíveis na listagem. */
  totalItems: number;

  /** Quantidade de itens por página. */
  perPage: number;

  /** Índice do primeiro item exibido na página atual (ex: 1). */
  start: number;

  /** Índice do último item exibido na página atual (ex: 10). */
  end: number;
}

/**
 * Define a configuração de uma coluna da tabela.
 *
 * @template T Tipo da linha de dados.
 */
export type Column<T> = {
  /** Chave do campo no objeto de dados. */
  key: keyof T | string;

  /** Rótulo exibido no cabeçalho da coluna. */
  label: string;

  /** Classe CSS opcional aplicada ao cabeçalho da coluna. */
  className?: string;

  /** Classe CSS opcional aplicada às células da coluna. */
  cellClassName?: string;

  /**
   * Função opcional para renderização customizada de células.
   * Caso não seja fornecida, o valor bruto de `row[col.key]` será exibido.
   *
   * @param row Linha de dados original.
   */
  render?: (row: T) => React.ReactNode;
};

/**
 * Props do componente `DataTable`.
 *
 * @template T Tipo da linha de dados.
 */
export interface DataTableProps<T> {
  /** Lista de colunas que definem como os dados serão exibidos. */
  columns: Column<T>[];

  /**
   * Lista de dados que serão renderizados na tabela.
   * Cada item pode opcionalmente incluir:
   * - `id`: identificador único da linha.
   * - `rowClassName`: classe CSS extra aplicada à linha.
   */
  data: (T & { id?: string | number; rowClassName?: string })[];

  /** Habilita ou desabilita a ordenação de colunas. */
  enableSorting?: boolean;

  /** Habilita ou desabilita a paginação. */
  enablePagination?: boolean;

  /** Habilita ou desabilita a seleção de linhas. */
  enableRowSelection?: boolean;

  /** Configuração da paginação (página atual, total de itens, etc). */
  pagination?: Pagination;

  /** Estado controlado da ordenação das colunas. */
  sorting?: SortingState;

  /** Callback chamado sempre que a ordenação mudar. */
  onSortingChange?: (sorting: SortingState) => void;

  /** Estado controlado da seleção de linhas. */
  rowSelection?: RowSelectionState;

  /** Callback chamado sempre que a seleção de linhas mudar. */
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;

  /** Callback chamado quando o usuário muda de página. */
  onPageChange?: (page: number) => void;
}
