import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { AlignItems, Direction, Gap, JustifyContent } from "@/shared/types/styles";
import { alignItemsClassMap, gapClassMap, justifyContentClassMap } from "@/shared/utils/styles";
import { cn } from "@/shared/lib/utils";

/**
 * Tipo genérico `StackProps<T>`
 *
 * Propriedades para o componente `Stack`, que organiza elementos em flex container.
 * Permite configuração de direção, alinhamento, justificação e espaçamento,
 * além de renderização dinâmica via prop `as`.
 *
 * @typeParam T - Tipo do elemento ou componente React a ser renderizado. Padrão: `"div"`.
 *
 * @property as - Elemento ou componente React a ser renderizado.
 * @property direction - Direção do layout flex: `"row"` ou `"column"`. Padrão: `"column"`.
 * @property alignment - Alinhamento dos itens no eixo transversal (`align-items`).
 * @property justify - Justificação dos itens no eixo principal (`justify-content`).
 * @property gap - Espaçamento entre os itens.
 * @property children - Conteúdo interno.
 * @property className - Classes CSS adicionais.
 *
 * Estende todas as propriedades padrão do elemento `T` (sem referência).
 */

type StackProps<T extends ElementType = "div"> = {
  as?: T;
  direction?: Direction;
  alignment?: AlignItems;
  justify?: JustifyContent;
  gap?: Gap;
  children?: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

/**
 * Componente `Stack`
 *
 * Renderiza um contêiner flexível (`flexbox`) com direção configurável e controle de alinhamento,
 * espaçamento e justificação. Pode renderizar qualquer elemento HTML via prop `as`.
 *
 * @param as - Elemento HTML ou componente React a ser renderizado. Padrão: `"div"`.
 * @param direction - Direção do empilhamento: `"row"` ou `"column"`. Padrão: `"column"`.
 * @param alignment - Alinhamento dos itens no eixo cruzado (prop `align-items`).
 * @param justify - Justificação dos itens no eixo principal (prop `justify-content`).
 * @param gap - Espaçamento entre os itens.
 * @param children - Elementos filhos a serem renderizados dentro do Stack.
 * @param className - Classes CSS adicionais.
 * @param rest - Outras props compatíveis com o elemento especificado em `as`.
 */
export function Stack<T extends ElementType = "div">({
  as,
  direction = "column",
  gap = "4",
  children,
  alignment = "stretch",
  justify = "start",
  className,
  ...rest
}: StackProps<T>) {
  const Component = as || "div";
  const flexDirection = direction === "row" ? "flex-row" : "flex-col";
  const alignItems = alignItemsClassMap[alignment] ?? "stretch";
  const justifyItems = justifyContentClassMap[justify] ?? "start";
  const gapClass = gapClassMap[gap] ?? "gap-4";

  return (
    <Component
      className={cn("flex", flexDirection, alignItems, justifyItems, gapClass, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
