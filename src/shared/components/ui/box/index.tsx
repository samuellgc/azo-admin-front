import type { ElementType } from "react";
import { cn } from "@/shared/lib/utils";
import type { ElementProps } from "@/shared/types/styles";

type BoxProps<T extends ElementType = "div"> = ElementProps<T>;

/**
 * Componente genérico `Box`
 *
 * Um wrapper flexível que pode renderizar qualquer tipo de elemento HTML
 * ou componente React, com suporte a `className`, `children` e todas as
 * props nativas do elemento passado via `as`.
 *
 * @typeParam T - Tipo do elemento a ser renderizado, como `"div"`, `"section"`, `"a"`, etc.
 *
 * @param {ElementType} [as="div"] - Elemento ou componente React a ser renderizado.
 * @param {string} [className] - Classes CSS adicionais, combinadas com a função `cn`.
 * @param {React.ReactNode} [children] - Conteúdo interno do componente.
 * @param {...ElementProps<T>} rest - Demais props específicas do elemento renderizado.
 *
 */
export function Box<T extends ElementType = "div">({ as, className, children, ...rest }: BoxProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
