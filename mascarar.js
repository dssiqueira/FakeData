// Adicionar eventos de clique para mascarar dados onde aplicável
['cpf', 'cnpj', 'cep', 'cns'].forEach((id) => {
    const mascararBtn = document.getElementById(`mascarar-${id}-btn`);
    const element = document.getElementById(`${id}-gerado`);
    
    // Verifica se o botão de mascarar e o elemento de exibição existem antes de adicionar o listener
    if (mascararBtn && element) {
        mascararBtn.addEventListener('click', () => {
            let value = element.textContent;

            // Alterna entre exibir o valor mascarado e o valor desmascarado
            if (value.includes('.') || value.includes('-') || value.includes('/')) {
                element.textContent = value.replace(/\D/g, ''); // Remove máscara
            } else {
                switch (id) {
                    case 'cpf':
                        element.textContent = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                        break;
                    case 'cnpj':
                        element.textContent = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
                        break;
                    case 'cep':
                        element.textContent = value.replace(/(\d{5})(\d{3})/, '$1-$2');
                        break;
                    case 'cns':
                        element.textContent = value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4.$5');
                        break;
                }
            }
        });
    } else {
        console.warn(`Elemento ou botão de mascarar não encontrado para id: ${id}`);
    }
});
