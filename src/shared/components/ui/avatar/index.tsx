import Image, { type ImageProps } from "next/image";
import { cn } from "@/shared/lib/utils";
import defaultAvatar from "@/shared/images/avatar-placeholder.png";

/**
 * Tipo `AvatarProps`
 *
 * Propriedades para o componente `Avatar`.
 * Estende as propriedades de `ImageProps`, exceto `src` e `alt`,
 * que são redefinidos para maior controle.
 *
 * @property src - URL ou fonte da imagem do avatar. Opcional, usa `fallbackSrc` se ausente.
 * @property alt - Texto alternativo para acessibilidade. Padrão: `"Avatar"`.
 * @property size - Tamanho (largura e altura) do avatar em pixels. Padrão: 40.
 * @property withBlur - Se verdadeiro, aplica efeito de desfoque no placeholder da imagem.
 * @property fallbackSrc - Fonte da imagem usada como fallback se `src` não for fornecida.
 */

type AvatarProps = Omit<ImageProps, "src" | "alt"> & {
  src?: ImageProps["src"];
  alt?: string;
  size?: number;
  withBlur?: boolean;
  fallbackSrc?: ImageProps["src"];
};

/**
 * Componente `Avatar`
 *
 * Renderiza uma imagem de avatar com tamanho, bordas arredondadas e suporte a fallback.
 *
 * @param src - URL da imagem do avatar. Se não for fornecida, `fallbackSrc` será usada.
 * @param alt - Texto alternativo da imagem. Padrão: `"Avatar"`.
 * @param size - Tamanho (largura e altura) do avatar em pixels. Padrão: `40`.
 * @param withBlur - Se verdadeiro, aplica efeito de desfoque ao usar o placeholder.
 * @param fallbackSrc - Imagem a ser usada como fallback se `src` não for fornecida. Padrão: imagem placeholder.
 * @param className - Classes CSS adicionais.
 * @param quality - Qualidade da imagem. Padrão: `80`.
 * @param loading - Estratégia de carregamento. Padrão: `"lazy"`.
 * @param rest - Outras propriedades herdadas de `ImageProps`, exceto `src` e `alt`.
 */
export function Avatar({
  src,
  alt = "Avatar",
  className,
  size = 40,
  quality = 80,
  loading = "lazy",
  withBlur = false,
  fallbackSrc = defaultAvatar,
  ...rest
}: AvatarProps) {
  const finalSrc = src || fallbackSrc;

  return (
    <Image
      data-slot="avatar"
      width={size}
      height={size}
      alt={alt}
      src={finalSrc}
      className={cn("rounded-md object-cover", className)}
      quality={quality}
      loading={loading}
      placeholder={withBlur ? "blur" : undefined}
      blurDataURL={withBlur ? "/avatar-placeholder-blur.png" : undefined}
      {...rest}
    />
  );
}
