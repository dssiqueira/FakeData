// Importações de funções para geração de documentos de Pessoa Física
import { gerarCPF } from './documentos-brasil/pessoa-fisica/gerarCPF.js';
import { gerarCEP } from './documentos-brasil/pessoa-fisica/gerarCEP.js';
import { gerarRG } from './documentos-brasil/pessoa-fisica/gerarRG.js';
import { gerarCns } from './documentos-brasil/pessoa-fisica/gerarCns.js';
import { gerarPassaporte } from './documentos-brasil/pessoa-fisica/gerarPassaporte.js';
import { gerarPIS } from './documentos-brasil/pessoa-fisica/gerarPIS.js';
import { gerarCNH } from './documentos-brasil/pessoa-fisica/gerarCNH.js';
import { gerarTituloEleitor } from './documentos-brasil/pessoa-fisica/gerarTituloEleitor.js';
import { gerarCTPS } from './documentos-brasil/pessoa-fisica/gerarCTPS.js';
import { gerarNIT } from './documentos-brasil/pessoa-fisica/gerarNIT.js';
import { gerarCAM } from './documentos-brasil/pessoa-fisica/gerarCAM.js';

// Importações de funções para geração de documentos de Pessoa Jurídica
import { gerarCNPJ } from './documentos-brasil/pessoa-juridica/gerarCNPJ.js';
import { gerarIE } from './documentos-brasil/pessoa-juridica/gerarIE.js';

