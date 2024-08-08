// Funções para gerar CPF, CNPJ e CEP

function gerarCPF() {
    const random = (n) => Math.round(Math.random() * n);
    const mod = (base, div) => Math.round(base - Math.floor(base / div) * div);
  
    const n = Array.from({ length: 9 }, () => random(9));
    const d1 = mod(n.reduce((total, num, idx) => total + num * (10 - idx), 0) * 10, 11);
    const d2 = mod([...n, d1].reduce((total, num, idx) => total + num * (11 - idx), 0) * 10, 11);
  
    return [...n, d1, d2].join('');
  }
  
  function gerarCNPJ() {
    const random = (n) => Math.round(Math.random() * n);
    const mod = (base, div) => Math.round(base - Math.floor(base / div) * div);
  
    const n = Array.from({ length: 12 }, () => random(9));
    const d1 = mod(n.reduce((total, num, idx) => total + num * (idx < 4 ? 5 - idx : 9 - idx), 0) * 10, 11);
    const d2 = mod([...n, d1].reduce((total, num, idx) => total + num * (idx < 5 ? 6 - idx : 10 - idx), 0) * 10, 11);
  
    return [...n, d1, d2].join('');
  }
  
  function gerarCEP() {
    const random = (n) => Math.round(Math.random() * n);
    return `${random(99999).toString().padStart(5, '0')}${random(999).toString().padStart(3, '0')}`;
  }
  