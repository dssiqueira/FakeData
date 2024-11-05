document.addEventListener('DOMContentLoaded', function () {
    // Selecionar elementos
    const inputElement = document.getElementById('api-key');
    const saveButton = document.getElementById('save-btn');
    const backButton = document.getElementById('back-btn');
    const msgElement = document.getElementById('success-message');
    const clearStatsButton = document.getElementById('clear-stats-btn');

    // Recuperar a chave do armazenamento local e definir no input
    chrome.storage.local.get(['apiKey'], function (result) {
        if (result.apiKey) {
            inputElement.value = result.apiKey;
        }
    });

    // Evento para salvar a chave no armazenamento local
    saveButton.addEventListener('click', function () {
        const apiKey = inputElement.value;
        chrome.storage.local.set({ apiKey }, function () {
            // Mostrar mensagem de sucesso
            msgElement.classList.add('visible');
            msgElement.innerHTML = '<i class="fas fa-check-circle"></i> Chave API salva com sucesso!';

            // Exibir animação de confetes
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Ocultar mensagem após 3 segundos
            setTimeout(() => {
                msgElement.classList.remove('visible');
            }, 3000);
        });
    });

    // Evento para o botão de voltar
    backButton.addEventListener('click', function () {
        window.location.href = 'popup.html';
    });

    // Evento para limpar estatísticas
    clearStatsButton.addEventListener('click', function () {
        if (confirm("Tem certeza de que deseja limpar todas as estatísticas?")) {
            chrome.storage.local.get(null, function (result) {
                const keysToDelete = Object.keys(result).filter(key => key.endsWith('Count'));
                keysToDelete.forEach(key => chrome.storage.local.remove(key));
            });
            alert("Estatísticas limpas com sucesso!");
        }
    });
});
