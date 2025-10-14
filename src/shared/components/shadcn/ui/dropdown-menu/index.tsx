"use client";

import type * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

/**
 * Componente raiz do DropdownMenu
 *
 * Container principal que gerencia o estado e comportamento do menu dropdown.
 * Baseado no Radix UI DropdownMenu.Root.
 *
 */
function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return (
    <DropdownMenuPrimitive.Root
      data-slot="dropdown-menu"
      {...props}
    />
  );
}

/**
 * Portal do DropdownMenu
 *
 * Renderiza o conteúdo do menu em um portal no DOM, permitindo que apareça
 * acima de outros elementos independente da hierarquia do DOM.
 *
 * @param container - Container onde o portal será renderizado
 */
function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal
      data-slot="dropdown-menu-portal"
      {...props}
    />
  );
}

/**
 * Trigger do DropdownMenu
 *
 * Elemento que abre/fecha o menu dropdown quando clicado.
 * Pode ser qualquer elemento que aceite eventos de clique.
 *
 * ```
 */
function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      className="outline-none"
      {...props}
    />
  );
}

/**
 * Conteúdo do DropdownMenu
 *
 * Container principal que contém todos os itens do menu dropdown.
 * Inclui animações de entrada/saída e posicionamento automático.
 *
 * @param className - Classes CSS adicionais
 * @param sideOffset - Distância do trigger em pixels (padrão: 4)
 * @param side - Lado preferido para abertura ('top' | 'right' | 'bottom' | 'left')
 * @param align - Alinhamento com o trigger ('start' | 'center' | 'end')
 *
 */
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/**
 * Grupo do DropdownMenu
 *
 * Agrupa itens relacionados do menu para melhor organização e acessibilidade.
 * Geralmente usado com DropdownMenuLabel para criar seções.
 *
 */
function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group
      data-slot="dropdown-menu-group"
      {...props}
    />
  );
}

/**
 * Item do DropdownMenu
 *
 * Item clicável do menu que executa uma ação quando selecionado.
 * Suporta diferentes variantes visuais e indentação.
 *
 * @param className - Classes CSS adicionais
 * @param inset - Se true, adiciona padding à esquerda para alinhar com itens que têm ícones
 * @param variant - Variante visual do item
 *   - 'default': Estilo padrão
 *   - 'destructive': Estilo para ações destrutivas (vermelho)
 * @param disabled - Se true, desabilita o item
 * @param onSelect - Callback executado quando o item é selecionado
 *
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative text-gray-5 flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

/**
 * Item de Checkbox do DropdownMenu
 *
 * Item com estado de checkbox que pode ser marcado/desmarcado.
 * Exibe um ícone de check quando selecionado.
 *
 * @param className - Classes CSS adicionais
 * @param children - Conteúdo do item
 * @param checked - Estado atual do checkbox (true/false/'indeterminate')
 * @param onCheckedChange - Callback executado quando o estado muda
 *
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/**
 * Grupo de Radio do DropdownMenu
 *
 * Container para itens de radio button que permite apenas uma seleção
 * por vez dentro do grupo.
 *
 * @param value - Valor atual selecionado no grupo
 * @param onValueChange - Callback executado quando a seleção muda
 *
 */
function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

/**
 * Item de Radio do DropdownMenu
 *
 * Item de radio button que faz parte de um grupo de seleção única.
 * Exibe um círculo preenchido quando selecionado.
 *
 * @param className - Classes CSS adicionais
 * @param children - Conteúdo do item
 * @param value - Valor único deste item no grupo
 * @param disabled - Se true, desabilita o item
 *
 */
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/**
 * Label do DropdownMenu
 *
 * Rótulo descritivo para seções do menu. Usado para categorizar
 * grupos de itens relacionados. Não é clicável.
 *
 * @param className - Classes CSS adicionais
 * @param inset - Se true, adiciona padding à esquerda para alinhar com itens indentados
 *
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)}
      {...props}
    />
  );
}

/**
 * Separador do DropdownMenu
 *
 * Linha horizontal que separa visualmente grupos de itens do menu.
 * Usado para criar divisões lógicas entre seções.
 *
 * @param className - Classes CSS adicionais
 *
 */
function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * Atalho do DropdownMenu
 *
 * Texto que exibe atalhos de teclado ao lado direito dos itens do menu.
 * Apenas visual - não implementa a funcionalidade do atalho.
 *
 * @param className - Classes CSS adicionais
 *
 */
function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

/**
 * Submenu do DropdownMenu
 *
 * Container para submenus aninhados. Permite criar hierarquia
 * de menus com múltiplos níveis.
 *
 */
function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return (
    <DropdownMenuPrimitive.Sub
      data-slot="dropdown-menu-sub"
      {...props}
    />
  );
}

/**
 * Trigger do Submenu
 *
 * Item que abre um submenu quando focado/clicado. Exibe automaticamente
 * um ícone de seta indicando que há um submenu disponível.
 *
 * @param className - Classes CSS adicionais
 * @param inset - Se true, adiciona padding à esquerda para alinhamento
 * @param children - Conteúdo do trigger (texto, ícones, etc.)
 *
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/**
 * Conteúdo do Submenu
 *
 * Container que contém os itens do submenu. Aparece ao lado do
 * trigger do submenu com animações similares ao menu principal.
 *
 * @param className - Classes CSS adicionais
 */
function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
