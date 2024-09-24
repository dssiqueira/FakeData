// Função para gerar Título de Eleitor válido
function gerarTituloEleitor() {
    const random = () => Math.floor(Math.random() * 10);
    const titulo = Array.from({ length: 8 }, random).join('');
    
    const uf = (Math.floor(Math.random() * 27) + 1).toString().padStart(2, '0');
    const digitos = Array.from(titulo + uf).reduce((acc, num, idx) => acc + parseInt(num) * (idx % 2 === 0 ? 2 : 1), 0);
    const dv = (11 - (digitos % 11)) % 10;
    
    return titulo + uf + dv;
  }
  
  export { gerarTituloEleitor };