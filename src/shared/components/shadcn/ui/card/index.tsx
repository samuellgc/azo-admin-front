import type * as React from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Componente `Card`
 *
 * Um container visual reutilizável, com aparência de "cartão", ideal para encapsular conteúdos como formulários, listas, ou qualquer informação agrupada.
 *
 * - Utiliza classes utilitárias para estilização padrão (`bg-card`, `shadow-card`, `rounded`, etc.).
 * - Permite passar classes personalizadas adicionais via `className`.
 * - Repassa todas as props válidas de uma `<div>`.
 *
 * @param className - Classes CSS adicionais para personalização.
 * @param props - Propriedades padrão de uma `div`, como `children`, `id`, `onClick`, etc.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("bg-card shadow-card flex flex-col rounded p-6", className)}
      {...props}
    />
  );
}

export { Card };
