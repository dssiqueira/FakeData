// Adicionar eventos de clique para mascarar dados onde aplicável
['cpf', 'cnpj', 'cep', 'cns'].forEach((id) => {
  document.getElementById(`mascarar-${id}-btn`).addEventListener('click', () => {
    const element = document.getElementById(`${id}-gerado`);
    let value = element.textContent;

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
});
