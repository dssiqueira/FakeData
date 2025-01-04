// Função para gerar um CEP válido aleatório com base no JSON de CEPs válidos
async function gerarCEP() {
  try {
    const response = await fetch(chrome.runtime.getURL('/valid_ceps.json'));
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