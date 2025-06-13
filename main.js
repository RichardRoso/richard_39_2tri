// Seleção de elementos do DOM
const tamanhoSenhaEl = document.getElementById('tamanho-senha');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnAumentar = document.getElementById('btn-aumentar');
const campoSenha = document.getElementById('campo-senha');
const barraForca = document.querySelector('.barra');
const textosForca = document.querySelectorAll('.parametro-senha-textos p');
const copiarSenhaBotao = document.getElementById('copiar-senha-botao');
const conteudoSenhaDiv = document.querySelector('.conteudo-senha');


// Variável para armazenar o tamanho atual da senha
let tamanhoSenha = 12;

// Função para atualizar o número de caracteres exibido na tela
function atualizaTamanhoDisplay() {
    tamanhoSenhaEl.textContent = tamanhoSenha;
}

// Event Listeners para os botões de aumentar e diminuir o tamanho da senha
btnDiminuir.addEventListener('click', () => {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        atualizaTamanhoDisplay();
        gerarSenha();
    }
});

btnAumentar.addEventListener('click', () => {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        atualizaTamanhoDisplay();
        gerarSenha();
    }
});

// Função principal para gerar a senha
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
        atualizarForcaSenha('');
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    campoSenha.value = senha;
    atualizarForcaSenha(senha);
}

// Função para atualizar visualmente a força da senha
function atualizarForcaSenha(senha) {
    let complexidade = 0;

    if (senha.match(/[a-z]/)) complexidade++;
    if (senha.match(/[A-Z]/)) complexidade++;
    if (senha.match(/[0-9]/)) complexidade++;
    if (senha.match(/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/)) complexidade++;

    let corDaBarra = '';
    let larguraDaBarra = '0%';

    if (senha.length < 6 || complexidade < 2) {
        corDaBarra = '#E71B32'; // Vermelho
        larguraDaBarra = '33%';
    } else if (senha.length < 10 || complexidade < 3) {
        corDaBarra = '#faf408'; // Amarelo
        larguraDaBarra = '66%';
    } else {
        corDaBarra = '#00ff85'; // Verde
        larguraDaBarra = '100%';
    }

    barraForca.style.width = larguraDaBarra;
    barraForca.style.backgroundColor = corDaBarra;

    textosForca.forEach(p => p.style.color = 'var(--branco)');
    
    if (larguraDaBarra === '33%') {
        textosForca[0].style.color = corDaBarra;
    } else if (larguraDaBarra === '66%') {
        textosForca[1].style.color = corDaBarra;
    } else if (larguraDaBarra === '100%') {
        textosForca[2].style.color = corDaBarra;
    }
}


// --- Inicialização do Gerador de Senhas ---

// 1. Define o tamanho inicial da senha na tela (ex: 12)
atualizaTamanhoDisplay();

// 2. Gera a primeira senha quando a página carrega
gerarSenha();

// 3. Adiciona um event listener para cada checkbox.
document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', gerarSenha);
});

// Adiciona funcionalidade de copiar senha ao clipboard
copiarSenhaBotao.addEventListener('click', () => {
    campoSenha.select();
    campoSenha.setSelectionRange(0, 99999); // Para dispositivos móveis

    // Tenta copiar o texto para a área de transferência
    navigator.clipboard.writeText(campoSenha.value)
        .then(() => {
            // Cria um elemento para a mensagem "Copiado!"
            let mensagem = document.createElement('span');
            mensagem.classList.add('copiar-senha-mensagem');
            mensagem.textContent = 'Copiado!';
            conteudoSenhaDiv.appendChild(mensagem); // Adiciona a mensagem dentro do div .conteudo-senha

            // Força um reflow para garantir que a transição de opacidade funcione
            void mensagem.offsetWidth; 

            // Torna a mensagem visível
            mensagem.classList.add('visivel');

            // Esconde e remove a mensagem após um tempo
            setTimeout(() => {
                mensagem.classList.remove('visivel');
                // Remove o elemento da DOM após a transição de saída
                mensagem.addEventListener('transitionend', () => {
                    mensagem.remove();
                }, { once: true }); // Garante que o listener seja removido após uma execução
            }, 2000); // Mensagem visível por 2 segundos

        })
        .catch(err => {
            console.error('Falha ao copiar a senha: ', err);
            // Alerta o usuário se a cópia falhar
            alert('Falha ao copiar a senha. Por favor, copie manualmente.');
        });
});