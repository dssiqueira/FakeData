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

    // Função para incrementar contagem de estatísticas
    function incrementarContagem(chave) {
        chrome.storage.local.get([chave], function (result) {
            const count = result[chave] || 0;
            chrome.storage.local.set({ [chave]: count + 1 });
        });
    }

    // Adicionar eventos de clique explícitos para cada botão de gerar documento
    const eventosGerarDocumentos = {
        'gerar-cpf-btn': { func: gerarCPF, outputId: 'cpf-gerado', copiarId: 'copiar-cpf-btn', mascararId: 'mascarar-cpf-btn', key: 'cpfCount' },
        'gerar-cnpj-btn': { func: gerarCNPJ, outputId: 'cnpj-gerado', copiarId: 'copiar-cnpj-btn', mascararId: 'mascarar-cnpj-btn', key: 'cnpjCount' },
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

    for (let [btnId, { func, outputId, copiarId, mascararId, key, extraId }] of Object.entries(eventosGerarDocumentos)) {
        document.getElementById(btnId).addEventListener('click', async () => {
            const valorGerado = await func();
            document.getElementById(outputId).textContent = valorGerado;
            document.getElementById(copiarId).style.display = 'inline-block';
            if (mascararId) document.getElementById(mascararId).style.display = 'inline-block';
            if (extraId) document.getElementById(extraId).style.display = 'inline-block';

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

            // Adiciona o comportamento de copiar
            document.querySelectorAll('.copy-btn-modal').forEach(button => {
                button.addEventListener('click', function () {
                    const textToCopy = this.getAttribute('data-value');
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        this.classList.add('copied');
                        setTimeout(() => this.classList.remove('copied'), 2000);
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

// Fechar o modal
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('cep-modal').style.display = 'none';
});