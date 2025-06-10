// Seleção de elementos do DOM
const tamanhoSenhaEl = document.getElementById('tamanho-senha');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnAumentar = document.getElementById('btn-aumentar');
const campoSenha = document.getElementById('campo-senha');
const barraForca = document.querySelector('.barra'); // Seleciona a div da barra de força
const textosForca = document.querySelectorAll('.parametro-senha-textos p'); // Seleciona os textos "Fraca", "Média", "Forte"

// Variável para armazenar o tamanho atual da senha
let tamanhoSenha = 12; // Valor inicial que corresponde ao seu HTML

// Função para atualizar o número de caracteres exibido na tela
function atualizaTamanhoDisplay() {
    tamanhoSenhaEl.textContent = tamanhoSenha;
}

// Event Listeners para os botões de aumentar e diminuir o tamanho da senha
btnDiminuir.addEventListener('click', () => {
    if (tamanhoSenha > 1) { // Limita o tamanho mínimo da senha a 1
        tamanhoSenha--;
        atualizaTamanhoDisplay(); // Atualiza o texto na tela
        gerarSenha(); // Gera uma nova senha com o tamanho ajustado
    }
});

btnAumentar.addEventListener('click', () => {
    if (tamanhoSenha < 20) { // Limita o tamanho máximo da senha a 20 (você pode ajustar)
        tamanhoSenha++;
        atualizaTamanhoDisplay(); // Atualiza o texto na tela
        gerarSenha(); // Gera uma nova senha com o tamanho ajustado
    }
});

// Função principal para gerar a senha
function gerarSenha() {
    // Pega o estado atual dos checkboxes
    const usarMaiusculo = document.getElementById('maiusculo').checked;
    const usarMinusculo = document.getElementById('minusculo').checked;
    const usarNumero = document.getElementById('numero').checked;
    const usarSimbolo = document.getElementById('simbolo').checked;

    // Constrói a string de caracteres disponíveis com base nos checkboxes
    let caracteres = '';
    if (usarMaiusculo) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (usarMinusculo) caracteres += 'abcdefghijklmnopqrstuvwxyz';
    if (usarNumero) caracteres += '0123456789';
    if (usarSimbolo) caracteres += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    // Se nenhuma opção de caractere for selecionada
    if (!caracteres) {
        campoSenha.value = ''; // Limpa o campo da senha
        atualizarForcaSenha(''); // Reseta a barra de força para indicar ausência de senha
        return; // Sai da função, pois não há caracteres para gerar
    }

    // Gera a senha caractere por caractere
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        // Seleciona um caractere aleatório da string de 'caracteres'
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    campoSenha.value = senha; // Exibe a senha gerada no campo de texto
    atualizarForcaSenha(senha); // Chama a função para calcular e exibir a força da senha
}

// Função para atualizar visualmente a força da senha
function atualizarForcaSenha(senha) {
    let complexidade = 0; // Pontuação para a complexidade da senha

    // Verifica quais tipos de caracteres estão presentes e aumenta a complexidade
    if (senha.match(/[a-z]/)) complexidade++; // Tem letras minúsculas
    if (senha.match(/[A-Z]/)) complexidade++; // Tem letras maiúsculas
    if (senha.match(/[0-9]/)) complexidade++; // Tem números
    if (senha.match(/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/)) complexidade++; // Tem símbolos

    let corDaBarra = '';
    let larguraDaBarra = '0%';

    // Lógica para determinar a força da senha e definir a cor/largura da barra
    if (senha.length < 6 || complexidade < 2) {
        // Senha muito curta ou com poucos tipos de caracteres
        corDaBarra = '#E71B32'; // Vermelho para "Fraca"
        larguraDaBarra = '33%';
    } else if (senha.length < 10 || complexidade < 3) {
        // Senha de comprimento médio ou com mais de 2 tipos de caracteres
        corDaBarra = '#faf408'; // Amarelo para "Média"
        larguraDaBarra = '66%';
    } else {
        // Senha longa e/ou com boa variedade de tipos de caracteres
        corDaBarra = '#00ff85'; // Verde para "Forte"
        larguraDaBarra = '100%';
    }

    // Aplica os estilos na barra de progresso
    barraForca.style.width = larguraDaBarra;
    barraForca.style.backgroundColor = corDaBarra;

    // Atualiza a cor dos textos "Fraca", "Média", "Forte"
    // Primeiro, reseta a cor de todos para a cor padrão (branco)
    textosForca.forEach(p => p.style.color = 'var(--branco)');
    
    // Depois, colore o texto correspondente à força atual
    if (larguraDaBarra === '33%') {
        textosForca[0].style.color = corDaBarra; // Colore "Fraca"
    } else if (larguraDaBarra === '66%') {
        textosForca[1].style.color = corDaBarra; // Colore "Média"
    } else if (larguraDaBarra === '100%') {
        textosForca[2].style.color = corDaBarra; // Colore "Forte"
    }
}


// --- Inicialização do Gerador de Senhas ---

// 1. Define o tamanho inicial da senha na tela (ex: 12)
atualizaTamanhoDisplay();

// 2. Gera a primeira senha quando a página carrega
gerarSenha();

// 3. Adiciona um event listener para cada checkbox.
// Sempre que uma opção (maiúscula, minúscula, número, símbolo) é alterada,
// uma nova senha é gerada automaticamente.
document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', gerarSenha);
});