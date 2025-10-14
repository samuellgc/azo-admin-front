import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/shadcn/ui/dropdown-menu";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import type { ActionOptionsProps } from "./type";

/**
 * Componente `ActionOptions`
 *
 * O `ActionOptions` é responsável por renderizar o menu de ações do usuário.
 */
export function ActionOptions({ icon, label, items }: ActionOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer outline-none">
        <Stack
          alignment="center"
          justify="center"
          gap="2"
        >
          {icon && icon}
          {label && <Typography variant="paragraph">{label}</Typography>}
        </Stack>
      </DropdownMenuTrigger>
      {items && items.length > 0 && (
        <DropdownMenuContent className="grid gap-2 bg-gray-0 p-0 rounded-sm">
          {items?.map(item => (
            <DropdownMenuItem
              asChild
              key={item.id}
              className="hover:bg-gray-3 p-2 hover:cursor-pointer"
            >
              {item.type === "dialog" ? (
                <DropdownMenuItem
                  asChild
                  key={item.id}
                >
                  <Typography
                    className="hover:bg-gray-3 p-0 text-sm text-gray-5 justify-start h-fit hover:cursor-pointer w-full"
                    variant="auxiliary"
                  >
                    {item.label}
                  </Typography>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  key={item.id}
                  onClick={item.onClick}
                  className="hover:bg-gray-3 p-2 hover:cursor-pointer"
                >
                  {item.label}
                </DropdownMenuItem>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
