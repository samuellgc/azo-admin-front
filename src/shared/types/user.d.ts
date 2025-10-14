/**
 * Representa um usuário autenticado na aplicação.
 */
export type User = {
  /**
   * Identificador único do usuário.
   * Ex: "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;

  /**
   * Nome completo do usuário.
   * Ex: "João da Silva"
   */
  name: string;

  /**
   * Endereço de e-mail do usuário.
   * Ex: "joao@example.com"
   */
  email: string;

  /**
   * Documento oficial de identificação (CPF ou CNPJ).
   * Ex: "123.456.789-00" ou "12.345.678/0001-99"
   */
  document: string;

  /**
   * Número de telefone do usuário.
   * Ex: "+55 (11) 91234-5678"
   */
  phone: string;

  // Outros campos relevantes do usuário podem ser adicionados aqui
};
