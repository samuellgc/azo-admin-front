import type * as React from "react";

import { cn } from "@/shared/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  isWrapped?: boolean;
}
/**
 * Componente `Input`
 *
 * Um campo de entrada reutilizável com suporte a estilos personalizados e comportamento configurável.
 *
 * @param className - Classes CSS adicionais para estilização personalizada.
 * @param type - Tipo do input (ex.: `"text"`, `"password"`, `"email"`). Padrão: `"text"`.
 * @param isWrapped - Indica se o input está encapsulado por um wrapper externo.
 *                    Quando `true`, desativa estilos padrão de altura, borda e fundo. Padrão: `false`.
 * @param disabled - Define se o campo está desabilitado. Aplica estilos visuais para indicar o estado.
 * @param ...props - Outras propriedades padrão de um elemento `<input>`.
 */
function Input({ className, type, isWrapped = false, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full outline-none bg-transparent text-gray-6 border-none placeholder:text-sm",
        !isWrapped && "h-10 bg-background border border-gray-3 rounded px-4 hover:border-gray-5 focus:border-green-7",
        props.disabled && !isWrapped && "bg-gray-4 border-gray-3",
        className
      )}
      {...props}
    />
  );
}

export { Input };
