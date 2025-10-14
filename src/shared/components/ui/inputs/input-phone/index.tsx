import { Input } from "@/shared/components/shadcn/ui/input";
import { useCallback } from "react";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import type { InputWrapperProps } from "@/shared/types/inputs";
import { formatPhone } from "@/shared/utils/formatters";

/**
 * Tipo `InputPhoneProps`
 *
 * Propriedades para o componente de input de telefone.
 * Estende as propriedades de `InputWrapperProps`, exceto `onChange` e `value`,
 * redefinindo `value` como string formatada e `onChange` como função que recebe o valor formatado.
 *
 * @property value - Valor atual do telefone, formatado como string.
 * @property onChange - Função chamada ao alterar o valor, recebe o telefone formatado como string.
 */
type InputPhoneProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  value?: string;
  onChange?: (value: string) => void;
};

/**
 * Componente `InputPhone`
 *
 * Campo de entrada formatado para telefone, com máscara automática e controle externo de valor.
 * Utiliza `InputWrapper` para exibir rótulo e texto auxiliar, e o componente `Input` da UI base.
 *
 * @param value - Valor do campo telefone. Pode conter números ou já estar parcialmente formatado.
 * @param onChange - Função chamada com o telefone formatado sempre que o valor for alterado.
 * @param label - Rótulo exibido acima do campo.
 * @param helperText - Texto auxiliar exibido abaixo do campo.
 * @param props - Demais props herdadas de `InputWrapperProps`, exceto `onChange` e `value`.
 */
export function InputPhone({ onChange, value = "", label, helperText, ...props }: InputPhoneProps) {
  const handleFormat = useCallback((value: string) => {
    return formatPhone(value);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = handleFormat(e.target.value);
      onChange?.(formatted);
    },
    [onChange, handleFormat]
  );

  return (
    <InputWrapper
      helperText={helperText}
      label={label}
      {...props}
    >
      <Input
        isWrapped
        inputMode="numeric"
        maxLength={15}
        value={handleFormat(value)}
        onChange={handleChange}
        {...props}
      />
    </InputWrapper>
  );
}
