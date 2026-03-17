import { db, doc, setDoc, getDoc } from "../Login/FireBase.js";

let jogador = localStorage.getItem("jogador")
let personagem = localStorage.getItem("personagem")

if(!jogador || !personagem){

alert("Faça login primeiro")
window.location.href = "../Login/Login.html"

}

document.getElementById("usuarioLogado").innerText =
"Jogador: " + jogador + " | Personagem: " + personagem

let visualizar = document.getElementById("visualizar");
let editarFicha = document.getElementById("editarFicha");
let vidaAtual = 0;

document.getElementById("editar").addEventListener("click", function() {

visualizar.style.display = "none";
editarFicha.style.display = "block";

document.getElementById("nome").value = localStorage.getItem("nome") || "";
document.getElementById("raca").value = localStorage.getItem("raca") || "";
document.getElementById("classe").value = localStorage.getItem("classe") || "";
document.getElementById("vidaMax").value = localStorage.getItem("vidaMax") || "";
document.getElementById("magias").value = localStorage.getItem("magias") || "";
document.getElementById("inventario").value = localStorage.getItem("inventario") || "";
document.getElementById("equipamentos").value = localStorage.getItem("equipamentos") || "";
document.getElementById("habilidades").value = localStorage.getItem("habilidades") || "";
document.getElementById("historia").value = localStorage.getItem("historia") || "";

});

document.getElementById("salvar").addEventListener("click", salvarFicha);

function salvarFicha(){

let nome = document.getElementById("nome").value;
let raca = document.getElementById("raca").value;
let classe = document.getElementById("classe").value;
let vidaMax = document.getElementById("vidaMax").value;
let magias = document.getElementById("magias").value;
let inventario = document.getElementById("inventario").value;
let equipamentos = document.getElementById("equipamentos").value;
let habilidades = document.getElementById("habilidades").value;
let historia = document.getElementById("historia").value;

localStorage.setItem("nome",nome);
localStorage.setItem("raca",raca);
localStorage.setItem("classe",classe);
localStorage.setItem("vidaMax",vidaMax);
localStorage.setItem("magias",magias);
localStorage.setItem("inventario",inventario);
localStorage.setItem("equipamentos",equipamentos);
localStorage.setItem("habilidades",habilidades);
localStorage.setItem("historia",historia);

/* CORREÇÃO DA VIDA */
vidaAtual = Number(localStorage.getItem("vidaAtual")) || vidaMax;
localStorage.setItem("vidaAtual",vidaAtual);

carregar();

visualizar.style.display="block";
editarFicha.style.display="none";

salvarFirebase();

}

document.getElementById("restaurarVida").addEventListener("click",function(){

let vidaMax = Number(localStorage.getItem("vidaMax"));

vidaAtual = vidaMax;

localStorage.setItem("vidaAtual",vidaAtual);

salvarFirebase();

carregar();

});

document.getElementById("imagemV").addEventListener("click",function(){

this.style.width = (this.style.width==="150px")?"300px":"150px";

});

document.getElementById("dano").addEventListener("click",function(){

let quantidade = Number(document.getElementById("quantidadeVida").value);
let autor = document.getElementById("autorAcao").value;
let tipo = document.getElementById("tipoAcao").value;
let vidaMax = Number(localStorage.getItem("vidaMax"));

if(tipo==="Cura"){

vidaAtual = vidaAtual + quantidade;

if(vidaAtual>vidaMax) vidaAtual=vidaMax;

mostrarDano(quantidade);

adicionarHistorico(autor+" usou "+tipo+" e curou "+quantidade+" de vida");

}else{

vidaAtual = vidaAtual - quantidade;

if(vidaAtual<0) vidaAtual=0;

mostrarDano(-quantidade);

adicionarHistorico(autor+" usou "+tipo+" e causou "+quantidade+" de dano");

}

localStorage.setItem("vidaAtual",vidaAtual);

salvarFirebase();

carregar();

});

document.getElementById("limparHistorico").addEventListener("click",function(){

localStorage.removeItem("historico");

salvarFirebase();

carregar();

});

document.getElementById("imagem").addEventListener("change",function(){

let reader = new FileReader();

reader.onload = function(){

localStorage.setItem("imagem",reader.result);

carregar();

salvarFirebase();

};

reader.readAsDataURL(this.files[0]);

});

