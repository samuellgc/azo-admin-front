"use client";

import { Button } from "@/shared/components/shadcn/ui/button";
import { Calendar } from "@/shared/components/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/shadcn/ui/popover";
import { cn } from "@/shared/lib/utils";
import type { InputWrapperProps } from "@/shared/types/inputs";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";

/**
 * Tipo `InputDateProps`
 *
 * Propriedades para o componente de input de CPF.
 * Estende as propriedades de `InputWrapperProps`, exceto `onChange` e `value`,
 * redefinindo `value` como string formatada e `onChange` como função que recebe o valor formatado.
 *
 * @property value - Valor atual do CPF, formatado como string.
 * @property onChange - Função chamada ao alterar o valor, recebe o CPF formatado como string.
 */
type InputDateProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  value?: Date;
  onChange?: (value?: Date) => void;
};

export function InputDate({ value, onChange, helperText, label, ...props }: InputDateProps) {
  return (
    <InputWrapper
      helperText={helperText}
      label={label}
      className="px-0"
      {...props}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn("w-full px-4 text-left font-normal", !value && "text-gray-6")}
          >
            {value ? format(value, "dd/MM/yyyy") : <span>{props.placeholder}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
}
