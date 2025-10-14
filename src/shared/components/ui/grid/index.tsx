import type { ElementType } from "react";
import { cn } from "@/shared/lib/utils";
import type { ElementProps, Gap, GridCols } from "@/shared/types/styles";
import { gapClassMap, gridColsClassMap } from "@/shared/utils/styles";

type GridProps<T extends ElementType = "div"> = ElementProps<T> & {
  cols?: GridCols;
  gap?: Gap;
};

/**
 * Componente `Grid`
 *
 * Renderiza um container com display `grid`, permitindo controle sobre colunas e espaçamento.
 * Suporta renderização dinâmica de elementos via prop `as`.
 *
 * @param as - Elemento HTML ou componente React a ser renderizado. Padrão: `"div"`.
 * @param cols - Quantidade de colunas do grid, mapeadas via `gridColsClassMap`. Padrão: `"1"`.
 * @param gap - Espaçamento entre os itens do grid, mapeado via `gapClassMap`. Padrão: `"4"`.
 * @param className - Classes CSS adicionais.
 * @param children - Conteúdo interno do grid.
 * @param rest - Outras props compatíveis com o elemento passado via `as`.
 */
export function Grid<T extends ElementType = "div">({
  as,
  cols = "1",
  gap = "4",
  className,
  children,
  ...rest
}: GridProps<T>) {
  const Component = as || "div";

  const gridColsClass = gridColsClassMap[cols];
  const gapClass = gapClassMap[gap];

  return (
    <Component
      className={cn("grid", gridColsClass, gapClass, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
