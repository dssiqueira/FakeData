// Função para copiar texto para a área de transferência

function copiarParaAreaDeTransferencia(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
  
  // Adicionar eventos de clique aos botões de copiar
  
  document.getElementById('copiar-cpf-btn').addEventListener('click', () => {
    const cpfGerado = document.getElementById('cpf-gerado').textContent;
    copiarParaAreaDeTransferencia(cpfGerado);
    sinalizarCopiado('copiar-cpf-btn');
  });
  
  document.getElementById('copiar-cnpj-btn').addEventListener('click', () => {
    const cnpjGerado = document.getElementById('cnpj-gerado').textContent;
    copiarParaAreaDeTransferencia(cnpjGerado);
    sinalizarCopiado('copiar-cnpj-btn');
  });
  
  document.getElementById('copiar-cep-btn').addEventListener('click', () => {
    const cepGerado = document.getElementById('cep-gerado').textContent;
    copiarParaAreaDeTransferencia(cepGerado);
    sinalizarCopiado('copiar-cep-btn');
  });
  
  function sinalizarCopiado(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.add('copied');
    button.parentElement.classList.add('copied');
    setTimeout(() => {
      button.classList.remove('copied');
      button.parentElement.classList.remove('copied');
    }, 2000); // Tooltip desaparecerá após 2 segundos
  }
  