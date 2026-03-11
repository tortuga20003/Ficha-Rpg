function entrar(){

let jogador = document.getElementById("nomeJogador").value
let personagem = document.getElementById("nomePersonagem").value

if(jogador == "" || personagem == ""){
alert("Preencha tudo")
return
}

localStorage.clear(); // limpa dados antigos

localStorage.setItem("jogador", jogador)
localStorage.setItem("personagem", personagem)

window.location.href = "../Ficha/FichasPersonagens.html"

}