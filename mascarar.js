// Funções para aplicar máscara ao CPF, CNPJ e CEP

function mascararCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  
  function mascararCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  
  function mascararCEP(cep) {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  
  // Adicionar eventos de clique aos botões de mascarar
  
  document.getElementById('mascarar-cpf-btn').addEventListener('click', () => {
    let cpfGerado = document.getElementById('cpf-gerado').textContent;
    const mascararBtn = document.getElementById('mascarar-cpf-btn');
    if (mascararBtn.classList.contains('active')) {
      cpfGerado = cpfGerado.replace(/[^\d]/g, '');
      document.getElementById('cpf-gerado').textContent = cpfGerado;
      mascararBtn.classList.remove('active');
    } else {
      document.getElementById('cpf-gerado').textContent = mascararCPF(cpfGerado);
      mascararBtn.classList.add('active');
    }
  });
  
  document.getElementById('mascarar-cnpj-btn').addEventListener('click', () => {
    let cnpjGerado = document.getElementById('cnpj-gerado').textContent;
    const mascararBtn = document.getElementById('mascarar-cnpj-btn');
    if (mascararBtn.classList.contains('active')) {
      cnpjGerado = cnpjGerado.replace(/[^\d]/g, '');
      document.getElementById('cnpj-gerado').textContent = cnpjGerado;
      mascararBtn.classList.remove('active');
    } else {
      document.getElementById('cnpj-gerado').textContent = mascararCNPJ(cnpjGerado);
      mascararBtn.classList.add('active');
    }
  });
  
  document.getElementById('mascarar-cep-btn').addEventListener('click', () => {
    let cepGerado = document.getElementById('cep-gerado').textContent;
    const mascararBtn = document.getElementById('mascarar-cep-btn');
    if (mascararBtn.classList.contains('active')) {
      cepGerado = cepGerado.replace(/[^\d]/g, '');
      document.getElementById('cep-gerado').textContent = cepGerado;
      mascararBtn.classList.remove('active');
    } else {
      document.getElementById('cep-gerado').textContent = mascararCEP(cepGerado);
      mascararBtn.classList.add('active');
    }
  });
  