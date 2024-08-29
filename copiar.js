// Função para copiar texto para a área de transferência
function copiarParaAreaDeTransferencia(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

// Adicionar eventos de clique aos botões de copiar para cada documento
['cpf', 'cnpj', 'cep', 'cns', 'passaporte', 'cnh', 'pis', 'titulo', 'rg', 'ctps', 'ie', 'nit', 'crlv', 'cam'].forEach((id) => {
  document.getElementById(`copiar-${id}-btn`).addEventListener('click', () => {
    const textGerado = document.getElementById(`${id}-gerado`).textContent;
    copiarParaAreaDeTransferencia(textGerado);
    sinalizarCopiado(`copiar-${id}-btn`);
  });
});

// Função para exibir o tooltip "Copiado!"
function sinalizarCopiado(buttonId) {
  const button = document.getElementById(buttonId);
  button.classList.add('copied');
  button.parentElement.classList.add('copied');
  setTimeout(() => {
    button.classList.remove('copied');
    button.parentElement.classList.remove('copied');
  }, 2000); // Tooltip desaparece após 2 segundos
}
