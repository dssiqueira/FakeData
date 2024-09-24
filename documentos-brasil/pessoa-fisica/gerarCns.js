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
  
  export { gerarCns };