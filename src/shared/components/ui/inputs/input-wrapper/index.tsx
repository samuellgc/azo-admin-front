import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/components/shadcn/ui/label";
import { Stack } from "@/shared/components/ui/stack";
import { Box } from "@/shared/components/ui/box";
import type { InputWrapperProps } from "@/shared/types/inputs";
import { Typography } from "@/shared/components/ui/typography";

/**
 * Componente `InputWrapper`
 *
 * Wrapper para inputs que adiciona suporte a label, ícones laterais, texto auxiliar,
 * estados de erro e desabilitado, além de estilização consistente.
 *
 * @param label - Texto do rótulo associado ao input.
 * @param leftIcon - Elemento React exibido antes do input, geralmente um ícone.
 * @param rightIcon - Elemento React exibido após o input, geralmente um ícone ou botão.
 * @param helperText - Texto auxiliar exibido abaixo do input, com tipo e variante para estilo.
 * @param children - Componente input ou similar que será encapsulado.
 * @param className - Classes CSS adicionais para customização do wrapper externo.
 * @param hasError - Indica estado de erro, ajusta estilos visuais. Padrão: `false`.
 * @param disabled - Indica se o campo está desabilitado, ajusta estilos. Padrão: `false`.
 * @param props - Outras propriedades, como `id`, que podem ser passadas para o label e acessibilidade.
 */

export function InputWrapper({
  label,
  leftIcon,
  rightIcon,
  helperText,
  children,
  className,
  hasError = false,
  disabled = false,
  ...props
}: InputWrapperProps) {
  return (
    <Stack
      className={cn("w-full", className)}
      gap="2"
    >
      {label && <Label htmlFor={props.id}>{label}</Label>}

      <Stack
        className={cn(
          "w-full h-10 bg-background outline-none text-gray-6 border border-gray-3 rounded px-4",
          "placeholder:text-sm",
          "hover:border-gray-5",
          "focus:border-green-7",
          disabled && "bg-gray-4 border-gray-3",
          className
        )}
        direction="row"
        alignment="center"
      >
        {leftIcon && leftIcon}
        <Box className="flex-1">{children}</Box>
        {rightIcon && rightIcon}
      </Stack>

      {helperText?.text ? (
        <Typography
          type={helperText.type}
          variant={helperText.variant}
        >
          {helperText.text}
        </Typography>
      ) : null}
    </Stack>
  );
}
