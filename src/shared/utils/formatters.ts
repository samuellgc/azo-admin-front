/**
 * Função `formatCPF`
 *
 * Formata uma string numérica como CPF brasileiro, aplicando máscara padrão.
 *
 * - Remove todos os caracteres que não são dígitos.
 * - Limita o CPF a 11 dígitos.
 * - Aplica a máscara no formato `XXX.XXX.XXX-XX`.
 *
 * @param value - String contendo números e possivelmente outros caracteres.
 * @returns CPF formatado como string, ou números puros caso exceda 11 dígitos.
 */
const formatCPF = (value: string) => {
  const formattedCpf = value.replace(/\D/g, "").slice(0, 11);
  return formattedCpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

/**
 * Formata uma string numérica para o formato de CNPJ brasileiro.
 *
 * O CNPJ (Cadastro Nacional da Pessoa Jurídica) é composto por 14 dígitos
 * e costuma ser exibido no seguinte formato: `00.000.000/0000-00`.
 *
 * Esta função:
 * - Remove todos os caracteres não numéricos.
 * - Limita o número de dígitos a 14.
 * - Aplica a máscara de formatação padrão do CNPJ.
 *
 * @param value - A string que contém o valor a ser formatado (pode incluir letras, espaços ou símbolos).
 * @returns A string formatada como CNPJ, ex: `"12.345.678/0001-90"`.
 */
const formatCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14);

  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

/**
 * Formata um número inteiro para o formato numérico brasileiro.
 *
 * - Adiciona separadores de milhar.
 * - Não exibe casas decimais.
 *
 * @param value - Número inteiro a ser formatado.
 * @returns Número formatado como string no padrão brasileiro.
 */
const formatIntNumber = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

/**
 * Formata um número para o formato de moeda brasileira (BRL).
 *
 * - Adiciona o símbolo `R$` antes do valor.
 * - Exibe duas casas decimais.
 *
 * @param value - Número a ser formatado como moeda.
 * @returns Valor formatado como string no padrão de moeda brasileira.
 */
const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Formata uma string numérica em um CEP (Código de Endereçamento Postal) brasileiro.
 *
 * ## Regras de formatação aplicadas:
 * - Remove todos os caracteres não numéricos.
 * - Limita o valor a 8 dígitos (padrão do CEP no Brasil).
 * - Aplica a máscara no formato: `XX.XXX-XXX`
 *
 * ## Exemplos:
 * ```ts
 * formatCep("12345678"); // "12.345-678"
 * formatCep("12.345678"); // "12.345-678"
 * formatCep("abc12345678xyz"); // "12.345-678"
 * formatCep("123"); // "12.3"
 * ```
 *
 * @param value - String contendo o CEP, que pode ter caracteres numéricos e não numéricos.
 * @returns O CEP formatado no padrão brasileiro ou a string parcial caso não tenha dígitos suficientes.
 */
const formatCep = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  return digits.replace(/^(\d{2})(\d)/, "$1.$2").replace(/\.(\d{3})(\d)/, ".$1-$2");
};

/**
 * Formata uma string numérica em um número de telefone brasileiro.
 *
 * ## Regras de formatação aplicadas:
 * - Remove todos os caracteres não numéricos.
 * - Limita o valor a 11 dígitos (padrão máximo com DDD + celular).
 * - Aplica a máscara no formato:
 *   - Celular (9 dígitos): `(XX) XXXXX-XXXX`
 *   - Fixo (8 dígitos): `(XX) XXXX-XXXX`
 *
 * ## Exemplos:
 * ```ts
 * formatPhone("11987654321"); // "(11) 98765-4321"
 * formatPhone("1134567890");  // "(11) 3456-7890"
 * formatPhone("11-98765-4321"); // "(11) 98765-4321"
 * formatPhone("34567890"); // "(34) 5678-90"
 * ```
 *
 * @param value - String contendo o número de telefone, que pode ter caracteres numéricos e não numéricos.
 * @returns O número formatado no padrão brasileiro ou a string parcial caso não tenha dígitos suficientes.
 */
const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  // Adiciona parênteses ao DDD
  let formatted = digits.replace(/^(\d{2})(\d)/, "($1) $2");

  // Celular (9 dígitos após o DDD): (XX) XXXXX-XXXX
  if (digits.length === 11) {
    formatted = formatted.replace(/(\d{5})(\d{4})$/, "$1-$2");
  }
  // Fixo (8 dígitos após o DDD): (XX) XXXX-XXXX
  else if (digits.length === 10) {
    formatted = formatted.replace(/(\d{4})(\d{4})$/, "$1-$2");
  }

  return formatted;
};

export { formatCPF, formatCnpj, formatCurrency, formatIntNumber, formatCep, formatPhone };
