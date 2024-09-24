// Função para gerar Inscrição Estadual válida
function gerarIE() {
    const random = () => Math.floor(Math.random() * 10);
    return Array.from({ length: 9 }, random).join('');
  }
  
export { gerarIE };