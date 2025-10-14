import { Button } from "@/shared/components/shadcn/ui/button";

/**
 * Componente `Icon`
 *
 * Renderiza um botão estilizado com variante `ghost` e tamanho ajustado (`fit`),
 * ideal para ícones. Utiliza o componente `Button` da biblioteca ShadCN.
 *
 * @param children - Elemento(s) filho(s), geralmente um ícone.
 * @param type - Tipo do botão. Padrão: `"button"`.
 * @param onClick - Função executada ao clicar no botão.
 * @param className - Classes CSS adicionais.
 * @param props - Demais propriedades do botão, herdadas de `ButtonHTMLAttributes`.
 */
export function Icon({
  children,
  type = "button",
  ...props
}: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      size="fit"
      type={type}
      variant="ghost"
      onClick={props.onClick}
      className={props.className}
    >
      {children}
    </Button>
  );
}
