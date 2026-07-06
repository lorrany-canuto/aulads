// ====================================================================
// APP.JS - CONEXÃO ENTRE HTML E BIBLIOTECA
// ====================================================================
// Este arquivo é a "ponte" entre o HTML (a página que você vê) e o
// arquivo biblioteca.js (onde estão as regras de negócio).
// 
// O que ele faz:
// - Escuta eventos do usuário (cliques, submits de formulário)
// - Chama funções da biblioteca para processar os dados
// - Atualiza a tela com os resultados
//
// ALUNOS: Complete as funções marcadas com TODO
// ====================================================================

// "import" traz o objeto "biblioteca" do arquivo biblioteca.js para cá.
// É como dizer: "Pegue tudo que está lá e me deixe usar aqui".

import { biblioteca } from "./biblioteca.js";

// ====================================================================
// CONFIGURAÇÃO INICIAL - O que roda quando a página carrega
// ====================================================================

// addEventListener é como instalar uma "espiã" que fica esperando algo acontecer.
// 'DOMContentLoaded' significa: "espere até que o HTML inteiro tenha sido carregado".
// Só então executamos nosso código, porque precisamos que os elementos HTML existam.

document.addEventListener('DOMContentLoaded', function() {

    // console.log() mostra mensagens no "Console" do navegador (F12 > Console).
    // Serve para debug, como se fosse um "prints" para programador ver.

    console.log('🚀 Biblioteca carregada!');
    
    // Adiciona livros de exemplo para a biblioteca não começar vazia

    adicionarLivrosExemplo();
    
    // Monta a tabela de livros na tela pela primeira vez

    atualizarListaLivros();
});

// ====================================================================
// FUNÇÕES AUXILIARES - Fazem tarefas pequenas de apoio
// ====================================================================

// ----------------------------------------------------------------
// adicionarLivrosExemplo()
// Serve para preencher a biblioteca com livros de exemplo.
// Assim, quando a página carrega, já aparecem livros na tela.
// ----------------------------------------------------------------

function adicionarLivrosExemplo() {
    const exemplos = [
        { nome: "As 48 Leis do Poder", autor: "Robert Greene", categoria: "Negócios", estoque: 210 },
        { nome: "Pai Rico, Pai Pobre", autor: "Robert Kiyosaki", categoria: "Finanças", estoque: 150 },
        { nome: "O Homem Mais Rico da Babilônia", autor: "George S. Clason", categoria: "Finanças", estoque: 120 },
        { nome: "Hábitos Atômicos", autor: "James Clear", categoria: "Desenvolvimento Pessoal", estoque: 180 },
        { nome: "O Poder do Hábito", autor: "Charles Duhigg", categoria: "Desenvolvimento Pessoal", estoque: 160 },
        { nome: "A Arte da Guerra", autor: "Sun Tzu", categoria: "Estratégia", estoque: 90 },
        { nome: "O Príncipe", autor: "Nicolau Maquiavel", categoria: "Política", estoque: 80 },
        { nome: "Mais Esperto que o Diabo", autor: "Napoleon Hill", categoria: "Desenvolvimento Pessoal", estoque: 140 },
        { nome: "Pense e Enriqueça", autor: "Napoleon Hill", categoria: "Finanças", estoque: 170 },
        { nome: "O Milagre da Manhã", autor: "Hal Elrod", categoria: "Desenvolvimento Pessoal", estoque: 130 },
        { nome: "Quem Pensa Enriquece", autor: "Napoleon Hill", categoria: "Finanças", estoque: 110 },
        { nome: "Peter Pan", autor: "Irmãos Grim", categoria: "Infantil", estoque: 120 }
    ];
    
    // "for (let livro of exemplos)" é um loop (repetição).
    // Ele pega CADA item da lista "exemplos", um por um,
    // e guarda dentro da variável "livro" para usarmos.

    for (let livro of exemplos) {
        // Chama a função adicionarLivros() que está dentro do objeto "biblioteca"
        biblioteca.adicionarLivros(livro.nome, livro.autor, livro.categoria, livro.estoque);
    }
}

// ====================================================================
// FUNÇÕES PARA MOSTRAR DADOS NA TELA
// ====================================================================

// ----------------------------------------------------------------
// atualizarListaLivros()
// 
// Esta função monta a tabela de livros que aparece no HTML.
// ----------------------------------------------------------------

