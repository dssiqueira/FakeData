// Adicionar eventos de clique aos botões de gerar

document.getElementById('gerar-cpf-btn').addEventListener('click', () => {
    const cpfGerado = gerarCPF();
    document.getElementById('cpf-gerado').textContent = cpfGerado;
    document.getElementById('copiar-cpf-btn').style.display = 'inline-block';
    document.getElementById('mascarar-cpf-btn').style.display = 'inline-block';
  });
  
  document.getElementById('gerar-cnpj-btn').addEventListener('click', () => {
    const cnpjGerado = gerarCNPJ();
    document.getElementById('cnpj-gerado').textContent = cnpjGerado;
    document.getElementById('copiar-cnpj-btn').style.display = 'inline-block';
    document.getElementById('mascarar-cnpj-btn').style.display = 'inline-block';
  });
  
  document.getElementById('gerar-cep-btn').addEventListener('click', () => {
    const cepGerado = gerarCEP();
    document.getElementById('cep-gerado').textContent = cepGerado;
    document.getElementById('copiar-cep-btn').style.display = 'inline-block';
    document.getElementById('mascarar-cep-btn').style.display = 'inline-block';
  });
  