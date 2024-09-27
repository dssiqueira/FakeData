// Função para gerar um CEP válido aleatório com base no JSON de CEPs válidos
async function gerarCEP() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/gblmarquez/48328559f24e65974d2d/raw/fa24a5fc33a559d51af6b99a115500b7372fa580/valid_ceps.json');
    const ceps = await response.json();
    
    // Seleciona um CEP aleatório da lista de CEPs válidos
    const cepAleatorio = ceps[Math.floor(Math.random() * ceps.length)];
    
    return cepAleatorio;
  } catch (error) {
    console.error('Erro ao gerar CEP:', error);
    return null;
  }
}

export { gerarCEP };