function atualizarListaLivros() {
    const container = document.getElementById('lista-livros');
    
    if (biblioteca.livros.length === 0) {
        container.innerHTML = `<p class="vazio">📭 Nenhum livro na biblioteca!</p>`;
        return;
    }
    
    let html = '<div class="tabela-livros">';
    html += `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Autor</th>
                    <th>Categoria</th>
                    <th>Estoque</th>
                    <th>Status</th>
                    <th>Aluguéis</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (let i = 0; i < biblioteca.livros.length; i++) {
        const livro = biblioteca.livros[i];
        const status = livro.disponivel ? '✅ Disponível' : '❌ Alugado';
        const statusClass = livro.disponivel ? 'disponivel' : 'alugado';
        
        html += `
            <tr>
                <td>${i + 1}</td>
                <td><strong>${livro.nome}</strong></td>
                <td>${livro.autor}</td>
                <td>${livro.categoria}</td>
                <td>${livro.estoque}</td>
                <td class="${statusClass}">${status}</td>
                <td>${livro.vezesAlugado}</td>
            </tr>
        `;
    }
    
    html += `
            </tbody>
        </table>
        <p class="total">Total: ${biblioteca.livros.length} livros</p>
    </div>`;
    
    container.innerHTML = html;
}

// ----------------------------------------------------------------
// mostrarMensagem(mensagem, tipo)
// ----------------------------------------------------------------

function mostrarMensagem(mensagem, tipo = 'info') {
    const container = document.getElementById('mensagem');
    container.innerHTML = `<div class="mensagem ${tipo}">${mensagem}</div>`;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// ====================================================================
// FUNÇÕES DOS BOTÕES
// ====================================================================

// ----------------------------------------------------------------
// 1. adicionarLivro(event)
// ----------------------------------------------------------------

function adicionarLivro(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const autor = document.getElementById('autor').value;
    const categoria = document.getElementById('categoria').value;
    const estoque = parseInt(document.getElementById('estoque').value);
    
    if (!nome || !autor || !categoria || !estoque) {
        mostrarMensagem('❌ Preencha todos os campos!', 'erro');
        return true;
    }
    
    biblioteca.adicionarLivros(nome, autor, categoria, estoque);
    mostrarMensagem(`✅ Livro "${nome}" adicionado com sucesso!`, 'sucesso');
    atualizarListaLivros();
    document.getElementById('form-livro').reset();
}

// ----------------------------------------------------------------
// 2. mostrarTodos()
// ----------------------------------------------------------------

function mostrarTodos() {
    atualizarListaLivros();
}

// ----------------------------------------------------------------
// 3. mostrarDisponiveis()
// ----------------------------------------------------------------

function mostrarDisponiveis() {
    const container = document.getElementById('lista-livros');
    const disponiveis = biblioteca.livrosDisponiveis();

    if (!disponiveis || disponiveis.length === 0) {
        container.innerHTML = `<p class="vazio">📭 Nenhum livro disponível no momento!</p>`;
        return true;
    }

    let html = '<div class="tabela-livros"><h3>📚 Livros Disponíveis</h3>';
    html += `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Autor</th>
                    <th>Categoria</th>
                    <th>Estoque</th>
                    <th>Aluguéis</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < disponiveis.length; i++) {
        const livro = disponiveis[i];
        html += `
            <tr>
                <td>${i + 1}</td>
                <td><strong>${livro.nome}</strong></td>
                <td>${livro.autor}</td>
                <td>${livro.categoria}</td>
                <td>${livro.estoque}</td>
                <td>${livro.vezesAlugado}</td>
            </tr>
        `;
    }

    html += `
            </tbody>
        </table>
        <p class="total">Total: ${disponiveis.length} livros disponíveis</p>
    </div>`;

    container.innerHTML = html;
}

// ----------------------------------------------------------------
// 4. alugarLivro()
// ----------------------------------------------------------------

function alugarLivro() {
    const input = document.getElementById('alugar-nome');
    const nome = input.value.trim();

    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro para alugar!', 'erro');
        return true;
    }

    // Chama o método alugar da biblioteca
    const resultado = biblioteca.alugar(nome);

    // Verifica se retornou true (sucesso) ou mensagem de sucesso
    if (resultado === true || (typeof resultado === 'string' && resultado.toLowerCase().includes('sucesso'))) {
        mostrarMensagem(`✅ Livro "${nome}" alugado com sucesso!`, 'sucesso');
        atualizarListaLivros();
        input.value = ''; // Limpa o input
    } else {
        mostrarMensagem(`❌ Não foi possível alugar o livro "${nome}". Verifique o estoque ou se ele já está alugado.`, 'erro');
    }
}

// ----------------------------------------------------------------
// 5. devolverLivro()
// ----------------------------------------------------------------

