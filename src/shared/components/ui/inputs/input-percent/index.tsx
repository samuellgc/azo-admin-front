import { Input } from "@/shared/components/shadcn/ui/input";
import { useCallback } from "react";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import type { InputWrapperProps } from "@/shared/types/inputs";

type InputPercentProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  /** Valor numérico armazenado (ex: 12.34 para 12,34%) */
  value?: number;
  /** Retorna o valor numérico puro */
  onChange?: (value: number | undefined) => void;
};

const nfBR = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formata no padrão pt-BR com separador de milhar e 2 casas */
function formatPercent(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value) || !Number.isFinite(value)) {
    return "00,00%";
  }
  const nonNegative = Math.max(0, value); // por quê: não permitir negativos
  return `${nfBR.format(nonNegative)}%`;
}

/** Converte texto → número percentual, aceitando qualquer tamanho; sem negativos */
function parsePercent(input: string): number | undefined {
  if (!input) return undefined;
  const clean = input.replace(/\D/g, "");
  if (!clean) return undefined;
  const num = parseFloat(clean) / 100;
  return Math.max(0, num); // por quê: não permitir negativos
}

export function InputPercent({ onChange, value, label, helperText, ...props }: InputPercentProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parsePercent(e.target.value);
      onChange?.(parsed);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (["ArrowLeft", "ArrowRight", "Home", "End", "Tab"].includes(e.key)) return;
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        const current = Math.max(0, value ?? 0);
        const cents = Math.round(current * 100);
        const newStr = cents.toString().slice(0, -1);
        const newValue = parsePercent(newStr);
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
        value={formatPercent(value)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </InputWrapper>
  );
}
