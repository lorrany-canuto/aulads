const biblioteca = {
    livros: [],

    adicionarLivros(nome, autor, ano) {
        const livro = {
            nome,
            autor,
            ano,
            disponivel: true,
            alugado: false,
            vezesAlugado: 0
        };

        this.livros.push(livro);
    },

    mostrarLivros(){
        for(let i=0; i<this.livros.length; i++){
            const L = this.livros[i];
            console.log(L.nome + " - " + L.autor + " - " + L.ano);
        }
    },

    alugar(nome){
        // Criamos uma variável para controlar se achamos o livro
        let livroEncontrado = false;

        for(let i=0; i<this.livros.length; i++){
            const L = this.livros[i];
            if(L.nome === nome){
                livroEncontrado = true; // Achou!
                if(L.disponivel){
                    L.disponivel = false;
                    L.alugado = true;
                    L.vezesAlugado++;
                    console.log("O Livro " + L.nome + " foi alugado com sucesso!");
                } else {
                    console.log("Livro já alugado!");
                }
                break; // Para o loop se já achou o livro
            }
        }

        // Se rodou o array inteiro e não achou
        if (!livroEncontrado) {
            console.log("Livro não encontrado!");
        }
    },

    devolver(nome){
        let livroEncontrado = false;

        for(let i=0; i<this.livros.length; i++){
            const L = this.livros[i];
            if(L.nome === nome){
                livroEncontrado = true;
                if(L.alugado){
                    L.disponivel = true;
                    L.alugado = false;
                    console.log("O Livro " + L.nome + " foi devolvido com sucesso!");
                } else {
                    console.log("Livro não estava alugado!");
                }
                break;
            }
        }

        if (!livroEncontrado) {
            console.log("Livro não encontrado!");
        }
    }
};

// Cadastro correto: Nome, Autor, Ano
biblioteca.adicionarLivros("Cinderela", "Irmãos Grimm", 1812);
biblioteca.adicionarLivros("Peter Pan", "J. M. Barrie", 1911);

// Testando o sistema
console.log("--- Lista de Livros ---");
biblioteca.mostrarLivros();

console.log("\n--- Testando Aluguel ---");
biblioteca.alugar("Cinderela"); // Sucesso
biblioteca.alugar("Cinderela"); // Já alugado
biblioteca.alugar("Harry Potter"); // Não encontrado