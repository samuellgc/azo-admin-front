import { Input } from "@/shared/components/shadcn/ui/input";
import type { InputWrapperProps } from "@/shared/types/inputs";
import { formatCnpj } from "@/shared/utils/formatters";
import { useCallback } from "react";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";

/**
 * Tipo `InputCnpjProps`
 *
 * Propriedades para o componente de input de CNPJ.
 * Estende as propriedades de `InputWrapperProps`, exceto `onChange` e `value`,
 * redefinindo `value` como string formatada e `onChange` como função que recebe o valor formatado.
 *
 * @property value - Valor atual do CNPJ, formatado como string.
 * @property onChange - Função chamada ao alterar o valor, recebe o CNPJ formatado como string.
 */
type InputCnpjProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  value?: string;
  onChange?: (value: string) => void;
};

/**
 * Componente `InputCnpj`
 *
 * Campo de entrada formatado para CNPJ, com máscara automática.
 * Aplica a formatação conforme o usuário digita, mantendo o controle externo do valor.
 *
 * @param value - Valor atual do campo, pode ser string com ou sem formatação.
 * @param onChange - Função chamada ao alterar o valor. Recebe o evento com o CNPJ formatado.
 * @param props - Demais propriedades do elemento `<input>`.
 */
export function InputCnpj({ onChange, value, helperText, label, ...props }: InputCnpjProps) {
  const handleFormat = useCallback((value: string) => {
    return formatCnpj(value);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formatted = handleFormat(rawValue);
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
        {...props}
        inputMode="numeric"
        maxLength={18}
        value={typeof value === "string" ? handleFormat(value) : value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
}
