import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/shadcn/ui/select";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import type { SelectWrapperProps } from "@/shared/types/inputs";

/**
 * Componente `SelectWrapper`.
 *
 * Campo de busca.
 * Utiliza `SelectWrapper` para exibir rótulo e texto auxiliar, e o componente `Input` da UI base.
 *
 * @param label - Rótulo exibido acima do campo.
 * @param helperText - Texto auxiliar exibido abaixo do campo.
 * @param rightIcon - Ícone do lado direto do wrapper.
 * @param leftIcon - Ícone do lado esquerdo do wrapper.
 * @param items - Opções do select.
 * @param props - Demais props herdadas de `SelectWrapperProps`.
 */
export function SelectWrapper({
  label,
  helperText,
  rightIcon,
  leftIcon,
  items,
  onChange,
  value,
  ...props
}: SelectWrapperProps) {
  return (
    <InputWrapper
      helperText={helperText}
      label={label}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
      {...props}
    >
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items?.map(item => (
            <SelectItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </InputWrapper>
  );
}
