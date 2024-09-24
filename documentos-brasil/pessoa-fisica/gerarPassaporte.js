// Função para gerar um Passaporte válido
function gerarPassaporte() {
    const letras = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                   String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const numeros = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
    const basePassaporte = letras + numeros;
    const soma = [...basePassaporte].reduce((acc, char, index) => {
      const valor = isNaN(char) ? char.charCodeAt(0) - 55 : parseInt(char);
      return acc + valor * (index + 1);
    }, 0);
    
    const digitoVerificador = soma % 10;
    return basePassaporte + digitoVerificador;
  }
  
export { gerarPassaporte };