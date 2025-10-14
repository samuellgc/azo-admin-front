import { Label } from "@/shared/components/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/shadcn/ui/radio-group";
import { Stack } from "@/shared/components/ui/stack";
import { cn } from "@/shared/lib/utils";
import type { RadioWrapperProps } from "@/shared/types/inputs";
import { Box } from "../../box";
import { Typography } from "../../typography";

/**
 * Componente `RadioWrapper`.
 *
 * Campo de busca.
 * Utiliza `RadioWrapper` para exibir rótulo e texto auxiliar, e o componente `Radio Group` da UI base.
 *
 * @param label - Rótulo exibido acima do campo.
 * @param helperText - Texto auxiliar exibido abaixo do campo.
 * @param items - Opções do radio.
 * @param value - Valor selecionado.
 * @param onChange - Função chamada ao alterar o valor.
 * @param props - Demais props herdadas de `RadioWrapperProps`.
 */
export function RadioWrapper({ label, helperText, className, items, value, onChange }: RadioWrapperProps) {
  return (
    <Stack
      className={cn("w-full", className)}
      gap="2"
    >
      {label && <Label>{label}</Label>}

      <Stack
        className={cn("w-full h-10 outline-none text-gray-6", className)}
        direction="row"
        alignment="center"
      >
        <Box className="flex-1">
          <RadioGroup
            value={value}
            onValueChange={onChange}
          >
            <Stack direction="row">
              {items?.map(item => (
                <Stack
                  key={item.value}
                  direction="row"
                  gap="2"
                  alignment="center"
                >
                  <RadioGroupItem
                    value={item.value}
                    id={item.value}
                  />
                  <Label htmlFor={item.value}>{item.label}</Label>
                </Stack>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
      </Stack>

      {helperText?.text ? (
        <Typography
          type={helperText.type}
          variant={helperText.variant}
        >
          {helperText.text}
        </Typography>
      ) : null}
    </Stack>
  );
}
