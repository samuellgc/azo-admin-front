import { cn } from "@/shared/lib/utils";
import LinkNext from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Componente `Link`
 *
 * Wrapper para o componente `Link` do Next.js, com estilo padrão e suporte a classes adicionais.
 *
 * @param href - href de destino do link.
 * @param children - Conteúdo interno do link.
 * @param className - Classes CSS adicionais para estilização.
 * @param props - Outras propriedades do link.
 */
export function Link({ children, href, className, ...props }: LinkProps) {
  return (
    <LinkNext
      className={cn("text-primary", className)}
      href={href}
      {...props}
    >
      {children}
    </LinkNext>
  );
}
