// Seleção de elementos
const tamanhoSenhaEl = document.getElementById('tamanho-senha');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnAumentar = document.getElementById('btn-aumentar');
const campoSenha = document.getElementById('campo-senha');
const barraForca = document.querySelector('.barra'); // Seleciona a div da barra de força
const textosForca = document.querySelectorAll('.parametro-senha-textos p'); // Seleciona os textos Fraca, Média, Forte

// Estado inicial do tamanho da senha
let tamanhoSenha = 12; // Valor inicial do seu HTML

// Função para atualizar o texto do tamanho da senha na tela
function atualizaTamanhoDisplay() {
    tamanhoSenhaEl.textContent = tamanhoSenha;
}

// Event Listeners para os botões de aumentar/diminuir
btnDiminuir.addEventListener('click', () => {
    if (tamanhoSenha > 1) { // Garante que o tamanho mínimo seja 1
        tamanhoSenha--;
        atualizaTamanhoDisplay(); // Atualiza o display
        gerarSenha(); // Gera uma nova senha com o novo tamanho
    }
});

btnAumentar.addEventListener('click', () => {
    if (tamanhoSenha < 20) { // Garante que o tamanho máximo seja 20 (ou o que você definir)
        tamanhoSenha++;
        atualizaTamanhoDisplay(); // Atualiza o display
        gerarSenha(); // Gera uma nova senha com o novo tamanho
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

    // Se nenhuma opção for selecionada, limpa o campo da senha e redefine a força
    if (!caracteres) {
        campoSenha.value = '';
        atualizarForcaSenha(''); // Reseta a barra de força
        return; // Sai da função
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        // Seleciona um caractere aleatório da string de caracteres disponíveis
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    campoSenha.value = senha; // Exibe a senha gerada
    atualizarForcaSenha(senha); // Atualiza a força da senha após gerar
}

// Função para atualizar a força da senha visualmente
function atualizarForcaSenha(senha) {
    let complexidade = 0;
    if (senha.match(/[a-z]/)) complexidade++; // Tem letras minúsculas
    if (senha.match(/[A-Z]/)) complexidade++; // Tem letras maiúsculas
    if (senha.match(/[0-9]/)) complexidade++; // Tem números
    if (senha.match(/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/)) complexidade++; // Tem símbolos

    let forca = '';
    let cor = '';
    let larguraBarra = '0%';

    // Lógica para determinar a força da senha
    if (senha.length < 6 || complexidade < 2) {
        forca = 'Fraca';
        cor = '#E71B32'; // Vermelho
        larguraBarra = '33%';
    } else if (senha.length < 10 || complexidade < 3) {
        forca = 'Média';
        cor = '#faf408'; // Amarelo
        larguraBarra = '66%';
    } else {
        forca = 'Forte';
        cor = '#00ff85'; // Verde
        larguraBarra = '100%';
    }

    // Atualiza a barra de progresso
    barraForca.style.width = larguraBarra;
    barraForca.style.backgroundColor = cor;

    // Atualiza a cor dos textos "Fraca", "Média", "Forte"
    textosForca.forEach(p => p.style.color = 'var(--branco)'); // Reseta todos para branco
    if (forca === 'Fraca') {
        textosForca[0].style.color = cor; // Pinta "Fraca"
    } else if (forca === 'Média') {
        textosForca[1].style.color = cor; // Pinta "Média"
    } else if (forca === 'Forte') {
        textosForca[2].style.color = cor; // Pinta "Forte"
    }
}


// --- Inicialização ---

// 1. Atualiza o display do tamanho da senha no carregamento da página
atualizaTamanhoDisplay();

// 2. Gera a senha inicial no carregamento da página
gerarSenha();

// 3. Adiciona listeners para os checkboxes para regenerar a senha
document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', gerarSenha); // Quando um checkbox muda, regenera a senha
});