// Função para gerar um CEP válido aleatório com base no JSON de CEPs válidos
let cepsCache = null;

async function gerarCEP() {
  try {
    if (!cepsCache) {
      const response = await fetch(chrome.runtime.getURL('/valid_ceps.json'));
      cepsCache = await response.json();
    }

    // Seleciona um CEP aleatório da lista de CEPs válidos
    const cepAleatorio = cepsCache[Math.floor(Math.random() * cepsCache.length)];

    return cepAleatorio;
  } catch (error) {
    console.error('Erro ao gerar CEP:', error);
    return null;
  }
}

export { gerarCEP };