import { Input } from "@/shared/components/shadcn/ui/input";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import type { InputWrapperProps } from "@/shared/types/inputs";

/**
 * Componente `InputText`
 *
 * Campo de busca.
 * Utiliza `InputWrapper` para exibir rótulo e texto auxiliar, e o componente `Input` da UI base.
 *
 * @param label - Rótulo exibido acima do campo.
 * @param helperText - Texto auxiliar exibido abaixo do campo.
 * @param props - Demais props herdadas de `InputWrapperProps`.
 */
export function InputText({ label, helperText, rightIcon, leftIcon, ...props }: InputWrapperProps) {
  return (
    <InputWrapper
      helperText={helperText}
      label={label}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
      {...props}
    >
      <Input
        isWrapped
        {...props}
      />
    </InputWrapper>
  );
}
