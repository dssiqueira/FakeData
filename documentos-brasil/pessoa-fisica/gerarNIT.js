// Função para gerar NIT válido
function gerarNIT() {
    const random = () => Math.floor(Math.random() * 10);
    const nit = Array.from({ length: 10 }, random).join('');
    const soma = Array.from(nit).reduce((acc, num, idx) => acc + parseInt(num) * [3, 2, 9, 8, 7, 6, 5, 4, 3, 2][idx], 0);
    const resto = soma % 11;
    const dv = resto < 2 ? 0 : 11 - resto;
    
    return nit + dv;
  }
  
  export { gerarNIT };