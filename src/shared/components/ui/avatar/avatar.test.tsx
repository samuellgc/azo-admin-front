/** biome-ignore-all lint/suspicious/noExplicitAny: no need */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from ".";

// Mock do next/image para testes (evita falhas no ambiente JSDOM)
vi.mock("next/image", async () => {
  const actual = await vi.importActual<any>("next/image");
  return {
    ...actual,
    __esModule: true,
    default: (props: any) => {
      return (
        // Simula imagem com data-slot para localizar no teste
        <div
          {...props}
          role="img"
          aria-label={props.alt || "Avatar"}
          data-testid="avatar"
          style={{
            backgroundImage: `url(${props.src || "/default-avatar.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: props.width || "50px",
            height: props.height || "50px",
            borderRadius: "50%",
          }}
        />
      );
    },
  };
});

describe("<Avatar />", () => {
  /**
   * Testa se o componente renderiza com o alt padrão "Avatar" quando não é passado.
   */
  it("renderiza com alt padrão", () => {
    render(<Avatar />);
    const img = screen.getByTestId("avatar");
    expect(img).toHaveAttribute("alt", "Avatar");
  });

  /**
   * Testa se renderiza com um alt personalizado quando fornecido.
   */
  it("renderiza com alt personalizado", () => {
    render(<Avatar alt="Usuário" />);
    const img = screen.getByTestId("avatar");
    expect(img).toHaveAttribute("alt", "Usuário");
  });

  /**
   * Testa se aplica o fallbackSrc quando src não é fornecido.
   */
  it("usa fallbackSrc se src não for informado", () => {
    render(<Avatar />);
    const img = screen.getByTestId("avatar");
    expect(img).toHaveAttribute("src");
  });

  /**
   * Testa se renderiza com o tamanho correto baseado na prop `size`.
   */
  it("define largura e altura conforme prop size", () => {
    render(<Avatar size={64} />);
    const img = screen.getByTestId("avatar");
    expect(img).toHaveAttribute("width", "64");
    expect(img).toHaveAttribute("height", "64");
  });

  /**
   * Testa se aplica a classe customizada passada via `className`.
   */
  it("aplica classes personalizadas", () => {
    render(<Avatar className="ring-2" />);
    const img = screen.getByTestId("avatar");
    expect(img).toHaveClass("ring-2");
  });

  /**
   * Testa se blur e blurDataURL são definidos corretamente quando withBlur é true.
   */
  it("ativa blur placeholder se withBlur for true", () => {
    render(<Avatar withBlur />);
    const img = screen.getByTestId("avatar");
    expect(img).toHaveAttribute("placeholder", "blur");
    expect(img).toHaveAttribute("blurDataURL", "/avatar-placeholder-blur.png");
  });
});
