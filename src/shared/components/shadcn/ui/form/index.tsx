"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/shared/lib/utils";

/**
 * @property {TName} name - O nome do campo do formulário.
 * @template TFieldValues - O tipo dos valores do formulário.
 * @template TName - O tipo do caminho do campo dentro dos valores do formulário.
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

/**
 * @constant
 * @description Contexto para fornecer o nome do campo do formulário aos componentes filhos.
 */
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

/**
 * @property {string} id - Um identificador único para o item do formulário.
 */
type FormItemContextValue = {
  id: string;
};

/**
 * @constant
 * @description Contexto para fornecer um ID único para itens de formulário aos componentes filhos.
 */
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

/**
 * @component
 * @description Um componente wrapper que fornece o `FormProvider` do `react-hook-form`.
 * Este componente deve ser usado na raiz do seu formulário para fornecer contexto de formulário a todos os seus filhos.
 */
const Form = FormProvider;

/**
 * @component
 * @template TFieldValues - O tipo dos valores do formulário.
 * @template TName - O tipo do caminho do campo dentro dos valores do formulário.
 * @param {ControllerProps<TFieldValues, TName>} props - Propriedades passadas para o componente `Controller` do `react-hook-form`.
 * @description Este componente vincula um campo de formulário ao estado do `react-hook-form`.
 * Ele deve envolver seus inputs de formulário individuais.
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/**
 * @hook
 * @throws {Error} Se `useFormField` não for usado dentro de um componente `<FormField>`.
 * @property {string} id - O ID único para o item do formulário.
 * @property {FieldPath<TFieldValues>} name - O nome do campo do formulário.
 * @property {string} formItemId - O ID para o elemento de controle do formulário.
 * @property {string} formDescriptionId - O ID para o elemento de descrição do formulário.
 * @property {string} formMessageId - O ID para o elemento de mensagem (erro) do formulário.
 * @property {boolean} invalid - Indica se o campo possui um erro de validação.
 * @property {FieldError | undefined} error - O objeto de erro para o campo, se houver.
 * @description Um hook personalizado para acessar o estado e os IDs de utilidade para um campo de formulário.
 * Ele deve ser usado dentro de componentes que são filhos de `FormField`.
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

/**
 * @component
 * @param {React.ComponentProps<"div">} props - Propriedades para o elemento div, incluindo `className`.
 * @description Um componente contêiner para um único item de formulário (por exemplo, rótulo, input, descrição, mensagem de erro).
 * Ele gera automaticamente um ID único para fins de acessibilidade.
 */
function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

/**
 * @component
 * @param {React.ComponentProps<typeof Slot>} props - Propriedades para o componente `Slot` do `@radix-ui/react-slot`.
 * @description Este componente atua como o elemento de controle de formulário real (por exemplo, `Input`, `Select`, `Textarea`).
 * Ele aplica automaticamente os atributos `id`, `aria-describedby` e `aria-invalid` com base no estado do campo do formulário.
 * Ele deve ser usado como filho de `FormItem`.
 */
function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
}

/**
 * @exports useFormField
 * @exports Form
 * @exports FormItem
 * @exports FormControl
 * @exports FormField
 */
export { useFormField, Form, FormItem, FormControl, FormField };
