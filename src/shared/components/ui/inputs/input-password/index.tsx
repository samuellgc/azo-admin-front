import { Input } from "@/shared/components/shadcn/ui/input";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import clsx from "clsx";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { Grid } from "@/shared/components/ui/grid";
import { Box } from "@/shared/components/ui/box";
import { Icon } from "@/shared/components/ui/icon";
import type { InputWrapperProps } from "@/shared/types/inputs";

/**
 * Tipo `InputPasswordProps`
 *
 * Propriedades para o componente de input de senha.
 * Estende `InputWrapperProps`, omitindo `onChange` e `value`,
 * com controle de valor e mudança personalizados, além da opção de exibir validação.
 *
 * @property value - Valor atual da senha.
 * @property onChange - Função chamada ao alterar o valor da senha, recebe a senha como string.
 * @property showValidation - Indica se as regras de validação da senha devem ser exibidas. Padrão: `false`.
 */
type InputPasswordProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  value?: string;
  onChange?: (value: string) => void;
  showValidation?: boolean;
};

/**
 * Componente `InputPassword`
 *
 * Campo de senha com opção de mostrar/ocultar o valor e validação visual das regras de segurança.
 *
 * @param value - Valor da senha.
 * @param onChange - Função chamada quando o valor da senha é alterado, recebe a senha formatada.
 * @param showValidation - Exibe as regras de validação e a força da senha. Padrão: `false`.
 * @param id - ID do input. Se não fornecido, usa `"password-input"`.
 * @param helperText - Texto auxiliar exibido abaixo do campo.
 * @param props - Outras props herdadas de `InputWrapperProps`.
 *
 * Regras de validação aplicadas:
 * - Mínimo de 10 caracteres.
 * - Contém pelo menos uma letra minúscula.
 * - Contém pelo menos uma letra maiúscula.
 * - Contém pelo menos um número.
 * - Contém pelo menos um caractere especial.
 * - Não possui sequência numérica (ex: "123", "456").
 * - Não possui espaços.
 */
export function InputPassword({
  showValidation = false,
  value,
  onChange,
  label,
  helperText,
  ...props
}: InputPasswordProps) {
  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  const validatePassword = useCallback((value: string) => {
    const noSequentialNumbersValidation = value.length < 3 ? false : !/012|123|234|345|456|567|678|789|890/.test(value);
    const noSpacesValidation = value.length === 0 ? false : !/\s/.test(value);
    const rules = {
      minLength: value.length >= 10,
      hasLowercase: /[a-z]/.test(value),
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecial: /[^A-Za-z0-9]/.test(value),
      noSequentialNumbers: noSequentialNumbersValidation,
      noSpaces: noSpacesValidation,
    };

    const passed = Object.values(rules).filter(Boolean).length;

    const strength =
      value && passed > 0 ? (passed >= 6 ? "Senha forte" : passed >= 4 ? "Senha média" : "Senha fraca") : null;

    return { rules, strength };
  }, []);

  const { rules, strength } = useMemo(() => {
    return validatePassword(typeof value === "string" ? value : "");
  }, [value, validatePassword]);

  const ruleItem = useCallback(
    (valid: boolean, text: string) => (
      <Stack
        className="text-sm"
        key={text}
        direction="row"
        alignment="center"
        gap="1"
      >
        {valid ? <CheckCircle className="text-green-500 w-4 h-4" /> : <XCircle className="text-red-500 w-4 h-4" />}
        <Typography>{text}</Typography>
      </Stack>
    ),
    []
  );

  return (
    <Stack>
      <InputWrapper
        rightIcon={<Icon onClick={toggleVisible}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</Icon>}
        helperText={helperText}
        label={label}
        {...props}
      >
        <Input
          id={props.id}
          isWrapped
          type={visible ? "text" : "password"}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          autoComplete="new-password"
          {...props}
        />
      </InputWrapper>

      {showValidation && typeof value === "string" && (
        <Stack className="text-sm">
          <Stack gap="1">
            <Box className="h-1 w-full rounded bg-white relative overflow-hidden">
              <Box
                className={clsx("h-full transition-all duration-300", {
                  "bg-red-500 w-1/3": strength === "Senha fraca",
                  "bg-yellow-500 w-2/3": strength === "Senha média",
                  "bg-green-500 w-full": strength === "Senha forte",
                })}
              />
            </Box>
            <Typography
              className="text-gray-7 text-right"
              variant="auxiliary"
              type="default"
            >
              {strength}
            </Typography>
          </Stack>
          <Grid gap="1">
            {ruleItem(rules.minLength, "Mínimo 10 caracteres")}
            {ruleItem(rules.hasLowercase, "1 ou mais minúsculas")}
            {ruleItem(rules.hasUppercase, "1 ou mais maiúsculas")}
            {ruleItem(rules.hasNumber, "1 ou mais numéricos")}
            {ruleItem(rules.hasSpecial, "1 ou mais especiais")}
            {ruleItem(rules.noSequentialNumbers, "Sem sequência numérica")}
            {ruleItem(rules.noSpaces, "Sem espaços")}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
