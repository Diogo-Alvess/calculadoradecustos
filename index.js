const containerCustosFixos = document.getElementById("pFixos")
const containerPerCapta = document.getElementById("PPerCapta")
const containerParticipantes = document.getElementById("listaPessoas")
const valorFinal = document.getElementById("containerValorFinal")
let pessoas = []
let produtosFixos = []
let produtosPerCapta = []
let custoPorPessoa = 0

function calculaCustoPorPessoa() {
    var acm1 = 0, acm2 = 0
    var custoUni, custoFixo
    for (let i = 0; i < produtosPerCapta.length; i++) {
        acm1 = acm1 + produtosPerCapta[i].valor
    }
    custoUni = acm1
    console.log(custoUni)
    for (let i = 0; i < produtosFixos.length; i++) {
        acm2 = acm2 + produtosFixos[i].valor
    }
    custoFixo = acm2/pessoas.length
    console.log(custoFixo)
    custoPorPessoa = custoUni + custoFixo
}

function renderiza(){
    calculaCustoPorPessoa()

    //limpa o html dos campos para que a renderização não se sobreponha
    containerCustosFixos.innerHTML = ""
    containerParticipantes.innerHTML = ""
    containerPerCapta.innerHTML = ""

    //Faz o display dos produtos de custos fixos, com seus respectivos valores e botões
    for(var i = 0; i < produtosFixos.length; i++){
        const spanNome = document.createElement("span")
        spanNome.textContent = produtosFixos[i].nome
        const spanPreco = document.createElement("span")
        spanPreco.textContent = produtosFixos[i].valor.toFixed(2)
        const spanX = document.createElement("button")
        spanX.textContent = "X"
        containerCustosFixos.appendChild(spanNome)
        containerCustosFixos.appendChild(spanPreco)
        containerCustosFixos.appendChild(spanX)
        spanX.addEventListener("click", (function(x){
            return function(){
                produtosFixos.splice(x, 1)
                renderiza()
            }
        })(i))
    }

    //Faz o display dos nomes dos participantes
    for(var i = 0; i  < pessoas.length; i++){
        const divNome = document.createElement("li")
        const spanNome = document.createElement("span")
        spanNome.textContent = pessoas[i]
        const spanX = document.createElement("button")
        spanX.textContent = "X"
        divNome.appendChild(spanX)
        divNome.appendChild(spanNome)
        containerParticipantes.appendChild(divNome)
        spanX.addEventListener("click", (function(x){
            return function(){
                pessoas.splice(x, 1)
                renderiza()
            }
        })(i))
    }

    //faz o display dos produtoas de custo por pessoa
    for(var i = 0; i < produtosPerCapta.length; i++){
        const spanNome = document.createElement("span")
        spanNome.textContent = produtosPerCapta[i].nome
        const spanPreco = document.createElement("span")
        spanPreco.textContent = produtosPerCapta[i].valor.toFixed(2)*pessoas.length
        const spanX = document.createElement("button")
        spanX.textContent = "X"
        containerPerCapta.appendChild(spanNome)
        containerPerCapta.appendChild(spanPreco)
        containerPerCapta.appendChild(spanX)
        spanX.addEventListener("click", (function(x){
            return function(){
                produtosPerCapta.splice(x, 1)
                renderiza()
            }
        })(i))
    }
    if(!(isNaN(custoPorPessoa))){
        valorFinal.innerText = custoPorPessoa.toFixed(2)
    }
}

function addPessoa(event){
    const nome = document.formulario.noe.value
    pessoas.push(nome)
    console.log(pessoas)
    renderiza()
    document.formulario.noe.value = null
}

function addProdCF(){
    const prodCF = {
        nome: document.formulario.produto.value,
        valor: Number(document.formulario.valor.value),
    }
    produtosFixos.push(prodCF)
    console.log(produtosFixos)
    renderiza()
    document.formulario.produto.value = null
    document.formulario.valor.value = null
}

function addProdPC(){
    const prodPC = {
        nome: document.formulario.produto.value,
        valor: Number(document.formulario.valor.value),
    }
    produtosPerCapta.push(prodPC)
    console.log(produtosPerCapta)
    renderiza()
    document.formulario.produto.value = null
    document.formulario.valor.value = null
}
renderiza()
const botao_adiciona_nome = document.getElementById("botaoAdiciona")
botao_adiciona_nome.addEventListener("click", addPessoa)

const botao_adiciona_produto_cf = document.getElementById("botaoCF")
botao_adiciona_produto_cf.addEventListener("click", addProdCF)

const botao_adiciona_produto_pc = document.getElementById("botaoPC")
botao_adiciona_produto_pc.addEventListener("click", addProdPC)
