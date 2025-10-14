import { Input } from "@/shared/components/shadcn/ui/input";
import { useCallback } from "react";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import type { InputWrapperProps } from "@/shared/types/inputs";

type InputCurrencyProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  /** Valor numérico armazenado (ex: 1234.56) */
  value?: number;
  /** Retorna o valor numérico puro */
  onChange?: (value: number | undefined) => void;
};

/**
 * Formata um número para moeda BRL (ex: 1234.56 -> R$ 1.234,56)
 */
function formatCurrency(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Converte uma string digitada (somente números) para número puro (ex: "1234" → 12.34)
 */
function parseCurrency(input: string): number | undefined {
  if (!input) return undefined;

  // Remove tudo que não for número
  const clean = input.replace(/\D/g, "");

  if (!clean) return undefined;

  // Divide por 100 pra obter casas decimais
  const num = parseFloat(clean) / 100;

  return num;
}

export function InputCurrency({ onChange, value, label, helperText, ...props }: InputCurrencyProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Mantém apenas números
      const onlyNumbers = e.target.value.replace(/\D/g, "");
      const parsed = parseCurrency(onlyNumbers);
      onChange?.(parsed);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (["ArrowLeft", "ArrowRight"].includes(e.key)) return;

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();

        const current = value ?? 0;
        const currentStr = Math.round(current * 100).toString();
        const newStr = currentStr.slice(0, -1);
        const newValue = parseCurrency(newStr);
        onChange?.(newValue);
      }
    },
    [value, onChange]
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
        value={formatCurrency(value)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </InputWrapper>
  );
}
