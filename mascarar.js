// Função de máscara reutilizável
function mascararDocumento(outputId) {
  const element = document.getElementById(outputId);
  let value = element.textContent;

  if (value.includes('.') || value.includes('-') || value.includes('/')) {
      element.textContent = value.replace(/\D/g, ''); // Remove máscara
  } else {
      switch (outputId) {
          case 'cpf-gerado':
              element.textContent = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
              break;
          case 'cnpj-gerado':
              element.textContent = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
              break;
          case 'cep-gerado':
              element.textContent = value.replace(/(\d{5})(\d{3})/, '$1-$2');
              break;
          case 'cns-gerado':
              element.textContent = value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4.$5');
              break;
      }
  }
}

// Exportar a função, se necessário
export { mascararDocumento };