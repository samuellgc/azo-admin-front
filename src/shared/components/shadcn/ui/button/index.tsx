import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center text-sm justify-center font-medium gap-2 whitespace-nowrap rounded cursor-pointer transition ease-out duration-300 outline-none disabled:pointer-events-none disabled:bg-gray-5 disabled:text-gray-6",
  {
    variants: {
      variant: {
        default: "bg-primary text-gray-0 hover:bg-green-5",
        secondary: "bg-gray-5 text-gray-0 hover:bg-gray-6",
        outline: "border border-gray-4 text-gray-6 hover:border-gray-5 hover:text-gray-7",
        ghost: "bg-transparent",
      },
      size: {
        default: "h-10 w-full",
        fit: "w-fit h-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Componente `Button`
 *
 * Um botão estilizado reutilizável com variantes de estilo e tamanho.
 * Baseado no sistema de utilitários do ShadCN, `class-variance-authority` (CVA) e `Slot` da Radix UI.
 *
 * @param className - Classes CSS adicionais para estilização personalizada.
 * @param variant - Variante visual do botão. Valores disponíveis:
 *   - `"default"`: Botão com fundo primário e texto claro (padrão).
 *   - `"secondary"`: Fundo cinza com texto claro.
 *   - `"outline"`: Contorno cinza com texto escuro.
 *   - `"ghost"`: Transparente, sem fundo nem borda.
 * @param size - Tamanho do botão. Valores disponíveis:
 *   - `"default"`: Altura `h-10` e largura total `w-full` (padrão).
 *   - `"fit"`: Altura e largura ajustadas ao conteúdo.
 * @param asChild - Se verdadeiro, renderiza como componente filho via `Slot` (Radix), permitindo substituir a tag `button` por outra como `a`, `Link`, etc.
 * @param props - Outras propriedades herdadas de `React.ComponentProps<"button">`.
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
