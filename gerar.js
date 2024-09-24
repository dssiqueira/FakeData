// Função para gerar um CPF válido
function gerarCPF() {
  const random = (n) => Math.round(Math.random() * n);
  const mod = (base, div) => Math.round(base - Math.floor(base / div) * div);

  const n = Array.from({ length: 9 }, () => random(9));
  const d1 = mod(n.reduce((total, num, idx) => total + num * (10 - idx), 0) * 10, 11);
  const d2 = mod([...n, d1].reduce((total, num, idx) => total + num * (11 - idx), 0) * 10, 11);

  return [...n, d1, d2].join('');
}

// Função para gerar um CNPJ válido
function gerarCNPJ() {
  const random = () => Math.floor(Math.random() * 10);
  let cnpj = Array.from({ length: 12 }, random).join('');

  const pesosPrimeiroDV = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesosSegundoDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calcularDV = (base, pesos) => {
    const soma = base
      .split('')
      .reduce((acc, num, idx) => acc + parseInt(num) * pesos[idx], 0);
    let dv = 11 - (soma % 11);
    return dv >= 10 ? 0 : dv;
  };

  const primeiroDV = calcularDV(cnpj, pesosPrimeiroDV);
  cnpj += primeiroDV;

  const segundoDV = calcularDV(cnpj, pesosSegundoDV);
  cnpj += segundoDV;

  return cnpj;
}

// Função para gerar um CEP válido
function gerarCEP() {
  const random = (n) => Math.round(Math.random() * n);
  return `${random(99999).toString().padStart(5, '0')}${random(999).toString().padStart(3, '0')}`;
}

// Função para validar CNS que começa com 1, 2, 7, 8, ou 9
function validarCns(cns) {
  if (cns.trim().length !== 15) {
    return false;
  }

  const inicio = parseInt(cns[0]);
  if (![1, 2, 7, 8, 9].includes(inicio)) {
    return false;
  }

  let soma = 0;

  // Validação para CNS começando com 1 ou 2
  if (inicio === 1 || inicio === 2) {
    const pis = cns.substring(0, 11);
    soma = [...pis].reduce((acc, digit, index) => acc + parseInt(digit) * (15 - index), 0);

    let resto = soma % 11;
    let dv = 11 - resto;

    if (dv === 11) dv = 0;
    if (dv === 10) {
      soma += 2;
      resto = soma % 11;
      dv = 11 - resto;
      return cns === pis + "001" + dv;
    } else {
      return cns === pis + "000" + dv;
    }
  }

  // Validação para CNS começando com 7, 8, ou 9
  if (inicio === 7 || inicio === 8 || inicio === 9) {
    soma = [...cns].reduce((acc, digit, index) => acc + parseInt(digit) * (15 - index), 0);
    return soma % 11 === 0;
  }

  return false;
}

// Função para gerar um CNS válido
function gerarCns() {
  const tipo = [1, 2, 7, 8, 9][Math.floor(Math.random() * 5)];
  let cns = tipo + Array.from({ length: 14 }, () => Math.floor(Math.random() * 10)).join('');
  
  while (!validarCns(cns)) {
    cns = tipo + Array.from({ length: 14 }, () => Math.floor(Math.random() * 10)).join('');
  }
  
  return cns;
}

// Função para gerar um Passaporte válido
function gerarPassaporte() {
  const letras = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                 String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const numeros = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
  const basePassaporte = letras + numeros;
  const soma = [...basePassaporte].reduce((acc, char, index) => {
    const valor = isNaN(char) ? char.charCodeAt(0) - 55 : parseInt(char);
    return acc + valor * (index + 1);
  }, 0);
  
  const digitoVerificador = soma % 10;
  return basePassaporte + digitoVerificador;
}

// Função para gerar um CNH válido
function gerarCNH() {
  const random = () => Math.floor(Math.random() * 10);
  const cnh = Array.from({ length: 9 }, random).join('');
  
  let d1 = Array.from(cnh).reduce((acc, num, idx) => acc + parseInt(num) * (9 - idx), 0) % 11;
  d1 = d1 > 9 ? 0 : d1;
  
  let d2 = Array.from(cnh).reduce((acc, num, idx) => acc + parseInt(num) * (1 + idx), 0) % 11;
  d2 = d2 > 9 ? 0 : d2;
  
  return cnh + d1 + d2;
}

// Função para gerar um PIS/PASEP válido
function gerarPIS() {
  const random = () => Math.floor(Math.random() * 10);
  const pis = Array.from({ length: 10 }, random).join('');
  
  const soma = Array.from(pis).reduce((acc, num, idx) => acc + parseInt(num) * [3, 2, 9, 8, 7, 6, 5, 4, 3, 2][idx], 0);
  const resto = soma % 11;
  const dv = resto < 2 ? 0 : 11 - resto;
  
  return pis + dv;
}

// Função para gerar Título de Eleitor
function gerarTituloEleitor() {
  const random = () => Math.floor(Math.random() * 10);
  const titulo = Array.from({ length: 8 }, random).join('');
  
  const uf = (Math.floor(Math.random() * 27) + 1).toString().padStart(2, '0');
  const digitos = Array.from(titulo + uf).reduce((acc, num, idx) => acc + parseInt(num) * (idx % 2 === 0 ? 2 : 1), 0);
  const dv = (11 - (digitos % 11)) % 10;
  
  return titulo + uf + dv;
}

// Função para gerar RG (Registro Geral)
function gerarRG() {
  const random = () => Math.floor(Math.random() * 10);
  return Array.from({ length: 9 }, random).join('');
}

// Função para gerar Carteira de Trabalho (CTPS)
function gerarCTPS() {
  const random = () => Math.floor(Math.random() * 10);
  const ctps = Array.from({ length: 8 }, random).join('');
  const serie = Array.from({ length: 4 }, random).join('');
  
  return `${ctps}/${serie}`;
}

// Função para gerar Inscrição Estadual (IE)
function gerarIE() {
  const random = () => Math.floor(Math.random() * 10);
  return Array.from({ length: 9 }, random).join('');
}

// Função para gerar NIT (Número de Identificação do Trabalhador)
function gerarNIT() {
  const random = () => Math.floor(Math.random() * 10);
  const nit = Array.from({ length: 10 }, random).join('');
  const soma = Array.from(nit).reduce((acc, num, idx) => acc + parseInt(num) * [3, 2, 9, 8, 7, 6, 5, 4, 3, 2][idx], 0);
  const resto = soma % 11;
  const dv = resto < 2 ? 0 : 11 - resto;
  
  return nit + dv;
}

// Função para gerar CRLV (Certificado de Registro e Licenciamento de Veículo)
function gerarCRLV() {
  const random = () => Math.floor(Math.random() * 10);
  return Array.from({ length: 11 }, random).join('');
}

// Função para gerar Certificado de Alistamento Militar (CAM)
function gerarCAM() {
  const random = () => Math.floor(Math.random() * 10);
  return `CAM-${Array.from({ length: 10 }, random).join('')}`;
}
