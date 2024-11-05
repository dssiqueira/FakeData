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

    // Inicialização para esconder os botões de copiar, mascarar, e outros ícones até que um documento seja gerado
    const ids = ['cpf', 'cnpj', 'cep', 'cns', 'passaporte', 'cnh', 'pis', 'titulo', 'rg', 'ctps', 'ie', 'nit', 'crlv', 'cam'];

    ids.forEach(id => {
        const copiarButton = document.getElementById(`copiar-${id}-btn`);
        const mascararButton = document.getElementById(`mascarar-${id}-btn`);
        const extraButton = document.getElementById(`globo-${id}-btn`) || document.getElementById(`mapa-${id}-btn`);
        
        if (copiarButton) {
            copiarButton.style.display = 'none';
        }
        if (mascararButton) {
            mascararButton.style.display = 'none';
        }
        if (extraButton) {
            extraButton.style.display = 'none';
        }
    });

    // Função para incrementar a contagem de estatísticas
    function incrementarContagem(chave) {
        chrome.storage.local.get([chave], function (result) {
            const count = result[chave] || 0;
            chrome.storage.local.set({ [chave]: count + 1 });
        });
    }

    // Adicionar eventos de clique explícitos para cada botão de gerar documento
    const eventosGerarDocumentos = {
        'gerar-cpf-btn': { func: gerarCPF, outputId: 'cpf-gerado', copiarId: 'copiar-cpf-btn', mascararId: 'mascarar-cpf-btn', key: 'cpfCount' },
        'gerar-cnpj-btn': { func: gerarCNPJ, outputId: 'cnpj-gerado', copiarId: 'copiar-cnpj-btn', mascararId: 'mascarar-cnpj-btn', key: 'cnpjCount', extraId: 'globo-cnpj-btn' },
        'gerar-cep-btn': { func: gerarCEP, outputId: 'cep-gerado', copiarId: 'copiar-cep-btn', mascararId: 'mascarar-cep-btn', key: 'cepCount', extraId: 'mapa-cep-btn' },
        'gerar-cns-btn': { func: gerarCns, outputId: 'cns-gerado', copiarId: 'copiar-cns-btn', mascararId: 'mascarar-cns-btn', key: 'cnsCount' },
        'gerar-passaporte-btn': { func: gerarPassaporte, outputId: 'passaporte-gerado', copiarId: 'copiar-passaporte-btn', key: 'passaporteCount' },
        'gerar-cnh-btn': { func: gerarCNH, outputId: 'cnh-gerado', copiarId: 'copiar-cnh-btn', key: 'cnhCount' },
        'gerar-pis-btn': { func: gerarPIS, outputId: 'pis-gerado', copiarId: 'copiar-pis-btn', key: 'pisCount' },
        'gerar-titulo-btn': { func: gerarTituloEleitor, outputId: 'titulo-gerado', copiarId: 'copiar-titulo-btn', key: 'tituloCount' },
        'gerar-rg-btn': { func: gerarRG, outputId: 'rg-gerado', copiarId: 'copiar-rg-btn', key: 'rgCount' },
        'gerar-ctps-btn': { func: gerarCTPS, outputId: 'ctps-gerado', copiarId: 'copiar-ctps-btn', key: 'ctpsCount' },
        'gerar-ie-btn': { func: gerarIE, outputId: 'ie-gerado', copiarId: 'copiar-ie-btn', key: 'ieCount' },
        'gerar-nit-btn': { func: gerarNIT, outputId: 'nit-gerado', copiarId: 'copiar-nit-btn', key: 'nitCount' },
        'gerar-crlv-btn': { func: gerarCRLV, outputId: 'crlv-gerado', copiarId: 'copiar-crlv-btn', key: 'crlvCount' },
        'gerar-cam-btn': { func: gerarCAM, outputId: 'cam-gerado', copiarId: 'copiar-cam-btn', key: 'camCount' }
    };

    for (let [botaoId, { func, outputId, copiarId, mascararId, key, extraId }] of Object.entries(eventosGerarDocumentos)) {
        document.getElementById(botaoId).addEventListener('click', async () => {
            const valorGerado = await func();
            document.getElementById(outputId).textContent = valorGerado;
            
            // Mostrar botão de copiar, mascarar e ícone adicional, se existirem
            if (document.getElementById(copiarId)) {
                document.getElementById(copiarId).style.display = 'inline-block';
            }
            if (mascararId && document.getElementById(mascararId)) {
                document.getElementById(mascararId).style.display = 'inline-block';
            }
            if (extraId && document.getElementById(extraId)) {
                document.getElementById(extraId).style.display = 'inline-block';
            }

            // Incrementar a contagem
            incrementarContagem(key);
        });
    }

    // Navegação para Configurações e Estatísticas
    document.getElementById('settings-icon').addEventListener('click', function () {
        window.location.href = 'config.html';
    });

    document.getElementById('stats-icon').addEventListener('click', function () {
        window.location.href = 'stats.html';
    });
});

