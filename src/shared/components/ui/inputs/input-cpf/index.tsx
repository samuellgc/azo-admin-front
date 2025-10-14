import { Input } from "@/shared/components/shadcn/ui/input";
import { useCallback } from "react";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import type { InputWrapperProps } from "@/shared/types/inputs";
import { formatCPF } from "@/shared/utils/formatters";

/**
 * Tipo `InputCpfProps`
 *
 * Propriedades para o componente de input de CPF.
 * Estende as propriedades de `InputWrapperProps`, exceto `onChange` e `value`,
 * redefinindo `value` como string formatada e `onChange` como função que recebe o valor formatado.
 *
 * @property value - Valor atual do CPF, formatado como string.
 * @property onChange - Função chamada ao alterar o valor, recebe o CPF formatado como string.
 */
type InputCpfProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  value?: string;
  onChange?: (value: string) => void;
};

/**
 * Componente `InputCpf`
 *
 * Campo de entrada formatado para CPF, com máscara automática e controle externo de valor.
 * Utiliza `InputWrapper` para exibir rótulo e texto auxiliar, e o componente `Input` da UI base.
 *
 * @param value - Valor do campo CPF. Pode conter números ou já estar parcialmente formatado.
 * @param onChange - Função chamada com o CPF formatado sempre que o valor for alterado.
 * @param label - Rótulo exibido acima do campo.
 * @param helperText - Texto auxiliar exibido abaixo do campo.
 * @param props - Demais props herdadas de `InputWrapperProps`, exceto `onChange` e `value`.
 */
export function InputCpf({ onChange, value = "", label, helperText, ...props }: InputCpfProps) {
  const handleFormat = useCallback((value: string) => {
    return formatCPF(value);
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
        maxLength={14}
        value={handleFormat(value)}
        onChange={handleChange}
        {...props}
      />
    </InputWrapper>
  );
}