// Importação da função para gerar documentos de automóveis
import { gerarCRLV } from './documentos-brasil/automovel/gerarCRLV.js';


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
  // Adiciona a versão da extensão ao rodapé
  const manifestData = chrome.runtime.getManifest();
  const version = manifestData.version;
  document.getElementById('version').textContent = ` - Versão ${version}`;

  // Inicialização para esconder os botões de copiar e mascarar até que um documento seja gerado
  const ids = ['cpf', 'cnpj', 'cep', 'cns', 'passaporte', 'cnh', 'pis', 'titulo', 'rg', 'ctps', 'ie', 'nit', 'crlv', 'cam'];

  ids.forEach(id => {
    document.getElementById(`copiar-${id}-btn`).style.display = 'none';
    const mascararBtn = document.getElementById(`mascarar-${id}-btn`);
    if (mascararBtn) {
      mascararBtn.style.display = 'none';
    }
  });

  // Adicionar eventos de clique explícitos para o CPF
  document.getElementById('gerar-cpf-btn').addEventListener('click', () => {
    const cpfGerado = gerarCPF();
    document.getElementById('cpf-gerado').textContent = cpfGerado;
    document.getElementById('copiar-cpf-btn').style.display = 'inline-block';
    document.getElementById('mascarar-cpf-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para o CNPJ
  document.getElementById('gerar-cnpj-btn').addEventListener('click', () => {
    const cnpjGerado = gerarCNPJ();
    document.getElementById('cnpj-gerado').textContent = cnpjGerado;
    document.getElementById('copiar-cnpj-btn').style.display = 'inline-block';
    document.getElementById('mascarar-cnpj-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para o CEP
  document.getElementById('gerar-cep-btn').addEventListener('click', async () => {
    try {
      const cepGerado = await gerarCEP(); // Aguarda o retorno do CEP gerado
      document.getElementById('cep-gerado').textContent = cepGerado; // Exibe o CEP gerado no campo correspondente
      document.getElementById('copiar-cep-btn').style.display = 'inline-block'; // Mostra o botão de copiar
      document.getElementById('mascarar-cep-btn').style.display = 'inline-block'; // Mostra o botão de mascarar
      document.getElementById('mapa-cep-btn').style.display = 'inline-block'; // Mostra o botão de mapa
    } catch (error) {
      console.error('Erro ao gerar o CEP:', error);
    }
  });

  // Adicionar eventos de clique explícitos para o CNS
  document.getElementById('gerar-cns-btn').addEventListener('click', () => {
    const cnsGerado = gerarCns();
    document.getElementById('cns-gerado').textContent = cnsGerado;
    document.getElementById('copiar-cns-btn').style.display = 'inline-block';
    document.getElementById('mascarar-cns-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para o Passaporte
  document.getElementById('gerar-passaporte-btn').addEventListener('click', () => {
    const passaporteGerado = gerarPassaporte();
    document.getElementById('passaporte-gerado').textContent = passaporteGerado;
    document.getElementById('copiar-passaporte-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para a CNH
  document.getElementById('gerar-cnh-btn').addEventListener('click', () => {
    const cnhGerado = gerarCNH();
    document.getElementById('cnh-gerado').textContent = cnhGerado;
    document.getElementById('copiar-cnh-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para o PIS
  document.getElementById('gerar-pis-btn').addEventListener('click', () => {
    const pisGerado = gerarPIS();
    document.getElementById('pis-gerado').textContent = pisGerado;
    document.getElementById('copiar-pis-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para o Título de Eleitor
  document.getElementById('gerar-titulo-btn').addEventListener('click', () => {
    const tituloGerado = gerarTituloEleitor();
    document.getElementById('titulo-gerado').textContent = tituloGerado;
    document.getElementById('copiar-titulo-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para o RG
  document.getElementById('gerar-rg-btn').addEventListener('click', () => {
    const rgGerado = gerarRG();
    document.getElementById('rg-gerado').textContent = rgGerado;
    document.getElementById('copiar-rg-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para a CTPS
  document.getElementById('gerar-ctps-btn').addEventListener('click', () => {
    const ctpsGerado = gerarCTPS();
    document.getElementById('ctps-gerado').textContent = ctpsGerado;
    document.getElementById('copiar-ctps-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para a IE
  document.getElementById('gerar-ie-btn').addEventListener('click', () => {
    const ieGerado = gerarIE();
    document.getElementById('ie-gerado').textContent = ieGerado;
    document.getElementById('copiar-ie-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para o NIT
  document.getElementById('gerar-nit-btn').addEventListener('click', () => {
    const nitGerado = gerarNIT();
    document.getElementById('nit-gerado').textContent = nitGerado;
    document.getElementById('copiar-nit-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para o CRLV
  document.getElementById('gerar-crlv-btn').addEventListener('click', () => {
    const crlvGerado = gerarCRLV();
    document.getElementById('crlv-gerado').textContent = crlvGerado;
    document.getElementById('copiar-crlv-btn').style.display = 'inline-block';
  });

  // Adicionar eventos de clique explícitos para o CAM
  document.getElementById('gerar-cam-btn').addEventListener('click', () => {
    const camGerado = gerarCAM();
    document.getElementById('cam-gerado').textContent = camGerado;
    document.getElementById('copiar-cam-btn').style.display = 'inline-block';
  });
});

// Função para abrir o modal e carregar dados da API ViaCEP
document.getElementById('mapa-cep-btn').addEventListener('click', async function() {
  const cep = document.getElementById('cep-gerado').textContent.replace(/\D/g, ''); // Obtém o CEP sem a máscara
  //const cep = '04552000';  // Simulação do CEP gerado
  if (!cep) return;

  const modal = document.getElementById('cep-modal');
  const cepInfoDiv = document.getElementById('cep-info');

  // Limpa o conteúdo do modal antes de carregá-lo
  cepInfoDiv.innerHTML = '<p>Carregando informações...</p>';

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      cepInfoDiv.innerHTML = '<p>CEP inválido ou não encontrado.</p>';
    } else {
      // Renderizando os campos retornados pela API ViaCEP
      const fields = [
        { label: 'CEP', value: data.cep },
        { label: 'Logradouro', value: data.logradouro },
        { label: 'Complemento', value: data.complemento },
        { label: 'Bairro', value: data.bairro },
        { label: 'Localidade', value: data.localidade },
        { label: 'Estado', value: data.uf },
        { label: 'IBGE', value: data.ibge },
        { label: 'DDD', value: data.ddd }
      ];

      // Exibe os dados no modal de forma similar ao layout principal
      cepInfoDiv.innerHTML = fields.map(field => `
        <div class="output-container-modal">
          <p>${field.label}: ${field.value || '-'}</p>
          <button class="copy-btn-modal" data-value="${field.value}">
            <i class="fas fa-copy"></i>
            <span class="tooltip-modal">Copiado!</span>
          </button>
        </div>
      `).join('');

      // Adiciona o comportamento de copiar com tooltip
      document.querySelectorAll('.copy-btn-modal').forEach(button => {
        button.addEventListener('click', function() {
          const textToCopy = this.getAttribute('data-value');
          navigator.clipboard.writeText(textToCopy).then(() => {
            this.classList.add('copied');
            const tooltip = this.querySelector('.tooltip-modal');
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
            setTimeout(() => {
              tooltip.style.visibility = 'hidden';
              tooltip.style.opacity = '0';
            }, 2000);
          });
        });
      });

      // Exibe o modal
      modal.style.display = 'block';
    }
  } catch (error) {
    cepInfoDiv.innerHTML = `<p>Erro ao buscar informações do CEP.</p>`;
  }
});

// Fechar o modal ao clicar no botão "x"
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('cep-modal').style.display = 'none';
});

// Fechar o modal se clicar fora da área do modal
window.addEventListener('click', function(event) {
  const modal = document.getElementById('cep-modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});