// Função para abrir o modal e carregar dados da API ViaCEP
document.getElementById('mapa-cep-btn').addEventListener('click', async function () {
  const cep = document.getElementById('cep-gerado').textContent.replace(/\D/g, ''); // Obtém o CEP sem a máscara
  if (!cep) return;

  const modal = document.getElementById('cep-modal');
  const cepInfoDiv = document.getElementById('cep-info');
  const loadingSpinner = document.getElementById('loading-spinner-cep');

  // Exibir o modal e o spinner de carregamento
  cepInfoDiv.style.display = 'none';
  loadingSpinner.style.display = 'block';
  modal.style.display = 'flex';

  try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      // Esconde o spinner após o carregamento
      loadingSpinner.style.display = 'none';
      cepInfoDiv.style.display = 'block';

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

          // Exibe os dados no modal
          cepInfoDiv.innerHTML = fields.map(field => `
              <div class="output-container-modal">
                  <p>${field.label}: ${field.value || '-'}</p>
                  <button class="copy-btn-modal" data-value="${field.value}">
                      <i class="fas fa-copy"></i>
                      <span class="tooltip-modal">Copiado!</span>
                  </button>
              </div>
          `).join('');
      }
  } catch (error) {
      // Esconde o spinner em caso de erro
      loadingSpinner.style.display = 'none';
      cepInfoDiv.style.display = 'block';
      cepInfoDiv.innerHTML = `<p>Erro ao buscar informações do CEP.</p>`;
  }
});

// Fechar o modal
document.getElementById('close-modal-btn').addEventListener('click', function() {
    document.getElementById('cep-modal').style.display = 'none';
});

// Adicionar eventos de clique explícitos para o CNPJ
document.getElementById('globo-cnpj-btn').addEventListener('click', async function () {
  const cnpj = document.getElementById('cnpj-gerado').textContent.replace(/\D/g, ''); // Remover caracteres especiais
  if (!cnpj) return;

  const modal = document.getElementById('cnpj-modal');
  const cnpjInfoDiv = document.getElementById('cnpj-info');
  const loadingSpinner = document.getElementById('loading-spinner-cnpj');

  // Exibir o modal e o spinner de carregamento
  cnpjInfoDiv.style.display = 'none';
  loadingSpinner.style.display = 'block';
  modal.style.display = 'block';

  try {
      const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`);
      const data = await response.json();

      // Esconde o spinner após o carregamento
      loadingSpinner.style.display = 'none';
      cnpjInfoDiv.style.display = 'block';

      if (data.erro) {
          cnpjInfoDiv.innerHTML = '<p>CNPJ inválido ou não encontrado.</p>';
      } else {
          // Renderizando os campos retornados pela API
          const fields = [
              { label: 'Razão Social', value: data.razao_social },
              { label: 'Capital Social', value: data.capital_social },
              { label: 'Porte', value: data.porte?.descricao },
              { label: 'Natureza Jurídica', value: data.natureza_juridica?.descricao },
              { label: 'Data de Início da Atividade', value: data.estabelecimento?.data_inicio_atividade },
              { label: 'Situação Cadastral', value: data.estabelecimento?.situacao_cadastral },
              { label: 'Atividade Principal', value: data.estabelecimento?.atividade_principal?.descricao },
              { label: 'Telefone', value: `${data.estabelecimento?.ddd1} ${data.estabelecimento?.telefone1}` },
              { label: 'Logradouro', value: `${data.estabelecimento?.tipo_logradouro} ${data.estabelecimento?.logradouro}, ${data.estabelecimento?.numero}` },
              { label: 'Bairro', value: data.estabelecimento?.bairro },
              { label: 'Cidade', value: `${data.cidade?.nome} - ${data.estado?.sigla}` }
          ];

          // Exibe os dados no modal
          cnpjInfoDiv.innerHTML = fields.map(field => `
              <div class="output-container-cnpj">
                  <p><strong>${field.label}:</strong> ${field.value || '-'}</p>
                  <button class="copy-btn-modal" data-value="${field.value}">
                      <i class="fas fa-copy"></i>
                      <span class="tooltip-modal">Copiado!</span>
                  </button>
              </div>
          `).join('');
      }
  } catch (error) {
      // Esconde o spinner em caso de erro
      loadingSpinner.style.display = 'none';
      cnpjInfoDiv.style.display = 'block';
      cnpjInfoDiv.innerHTML = `<p>Erro ao buscar informações do CNPJ.</p>`;
  }
});

// Fechar o modal de CNPJ
document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', function() {
        document.getElementById('cnpj-modal').style.display = 'none';
    });
});