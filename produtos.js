const produtos={
    nome:"calça",
    preco: 80,
    tipo: "jeans",
}

for(let chave in produtos){
    console.log(`${chave}: ${produtos[chave]}`);
}

console.log(Object.keys(produtos));
console.log(Object.values(produtos));