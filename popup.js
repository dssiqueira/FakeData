// Lógica para busca de documentos
document.getElementById('search-bar').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll('.container').forEach(container => {
    const docName = container.getAttribute('data-doc').toLowerCase();
    if (docName.includes(query)) {
      container.style.display = 'flex';
    } else {
      container.style.display = 'none';
    }
  });
});

// Inicialização do DOM quando o conteúdo é carregado
document.addEventListener('DOMContentLoaded', () => {
  // Inicialização para esconder os botões de copiar e mascarar até que um documento seja gerado
  const ids = ['cpf', 'cnpj', 'cep', 'cns', 'passaporte', 'cnh', 'pis', 'titulo', 'rg', 'ctps', 'ie', 'nit', 'crlv', 'cam'];

  ids.forEach(id => {
    document.getElementById(`copiar-${id}-btn`).style.display = 'none';
    const mascararBtn = document.getElementById(`mascarar-${id}-btn`);
    if (mascararBtn) {
      mascararBtn.style.display = 'none';
    }
  });

  // Adicionar eventos de clique explícitos para cada botão de gerar
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

  document.getElementById('gerar-cns-btn').addEventListener('click', () => {
    const cnsGerado = gerarCns();
    document.getElementById('cns-gerado').textContent = cnsGerado;
    document.getElementById('copiar-cns-btn').style.display = 'inline-block';
    document.getElementById('mascarar-cns-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-passaporte-btn').addEventListener('click', () => {
    const passaporteGerado = gerarPassaporte();
    document.getElementById('passaporte-gerado').textContent = passaporteGerado;
    document.getElementById('copiar-passaporte-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-cnh-btn').addEventListener('click', () => {
    const cnhGerado = gerarCNH();
    document.getElementById('cnh-gerado').textContent = cnhGerado;
    document.getElementById('copiar-cnh-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-pis-btn').addEventListener('click', () => {
    const pisGerado = gerarPIS();
    document.getElementById('pis-gerado').textContent = pisGerado;
    document.getElementById('copiar-pis-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-titulo-btn').addEventListener('click', () => {
    const tituloGerado = gerarTituloEleitor();
    document.getElementById('titulo-gerado').textContent = tituloGerado;
    document.getElementById('copiar-titulo-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-rg-btn').addEventListener('click', () => {
    const rgGerado = gerarRG();
    document.getElementById('rg-gerado').textContent = rgGerado;
    document.getElementById('copiar-rg-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-ctps-btn').addEventListener('click', () => {
    const ctpsGerado = gerarCTPS();
    document.getElementById('ctps-gerado').textContent = ctpsGerado;
    document.getElementById('copiar-ctps-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-ie-btn').addEventListener('click', () => {
    const ieGerado = gerarIE();
    document.getElementById('ie-gerado').textContent = ieGerado;
    document.getElementById('copiar-ie-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-nit-btn').addEventListener('click', () => {
    const nitGerado = gerarNIT();
    document.getElementById('nit-gerado').textContent = nitGerado;
    document.getElementById('copiar-nit-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-crlv-btn').addEventListener('click', () => {
    const crlvGerado = gerarCRLV();
    document.getElementById('crlv-gerado').textContent = crlvGerado;
    document.getElementById('copiar-crlv-btn').style.display = 'inline-block';
  });

  document.getElementById('gerar-cam-btn').addEventListener('click', () => {
    const camGerado = gerarCAM();
    document.getElementById('cam-gerado').textContent = camGerado;
    document.getElementById('copiar-cam-btn').style.display = 'inline-block';
  });
});
