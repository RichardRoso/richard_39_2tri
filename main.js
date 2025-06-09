const tamanhoSenhaEl = document.getElementById('tamanho-senha');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnAumentar = document.getElementById('btn-aumentar');
const campoSenha = document.getElementById('campo-senha');

let tamanhoSenha = 12;

function atualizaTamanho() {
  tamanhoSenhaEl.textContent = tamanhoSenha;
}

btnDiminuir.addEventListener('click', () => {
  if (tamanhoSenha > 1) {
    tamanhoSenha--;
    atualizaTamanho();
    gerarSenha();
  }
});

btnAumentar.addEventListener('click', () => {
  if (tamanhoSenha < 20) {
    tamanhoSenha++;
    atualizaTamanho();
    gerarSenha();
  }
});

function gerarSenha() {
  const usarMaiusculo = document.getElementById('maiusculo').checked;
  const usarMinusculo = document.getElementById('minusculo').checked;
  const usarNumero = document.getElementById('numero').checked;
  const usarSimbolo = document.getElementById('simbolo').checked;

  let caracteres = '';
  if (usarMaiusculo) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (usarMinusculo) caracteres += 'abcdefghijklmnopqrstuvwxyz';
  if (usarNumero) caracteres += '0123456789';
  if (usarSimbolo) caracteres += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  if (!caracteres) {
    campoSenha.value = '';
    return;
  }

  let senha = '';
  for (let i = 0; i < tamanhoSenha; i++) {
    senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  campoSenha.value = senha;
}

// Inicializa texto e senha no carregamento
atualizaTamanho();
gerarSenha();

// Regerar senha quando checkbox mudar
document.querySelectorAll('.checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', gerarSenha);
});
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        // tamanhoSenha = tamanhoSenha+1;
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

const campoSenha = document.querySelector('#campo-senha');

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
geraSenha();

function geraSenha() {
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * letrasMaiusculas.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + letrasMaiusculas[numeroAleatorio];
    }
    campoSenha.value = senha;
}
