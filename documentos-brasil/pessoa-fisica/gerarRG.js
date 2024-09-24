// Função para gerar RG válido
function gerarRG() {
    const random = () => Math.floor(Math.random() * 10);
    return Array.from({ length: 9 }, random).join('');
  }
  
export { gerarRG };