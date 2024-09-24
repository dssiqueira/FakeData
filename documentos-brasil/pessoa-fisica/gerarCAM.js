// Função para gerar CAM válido
function gerarCAM() {
    const random = () => Math.floor(Math.random() * 10);
    return `CAM-${Array.from({ length: 10 }, random).join('')}`;
  }
  
  export { gerarCAM };