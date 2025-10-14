"use client";

import type * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

/**
 * Gerencia o estado e o comportamento geral do componente de seleção.
 * @param {React.ComponentProps<typeof SelectPrimitive.Root>} props - Propriedades passadas para o `SelectPrimitive.Root`.
 */
function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return (
    <SelectPrimitive.Root
      data-slot="select"
      {...props}
    />
  );
}

/**
 * Utilizado para organizar opções em categorias.
 * @param {React.ComponentProps<typeof SelectPrimitive.Group>} props - Propriedades passadas para o `SelectPrimitive.Group`.
 */
function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      {...props}
    />
  );
}

/**
 * Geralmente usado dentro do `SelectTrigger` para mostrar a opção atualmente escolhida.
 * @param {React.ComponentProps<typeof SelectPrimitive.Value>} props - Propriedades passadas para o `SelectPrimitive.Value`.
 */
function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      {...props}
    />
  );
}

/**
 * Exibe o valor selecionado e um ícone de seta para indicar a funcionalidade de dropdown.
 * @param {object} props - Propriedades do componente.
 * @param {string} [props.className] - Classes CSS adicionais para estilização.
 * @param {"sm" | "default"} [props.size="default"] - Define o tamanho do gatilho.
 * @param {React.ReactNode} props.children - Conteúdo a ser renderizado dentro do gatilho (geralmente `SelectValue`).
 * @param {React.ComponentProps<typeof SelectPrimitive.Trigger>} rest - Outras propriedades passadas para o `SelectPrimitive.Trigger`.
 */
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-2 bg-transparent text-sm whitespace-nowrap transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:\'size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-6 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/**
 * Gerencia o posicionamento, animações e rolagem do conteúdo do dropdown.
 * @param {object} props - Propriedades do componente.
 * @param {string} [props.className] - Classes CSS adicionais para estilização.
 * @param {React.ReactNode} props.children - Conteúdo a ser renderizado dentro do Select (geralmente `SelectGroup` ou `SelectItem`).
 * @param {"popper" | "item-aligned"} [props.position="popper"] - Define a estratégia de posicionamento do conteúdo.
 * @param {React.ComponentProps<typeof SelectPrimitive.Content>} rest - Outras propriedades passadas para o `SelectPrimitive.Content`.
 */
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-gray-0 text-gray-7 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/**
 * Exibe um ícone de check quando selecionado e pode conter texto ou outros elementos.
 * @param {object} props - Propriedades do componente.
 * @param {string} [props.className] - Classes CSS adicionais para estilização.
 * @param {React.ReactNode} props.children - Conteúdo a ser renderizado dentro do item (geralmente o texto da opção).
 * @param {React.ComponentProps<typeof SelectPrimitive.Item>} rest - Outras propriedades passadas para o `SelectPrimitive.Item`.
 */
function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*=\'text-\'])]:\'text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:\'size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-8" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * @param {object} props - Propriedades do componente.
 * @param {string} [props.className] - Classes CSS adicionais para estilização.
 * @param {React.ComponentProps<typeof SelectPrimitive.Separator>} rest - Outras propriedades passadas para o `SelectPrimitive.Separator`.
 */
function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * Exibe um ícone de seta para cima.
 * @param {object} props - Propriedades do componente.
 * @param {string} [props.className] - Classes CSS adicionais para estilização.
 * @param {React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>} rest - Outras propriedades passadas para o `SelectPrimitive.ScrollUpButton`.
 */
function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-6" />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * Exibe um ícone de seta para baixo.
 * @param {object} props - Propriedades do componente.
 * @param {string} [props.className] - Classes CSS adicionais para estilização.
 * @param {React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>} rest - Outras propriedades passadas para o `SelectPrimitive.ScrollDownButton`.
 */
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-6" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
