import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Label } from ".";

// Mock da função utilitária `cn` que combina classes
vi.mock("@/shared/lib/utils", () => ({
  cn: vi.fn((...args) => args.filter(Boolean).join(" ")),
}));

// Mock do componente `Label.Root` do Radix UI
vi.mock("@radix-ui/react-label", () => ({
  Root: vi.fn(({ children, className, ...props }) => (
    <label
      className={className}
      htmlFor="input-id"
      {...props}
    >
      {children}
    </label>
  )),
}));

describe("Label Component", () => {
  // Testes relacionados à renderização básica do componente
  describe("Renderização", () => {
    /**
     * Garante que o componente `Label` renderiza um elemento HTML `label`
     * com o conteúdo de texto passado como filho.
     */
    it("renderiza como elemento label", () => {
      render(<Label>Test Label</Label>);

      const label = screen.getByText("Test Label");
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe("LABEL");
    });

    /**
     * Verifica se o atributo `data-slot="label"` está presente
     * para fins de estilização ou testes.
     */
    it("inclui atributo data-slot", () => {
      render(<Label>Test Label</Label>);

      const label = screen.getByText("Test Label");
      expect(label).toHaveAttribute("data-slot", "label");
    });
  });

  // Testes relacionados às classes CSS aplicadas ao componente
  describe("Estilos", () => {
    /**
     * Verifica se as classes padrão do componente estão aplicadas corretamente.
     * Essas classes definem estilo base como fonte, cor, tamanho e alinhamento.
     */
    it("aplica classes padrão", () => {
      render(<Label>Test Label</Label>);

      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("font-medium", "text-sm", "text-gray-7", "align-middle");
    });

    /**
     * Verifica se é possível adicionar classes customizadas
     * junto com as classes padrão.
     */
    it("combina className customizado com classes padrão", () => {
      render(<Label className="custom-class">Test Label</Label>);

      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("custom-class", "font-medium");
    });

    /**
     * Garante que as classes customizadas sobrescrevem corretamente
     * os estilos padrão se necessário.
     */
    it("sobrescreve classes com className customizado", () => {
      render(<Label className="text-red-500 font-bold">Test Label</Label>);

      const label = screen.getByText("Test Label");
      expect(label.className).toContain("font-medium text-sm text-gray-7 align-middle text-red-500 font-bold");
    });
  });

  // Testes para garantir o repasse correto de props HTML nativas
  describe("Propriedades HTML", () => {
    /**
     * Verifica se o componente propaga corretamente
     * atributos HTML como `id`, `htmlFor`, `data-*`, e `aria-*`.
     */
    it("repassa todas as props para o elemento", () => {
      render(
        <Label
          id="test-label"
          htmlFor="input-id"
          data-testid="custom-label"
          aria-label="Custom aria label"
        >
          Test Label
        </Label>
      );

      const label = screen.getByTestId("custom-label");
      expect(label).toHaveAttribute("id", "test-label");
      expect(label).toHaveAttribute("for", "input-id");
      expect(label).toHaveAttribute("aria-label", "Custom aria label");
    });

    /**
     * Verifica se a prop `className` funciona também
     * como mecanismo para estilizar via classes externas.
     */
    it("aplica style prop", () => {
      render(<Label className="custom-style">Styled Label</Label>);

      const label = screen.getByText("Styled Label");
      expect(label).toHaveClass("custom-style");
    });
  });
});