function adicionarHistorico(texto){

let lista = JSON.parse(localStorage.getItem("historico"))||[];

lista.unshift(texto);

localStorage.setItem("historico",JSON.stringify(lista));

salvarFirebase();

}

function mostrarDano(valor){

let texto = document.getElementById("danoFlutuante");

texto.innerText=(valor>0?"+"+valor:valor)+" ❤️";

texto.style.color=(valor>0?"green":"red");

texto.style.display="block";

setTimeout(()=>{texto.style.display="none"},1500);

}

function transformarLista(texto){

if(!texto) return "";

let linhas = texto.split("\n");

return linhas.map(linha=>{

if(linha.trim()==="") return "<br>";

if(linha.trim().startsWith("•")){
return "<li>"+linha.replace("•","").trim()+"</li>";
}

return linha+"<br>";

}).join("");

}

function carregar(){

document.getElementById("nomeV").innerText="Nome: "+(localStorage.getItem("nome")||"");
document.getElementById("racaV").innerText="Raça: "+(localStorage.getItem("raca")||"");
document.getElementById("classeV").innerText="Classe: "+(localStorage.getItem("classe")||"");
document.getElementById("historiaV").innerText=localStorage.getItem("historia")||"";

document.getElementById("magiasV").innerHTML=transformarLista(localStorage.getItem("magias"));
document.getElementById("inventarioV").innerHTML=transformarLista(localStorage.getItem("inventario"));
document.getElementById("equipamentosV").innerHTML=transformarLista(localStorage.getItem("equipamentos"));
document.getElementById("habilidadesV").innerHTML=transformarLista(localStorage.getItem("habilidades"));

let vidaMax = Number(localStorage.getItem("vidaMax"))||0;

vidaAtual = Number(localStorage.getItem("vidaAtual"))||0;

document.getElementById("vidaV").innerText=vidaAtual+" / "+vidaMax;

let porcentagem = vidaMax?(vidaAtual/vidaMax)*100:0;

let barra=document.getElementById("barraVida");

barra.style.width=porcentagem+"%";

if(porcentagem>60) barra.style.background="green";
else if(porcentagem>30) barra.style.background="orange";
else barra.style.background="red";

let lista = JSON.parse(localStorage.getItem("historico"))||[];

document.getElementById("historico").innerHTML=lista.map(item=>"<li>"+item+"</li>").join("");

let img = localStorage.getItem("imagem");

if(img) document.getElementById("imagemV").src=img;

}

let botaoHistoria=document.getElementById("toggleHistoria");

let historiaContainer=document.getElementById("historiaContainer");

botaoHistoria.addEventListener("click",function(){

if(historiaContainer.style.display==="none"){

historiaContainer.style.display="block";

botaoHistoria.innerText="História ▲";

}else{

historiaContainer.style.display="none";

botaoHistoria.innerText="História ▼";

}

});

let camposAutosave=["nome","raca","classe","vidaMax","magias","inventario","equipamentos","habilidades","historia"];

camposAutosave.forEach(id=>{

let campo=document.getElementById(id);

campo.addEventListener("input",()=>{

localStorage.setItem(id,campo.value);

});

});

carregar();

async function salvarFirebase(){

let idFicha=jogador+"_"+personagem;

let dados={

jogador:jogador,
nome:localStorage.getItem("nome"),
raca:localStorage.getItem("raca"),
classe:localStorage.getItem("classe"),
vidaMax:localStorage.getItem("vidaMax"),
vidaAtual:localStorage.getItem("vidaAtual"),
magias:localStorage.getItem("magias"),
inventario:localStorage.getItem("inventario"),
equipamentos:localStorage.getItem("equipamentos"),
habilidades:localStorage.getItem("habilidades"),
historia:localStorage.getItem("historia"),
historico:localStorage.getItem("historico"),
imagem:localStorage.getItem("imagem")

};

await setDoc(doc(db,"fichas",idFicha),dados);

}

async function carregarFirebase(){

let idFicha=jogador+"_"+personagem;

let ref=doc(db,"fichas",idFicha);

let snap=await getDoc(ref);

if(snap.exists()){

let dados=snap.data();

for(let chave in dados){

localStorage.setItem(chave,dados[chave]);

}

carregar();

}

}

carregarFirebase();