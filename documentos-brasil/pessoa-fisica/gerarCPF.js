// Função para gerar um CPF válido
export function gerarCPF() {
    const random = (n) => Math.round(Math.random() * n);
    const mod = (base, div) => Math.round(base - Math.floor(base / div) * div);
  
    const n = Array.from({ length: 9 }, () => random(9));
    const d1 = mod(n.reduce((total, num, idx) => total + num * (10 - idx), 0) * 10, 11);
    const d2 = mod([...n, d1].reduce((total, num, idx) => total + num * (11 - idx), 0) * 10, 11);
  
    return [...n, d1, d2].join('');
  }