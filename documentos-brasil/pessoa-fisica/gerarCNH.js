// Função para gerar uma CNH válida
function gerarCNH() {
    const random = () => Math.floor(Math.random() * 10);
    const cnh = Array.from({ length: 9 }, random).join('');
    
    let d1 = Array.from(cnh).reduce((acc, num, idx) => acc + parseInt(num) * (9 - idx), 0) % 11;
    d1 = d1 > 9 ? 0 : d1;
    
    let d2 = Array.from(cnh).reduce((acc, num, idx) => acc + parseInt(num) * (1 + idx), 0) % 11;
    d2 = d2 > 9 ? 0 : d2;
    
    return cnh + d1 + d2;
  }
  
export { gerarCNH };