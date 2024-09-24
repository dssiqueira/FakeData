// Função para gerar um CNPJ válido
function gerarCNPJ() {
  const random = (n) => Math.floor(Math.random() * n);
  
  // Gera os primeiros 12 números do CNPJ
  let cnpj = '';
  for (let i = 0; i < 8; i++) {
    cnpj += random(9);
  }
  // Gera a base da filial, que geralmente é 0001
  cnpj += '0001';

  // Calcula os dois dígitos verificadores
  const d1 = calcularDVCNPJ(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calcularDVCNPJ(cnpj + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return `${cnpj}${d1}${d2}`;
}

// Função para calcular os dígitos verificadores do CNPJ
function calcularDVCNPJ(cnpjBase, pesos) {
  let soma = 0;
  for (let i = 0; i < cnpjBase.length; i++) {
    soma += parseInt(cnpjBase[i]) * pesos[i];
  }
  
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export { gerarCNPJ };