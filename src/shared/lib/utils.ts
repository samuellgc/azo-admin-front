import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Função `cn`
 *
 * Combina múltiplos valores de classe CSS em uma única string,
 * aplicando a fusão inteligente de classes do Tailwind para evitar conflitos.
 *
 * @param inputs - Lista de valores de classe que podem ser strings, arrays ou objetos (como aceito pelo `clsx`).
 *
 * @returns Uma string única com classes combinadas e mescladas pelo `tailwind-merge`.
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
