// Função para gerar CRLV válido
function gerarCRLV() {
    const random = () => Math.floor(Math.random() * 10);
    return Array.from({ length: 11 }, random).join('');
  }
  
export { gerarCRLV };