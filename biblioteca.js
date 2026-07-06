// ============================================
// BIBLIOTECA - LÓGICA PRINCIPAL
// ============================================
// ALUNOS: Complete as funções marcadas com TODO
// ============================================
export const biblioteca = {
    livros: [],

    // ==========================================
    // 1. ADICIONAR LIVRO (JÁ PRONTO)
    // ==========================================
    adicionarLivros(nome, autor, categoria, estoque) {
        const livro = {
            nome: nome,
            autor: autor,
            categoria: categoria,
            estoque: estoque,
            disponivel: true,
            alugado: false,
            vezesAlugado: 0
        };

        this.livros.push(livro);
        console.log("Livro adicionado:", livro.nome);
        return true;
    },

    // ==========================================
    // 2. MOSTRAR LIVROS (JÁ PRONTO)
    // ==========================================
    mostrarLivros() {
        for (let i = 0; i < this.livros.length; i++) {
            const p = this.livros[i];
            console.log(`${p.nome} - ${p.autor}`);
            return true;
        }
    },

    // ==========================================
    // 3. ALUGAR LIVRO (JÁ PRONTO)
    // ==========================================
    alugar(nome) {
        for (let i = 0; i < this.livros.length; i++) {
            const p = this.livros[i];

            if (p.nome.toLowerCase() === nome.toLowerCase()) { // Atualizado para ignorar maiúsculas/minúsculas
                if (p.disponivel && p.estoque > 0) {
                    p.disponivel = false;
                    p.alugado = true;
                    p.vezesAlugado++;
                    p.estoque--;

                    console.log(nome + " alugado com sucesso");
                    return true; // Sucesso! Retorna true para o app.js atualizar a tela
                } else if (p.estoque <= 0) {
                    console.log("O livro " + nome + " está sem estoque!");
                } else {
                    console.log("O livro " + nome + " já está alugado!");
                }

                return false; // Encontrou o livro, mas não pôde alugar
            }
        }

        console.log("O livro " + nome + " não existe.");
        return false; // Não encontrou o livro
    },

    // ==========================================
    // 4. DEVOLVER LIVRO (JÁ PRONTO)
    // ==========================================
    devolver(nome) {
        for (let i = 0; i < this.livros.length; i++) {
            const p = this.livros[i];
            if (p.nome.toLowerCase() === nome.toLowerCase()) { // Atualizado para ignorar maiúsculas/minúsculas
                if (p.disponivel == false) {
                    p.disponivel = true;
                    p.alugado = false;
                    p.estoque++; // CORRIGIDO: Agora aumenta +1 no estoque ao invés de fixar em 1
                    console.log("Livro", nome, "devolvido com sucesso!");
                    return true; // Sucesso! Retorna true para o app.js saber que deu certo
                } else {
                    console.log("O", nome, "ja esta disponivel!")
                    return false;
                }
            }
        }
        console.log("O", nome, "Nao foi encontrado!!")
        return false; // CORRIGIDO: Retorna false se o livro não existir
    },

    // ==========================================
    // 5. REMOVER LIVRO (JÁ PRONTO)
    // ==========================================
    removerLivro(nome) {
        for (let i = 0; i < this.livros.length; i++) {
            if (this.livros[i].nome.toLowerCase() === nome.toLowerCase()) {
                const removido = this.livros[i];
                this.livros.splice(i, 1);
                console.log("Livro removido", removido.nome);
                return true; // Sucesso! Retorna true para o app.js saber que deu certo
            }
        }
        console.log("Produto não encontrado");
        return false; // CORRIGIDO: Retorna false para o app.js avisar que não achou
    },

    // ==========================================
    // 6. BUSCAR LIVRO (JÁ PRONTO)
    // ==========================================
    buscarLivro(nome) {
        for (let i = 0; i < this.livros.length; i++) {
            const p = this.livros[i]
            if (p.nome.toLowerCase() === nome.toLowerCase()) {
                console.log("Nome: " + p.nome);
                console.log("Estoque: " + p.estoque)
                return p;
            }
        }
        console.log("Livro não encontrado");
        return null
    },

    // ==========================================
    // 7. LIVROS DISPONÍVEIS (TODO - ALUNOS COMPLETAM)
    // ==========================================
    livrosDisponiveis() {
        // TODO: Implementar a função
        return [];
    },

    // ==========================================
    // 8. ESTATÍSTICAS (TODO - ALUNOS COMPLETAM)
    // ==========================================
    estatisticas() {
        // TODO: Implementar a função
        return null;
    }
};