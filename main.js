// Seleção de elementos do DOM
const tamanhoSenhaEl = document.getElementById('tamanho-senha');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnAumentar = document.getElementById('btn-aumentar');
const campoSenha = document.getElementById('campo-senha');
const barraForca = document.querySelector('.barra');
const textosForca = document.querySelectorAll('.parametro-senha-textos p');
const copiarSenhaBotao = document.getElementById('copiar-senha-botao');
const conteudoSenhaDiv = document.querySelector('.conteudo-senha');

// --- NOVOS ELEMENTOS PARA O HISTÓRICO (Criados via JS) ---
// Criamos um novo div para o histórico
const historicoSenhasDiv = document.createElement('div');
historicoSenhasDiv.classList.add('historico-senhas'); // Adicionamos uma classe para estilização
historicoSenhasDiv.innerHTML = '<h3>Histórico de Senhas</h3><ul id="lista-historico"></ul>'; // Título e lista
document.querySelector('.conteudo').appendChild(historicoSenhasDiv); // Adicionamos ao final do .conteudo

const listaHistoricoEl = document.getElementById('lista-historico');
// --- FIM DOS NOVOS ELEMENTOS ---


// Variável para armazenar o tamanho atual da senha
let tamanhoSenha = 12;
// Array para armazenar o histórico de senhas
let historicoSenhas = [];

// --- NOVAS FUNÇÕES PARA O HISTÓRICO ---

// Carrega o histórico do localStorage ao iniciar
function carregarHistorico() {
    const historicoSalvo = localStorage.getItem('historicoSenhasGeradas');
    if (historicoSalvo) {
        historicoSenhas = JSON.parse(historicoSalvo);
        atualizarHistoricoDisplay();
    }
}

// Salva o histórico no localStorage
function salvarHistorico() {
    localStorage.setItem('historicoSenhasGeradas', JSON.stringify(historicoSenhas));
}

// Adiciona uma senha ao histórico e atualiza o display
function adicionarSenhaAoHistorico(senha) {
    // Adiciona a senha no início do array (mais recente primeiro)
    historicoSenhas.unshift({ senha: senha, data: new Date().toLocaleString() });

    // Limita o histórico a, por exemplo, 5 senhas
    // Você pode ajustar esse número para ter mais ou menos senhas no histórico
    if (historicoSenhas.length > 5) {
        historicoSenhas.pop(); // Remove a senha mais antiga se o limite for atingido
    }
    salvarHistorico();
    atualizarHistoricoDisplay();
}

// Atualiza a exibição do histórico na página
function atualizarHistoricoDisplay() {
    listaHistoricoEl.innerHTML = ''; // Limpa a lista existente
    if (historicoSenhas.length === 0) {
        listaHistoricoEl.innerHTML = '<li>Nenhuma senha gerada ainda.</li>';
        return;
    }
    historicoSenhas.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.senha}</strong> <span class="data-historico">(${item.data})</span>`;
        listaHistoricoEl.appendChild(li);
    });
}
// --- FIM DAS NOVAS FUNÇÕES ---


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

    // --- CHAMA A FUNÇÃO PARA ADICIONAR AO HISTÓRICO APÓS GERAR A SENHA ---
    adicionarSenhaAoHistorico(senha);
    // --- FIM DA CHAMADA ---
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

// 2. Carrega o histórico salvo no localStorage (importante antes de gerar a primeira senha)
carregarHistorico();

// 3. Gera a primeira senha quando a página carrega
gerarSenha();

// 4. Adiciona um event listener para cada checkbox.
document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', gerarSenha);
});

// Adiciona funcionalidade de copiar senha ao clipboard
copiarSenhaBotao.addEventListener('click', () => {
    campoSenha.select();
    campoSenha.setSelectionRange(0, 99999); // Para dispositivos móveis

    navigator.clipboard.writeText(campoSenha.value)
        .then(() => {
            let mensagem = document.createElement('span');
            mensagem.classList.add('copiar-senha-mensagem');
            mensagem.textContent = 'Copiado!';
            conteudoSenhaDiv.appendChild(mensagem);

            void mensagem.offsetWidth; // Força um reflow para garantir que a transição funcione

            mensagem.classList.add('visivel');

            setTimeout(() => {
                mensagem.classList.remove('visivel');
                mensagem.addEventListener('transitionend', () => {
                    mensagem.remove();
                }, { once: true });
            }, 2000); // Mensagem visível por 2 segundos

        })
        .catch(err => {
            console.error('Falha ao copiar a senha: ', err);
            alert('Falha ao copiar a senha. Por favor, copie manualmente.');
        });
});