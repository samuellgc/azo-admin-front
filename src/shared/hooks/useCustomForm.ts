// biome-ignore-all lint/suspicious/noExplicitAny: usage of 'any' is intentional for generic context
"use client";

import { type UseFormProps, useForm as useReactHookForm, type FieldValues } from "react-hook-form";

/**
 * Hook `useCustomForm`
 *
 * Wrapper genérico para o hook `useForm` da biblioteca `react-hook-form`.
 * Permite tipagem customizada dos valores do formulário, contexto e valores transformados.
 *
 * @typeParam TFieldValues - Tipo dos valores do formulário (padrão: `FieldValues`).
 * @typeParam TContext - Tipo do contexto para o formulário (padrão: `any`).
 * @typeParam TTransformedValues - Tipo dos valores após transformação (padrão: igual a `TFieldValues`).
 *
 * @param props - Propriedades passadas para o `useForm` original.
 *
 * @returns O objeto retornado pelo `useForm`, com métodos e propriedades para controle do formulário.
 */

export function useCustomForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(props?: UseFormProps<TFieldValues, TContext, TTransformedValues>) {
  const form = useReactHookForm(props);

  return form;
}
