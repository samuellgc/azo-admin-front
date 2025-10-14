import { Input } from "@/shared/components/shadcn/ui/input";
import { useCallback } from "react";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import type { InputWrapperProps } from "@/shared/types/inputs";
import { formatCep } from "@/shared/utils/formatters";

/**
 * Tipo `InputCepProps`
 *
 * Propriedades para o componente de input de CEP.
 * Estende as propriedades de `InputWrapperProps`, exceto `onChange` e `value`,
 * redefinindo `value` como string formatada e `onChange` como função que recebe o valor formatado.
 *
 * @property value - Valor atual do CEP, formatado como string.
 * @property onChange - Função chamada ao alterar o valor, recebe o CEP formatado como string.
 */
type InputCepProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  value?: string;
  onChange?: (value: string) => void;
};

/**
 * Componente `InputCep`
 *
 * Campo de entrada formatado para CEP, com máscara automática e controle externo de valor.
 * Utiliza `InputWrapper` para exibir rótulo e texto auxiliar, e o componente `Input` da UI base.
 *
 * @param value - Valor do campo CEP. Pode conter números ou já estar parcialmente formatado.
 * @param onChange - Função chamada com o CEP formatado sempre que o valor for alterado.
 * @param label - Rótulo exibido acima do campo.
 * @param helperText - Texto auxiliar exibido abaixo do campo.
 * @param props - Demais props herdadas de `InputWrapperProps`, exceto `onChange` e `value`.
 */
export function InputCep({ onChange, value = "", label, helperText, ...props }: InputCepProps) {
  const handleFormat = useCallback((value: string) => {
    return formatCep(value);
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
        maxLength={10}
        value={handleFormat(value)}
        onChange={handleChange}
        {...props}
      />
    </InputWrapper>
  );
}
