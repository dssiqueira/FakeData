document.addEventListener('DOMContentLoaded', function () {
  // Função para retornar ao popup
  document.getElementById('back-btn').addEventListener('click', function () {
    window.location.href = 'popup.html';
  });

  // Recuperar as estatísticas do armazenamento local
  chrome.storage.local.get(null, function (result) {
    const stats = Object.entries(result)
      .filter(([key]) => key.endsWith('Count'))
      .map(([key, value]) => ({ name: key.replace('Count', '').toUpperCase(), count: value }))
      .sort((a, b) => b.count - a.count);

    // Verificar se há estatísticas; se não houver, exibir o empty state
    if (stats.length === 0) {
      document.getElementById('empty-state').style.display = 'flex';
    } else {
      document.getElementById('empty-state').style.display = 'none';
      
      // Preencher o pódio com os três mais gerados
      if (stats[1]) {
        document.getElementById('second-place-name').textContent = stats[1].name;
        document.getElementById('second-place-count').textContent = stats[1].count;
      }
      if (stats[0]) {
        document.getElementById('first-place-name').textContent = stats[0].name;
        document.getElementById('first-place-count').textContent = stats[0].count;
      }
      if (stats[2]) {
        document.getElementById('third-place-name').textContent = stats[2].name;
        document.getElementById('third-place-count').textContent = stats[2].count;
      }

      // Preencher a lista de estatísticas completa
      const statsList = document.getElementById('stats-list');
      stats.forEach(stat => {
        const item = document.createElement('div');
        item.classList.add('stats-item');
        item.innerHTML = `
          <div class="document-name">${stat.name}</div>
          <div class="count">${stat.count}</div>
        `;
        statsList.appendChild(item);
      });

      // Adicionar evento de clique para pódio com efeito de confetes
      ['first-place', 'second-place', 'third-place'].forEach(id => {
        const podiumElement = document.getElementById(id);
        if (podiumElement) {
          podiumElement.addEventListener('click', () => {
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.6 }
            });
          });
        }
      });
    }
  });
});
