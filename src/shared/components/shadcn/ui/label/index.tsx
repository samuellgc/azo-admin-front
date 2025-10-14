"use client";

import type * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/shared/lib/utils";

/**
 * Componente `Label`
 *
 * Um componente de rótulo reutilizável baseado no `@radix-ui/react-label`, com suporte a estilos personalizados.
 *
 * @param className - Classes CSS adicionais para estilização personalizada.
 * @param ...props - Outras propriedades padrão de um elemento `<label>`.
 *
 */
function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn("font-medium text-sm text-gray-7 align-middle", className)}
      {...props}
    />
  );
}

export { Label };
