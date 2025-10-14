import { Input } from "@/shared/components/shadcn/ui/input";
import { useCallback } from "react";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import type { InputWrapperProps } from "@/shared/types/inputs";

type InputNumberProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  /** Valor numérico armazenado */
  value?: number;
  /** Retorna o valor numérico puro */
  onChange?: (value: number | undefined) => void;
};

export function InputNumber({ onChange, value, label, helperText, ...props }: InputNumberProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyDigits = e.target.value.replace(/\D/g, ""); // mantém só números
      const num = onlyDigits ? parseInt(onlyDigits, 10) : undefined;
      onChange?.(num);
    },
    [onChange]
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
        pattern="\d*"
        value={value !== undefined ? String(value) : ""}
        onChange={handleChange}
        {...props}
      />
    </InputWrapper>
  );
}
