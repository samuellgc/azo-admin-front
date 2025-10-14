import { render, screen } from "@testing-library/react";
import { useForm, type FieldValues } from "react-hook-form";
import { describe, test, expect, vi } from "vitest";

import { Form, FormItem } from ".";

// Mock do componente `cn`
vi.mock("@/shared/lib/utils", () => ({
  cn: vi.fn((...args) => args.join(" ")),
}));

const TestFormWrapper = ({ children, defaultValues }: { children: React.ReactNode; defaultValues?: FieldValues }) => {
  const methods = useForm({ defaultValues });
  return <Form {...methods}>{children}</Form>;
};

/**
 * Testes para o componente `Form`.
 */
describe("Form", () => {
  /**
   * @test Renderiza o FormProvider corretamente
   * @description Verifica se o componente `Form` renderiza corretamente o `FormProvider` do `react-hook-form`.
   */
  test("renders FormProvider correctly", () => {
    const { container } = render(
      <TestFormWrapper>
        <div>Test Content</div>
      </TestFormWrapper>
    );
    // Não há uma maneira direta de verificar o FormProvider, mas podemos verificar se os filhos são renderizados.
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });
});

/**
 * @describe Componente FormItem
 * @description Testes para o componente `FormItem`.
 */
describe("FormItem", () => {
  /**
   * @test Renderiza com classes padrão e adicionais
   * @description Verifica se o `FormItem` renderiza com as classes CSS padrão e quaisquer classes adicionais fornecidas.
   */
  test("renders with default and additional classes", () => {
    render(
      <FormItem className="custom-class">
        <form>Item Content</form>
      </FormItem>
    );
    const formItem = screen.getByText("Item Content").closest("div");
    expect(formItem).toHaveClass("grid gap-2 custom-class");
    expect(formItem).toHaveAttribute("data-slot", "form-item");
  });
});
