// Função para gerar CTPS válida
function gerarCTPS() {
    const random = () => Math.floor(Math.random() * 10);
    const ctps = Array.from({ length: 8 }, random).join('');
    const serie = Array.from({ length: 4 }, random).join('');
    
    return `${ctps}/${serie}`;
  }
  
  export { gerarCTPS };