function devolverLivro() {
    const input = document.getElementById('devolver-nome');
    const nome = input.value.trim();

    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro para devolver!', 'erro');
        return true;
    }

    // Chama o método devolver da biblioteca
    const resultado = biblioteca.devolver(nome);

    if (resultado === true || (typeof resultado === 'string' && resultado.toLowerCase().includes('sucesso'))) {
        mostrarMensagem(`✅ Livro "${nome}" devolvido com sucesso!`, 'sucesso');
        atualizarListaLivros();
        input.value = ''; // Limpa o input
    } else {
        mostrarMensagem(`❌ Erro ao devolver o livro "${nome}". Verifique se o nome está correto.`, 'erro');
    }
}

// ----------------------------------------------------------------
// 6. buscarLivro()
// ----------------------------------------------------------------

function buscarLivro() {
    const container = document.getElementById('lista-livros');
    const input = document.getElementById('buscar-nome');
    const nome = input.value.trim();

    if (!nome) {
        mostrarMensagem('❌ Digite um nome para buscar!', 'erro');
        return true;
    }

    const livro = biblioteca.buscarLivro(nome);

    if (livro) {
        const status = livro.disponivel ? '✅ Disponível' : '❌ Alugado';
        const statusClass = livro.disponivel ? 'disponivel' : 'alugado';

        container.innerHTML = `
            <div class="resultado-busca">
                <h3>🔍 Resultado da Busca</h3>
                <div class="cartao-livro">
                    <p><strong>Nome:</strong> ${livro.nome}</p>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Categoria:</strong> ${livro.categoria}</p>
                    <p><strong>Estoque:</strong> ${livro.estoque}</p>
                    <p><strong>Status:</strong> <span class="${statusClass}">${status}</span></p>
                    <p><strong>Total de Aluguéis:</strong> ${livro.vezesAlugado}</p>
                </div>
            </div>
        `;
        input.value = ''; // Limpa o campo de busca
    } else {
        mostrarMensagem(`❌ Livro "${nome}" não encontrado!`, 'erro');
    }
}

// ----------------------------------------------------------------
// 7. mostrarEstatisticas()
// ----------------------------------------------------------------

function mostrarEstatisticas() {
    const container = document.getElementById('lista-livros');
    const stats = biblioteca.estatisticas();

    if (!stats || biblioteca.livros.length === 0) {
        container.innerHTML = `<p class="vazio">📊 Nenhuma estatística disponível. A biblioteca está vazia!</p>`;
        return true;
    }

    // Nota: Adapte as propriedades abaixo (total, disponiveis, alugados) 
    // conforme o que a sua função biblioteca.estatisticas() retorna no biblioteca.js
    container.innerHTML = `
        <div class="estatisticas-container">
            <h3>📊 Estatísticas da Biblioteca</h3>
            <ul>
                <li><strong>Total de Livros Cadastrados:</strong> ${stats.total || biblioteca.livros.length}</li>
                <li><strong>Livros Disponíveis:</strong> ${stats.disponiveis !== undefined ? stats.disponiveis : 'Consultar lista'}</li>
                <li><strong>Livros Alugados:</strong> ${stats.alugados !== undefined ? stats.alugados : 'Consultar lista'}</li>
            </ul>
        </div>
    `;
}

// ----------------------------------------------------------------
// 8. removerLivro()
// ----------------------------------------------------------------

function removerLivro() {
    const input = document.getElementById('remover-nome');
    const nome = input.value.trim();

    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro para remover!', 'erro');
        return true;
    }

    const resultado = biblioteca.removerLivro(nome);

    if (resultado === true || (typeof resultado === 'string' && resultado.toLowerCase().includes('sucesso'))) {
        mostrarMensagem(`✅ Livro "${nome}" removido com sucesso!`, 'sucesso');
        atualizarListaLivros();
        input.value = ''; // Limpa o input
    } else {
        mostrarMensagem(`❌ Não foi possível remover o livro "${nome}". Verifique se o nome está correto.`, 'erro');
    }
}

// ====================================================================
// EXPORTANDO FUNÇÕES PARA O HTML
// ====================================================================

window.adicionarLivro = adicionarLivro;
window.mostrarTodos = mostrarTodos;
window.mostrarDisponiveis = mostrarDisponiveis;
window.alugarLivro = alugarLivro;
window.devolverLivro = devolverLivro;
window.buscarLivro = buscarLivro;
window.mostrarEstatisticas = mostrarEstatisticas;
window.removerLivro = removerLivro;

// ----------------------------------------------------------------
// Evento do formulário de adicionar livro
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-livro');
    if (form) { 
        form.addEventListener('submit', adicionarLivro);
    }
});