// Função para gerar um CEP válido no formato #####-###
function gerarCEP() {
    const random = (n) => Math.floor(Math.random() * n);
    const cep = `${random(90000) + 10000}${random(900) + 100}`;
    return cep;
  }
  
  export { gerarCEP };