import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import type { TypographyType, TypographyVariant } from "@/shared/types/typography";

/**
 * Mapeamento `variantTagMap`
 *
 * Associa cada variante tipográfica a uma tag HTML semântica correspondente.
 *
 * - `title` → `<h1>`
 * - `subtitle` → `<h2>`
 * - `paragraph` → `<p>`
 * - `auxiliary` → `<span>`
 */
const variantTagMap: Record<TypographyVariant, ElementType> = {
  title: "h1",
  subtitle: "h2",
  paragraph: "p",
  auxiliary: "span",
};

/**
 * Interface `TypographyProps`
 *
 * Propriedades para o componente `Typography`.
 *
 * @property children - Conteúdo textual ou elementos filhos a serem renderizados.
 * @property className - Classes CSS adicionais para customização do estilo.
 * @property variant - Variante tipográfica que determina estilo e tag semântica. Padrão: `"paragraph"`.
 * @property type - Tipo contextual para estilização (ex: cor). Padrão: `"default"`.
 */
interface TypographyProps {
  children: ReactNode;
  className?: string;
  variant?: TypographyVariant;
  type?: TypographyType;
}

/**
 * Componente `Typography`
 *
 * Renderiza texto com variações semânticas e visuais baseadas nas props `variant` e `type`.
 * Utiliza tags HTML apropriadas de acordo com o `variant`.
 *
 * @param children - Conteúdo textual a ser exibido.
 * @param className - Classes CSS adicionais.
 * @param variant - Variante tipográfica que define estilo e semântica. Padrão: `"paragraph"`.
 * @param type - Tipo do texto, controlando a cor ou contexto semântico. Padrão: `"default"`.
 */
export function Typography({ children, className, variant = "paragraph", type = "default" }: TypographyProps) {
  const Component = variantTagMap[variant] || "span";

  const baseClasses = {
    title: "font-bold text-2xl",
    subtitle: "font-bold text-base",
    paragraph: "text-sm font-medium",
    auxiliary: "text-xs font-medium",
  };

  const typeClasses = {
    default: "text-gray-7",
    error: "text-error",
    success: "text-success",
  };

  return (
    <Component className={cn("align-middle", baseClasses[variant], typeClasses[type], className)}>{children}</Component>
  );
}
