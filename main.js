const numeroSenha = document.getElementById('tamanho-senha');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnAumentar = document.getElementById('btn-aumentar');
const campoSenha = document.getElementById('campo-senha');

let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

btnDiminuir.onclick = () => {
  if (tamanhoSenha > 1) {
    tamanhoSenha--;
    numeroSenha.textContent = tamanhoSenha;
  }
};

btnAumentar.onclick = () => {
  if (tamanhoSenha < 20) {
    tamanhoSenha++;
    numeroSenha.textContent = tamanhoSenha;
  }
};

// Você pode adicionar aqui a função que gera a senha aleatória
// Exemplo simples para mostrar no input:
function gerarSenha(tamanho) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    senha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return senha;
}

// Atualiza a senha gerada toda vez que mudar o tamanho
function atualizarSenha() {
  const senhaGerada = gerarSenha(tamanhoSenha);
  campoSenha.value = senhaGerada;
}

// Gera senha inicial
atualizarSenha();

// Atualiza a senha sempre que aumentar/diminuir tamanho
btnDiminuir.onclick = () => {
  if (tamanhoSenha > 1) {
    tamanhoSenha--;
    numeroSenha.textContent = tamanhoSenha;
    atualizarSenha();
  }
};

btnAumentar.onclick = () => {
  if (tamanhoSenha < 20) {
    tamanhoSenha++;
    numeroSenha.textContent = tamanhoSenha;
    atualizarSenha();
  }
};
