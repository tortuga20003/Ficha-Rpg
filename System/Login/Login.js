function entrar(){

let jogador = document.getElementById("nomeJogador").value
let personagem = document.getElementById("nomePersonagem").value

if(jogador == "" || personagem == ""){
alert("Preencha tudo")
return
}

// NÃO apagar todo o localStorage
// Isso estava apagando vida, histórico, imagem etc
// localStorage.clear();

// Salva apenas jogador e personagem
localStorage.setItem("jogador", jogador)
localStorage.setItem("personagem", personagem)

// Ir para a ficha
window.location.href = "../Ficha/FichasPersonagens.html"

}