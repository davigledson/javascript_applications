var busca= document.getElementById("busca");
var resultadosLista = document.getElementById("resultado");
var conformidades = document.getElementById("conformidades");


//resultado.innerHTML += busca.value;
//console.log(busca.value);

busca.addEventListener("input", function() {
    
    var termoPesquisa = busca.value.toLowerCase();

    getConformidades().then(data => {
        var resultados = pesquisarEmTempoReal(data.doencas, termoPesquisa);
        console.log(resultados);
        exibirResultados(resultados);

        
    })
})


function getConformidades(){
   return fetch("http://localhost:3000/conformidades")
.then(resposta => {
    if (resposta.status != 200){throw new Error("ERROR 404 MEU")} 
    
    return resposta.json();
         
})
.then(data => {
     //console.log(data);
//    console.log(data.doencas[0].tipo) 

   return data;

})

}

function pesquisarNoArray(data) {
    data.doencas.forEach(doenca => {
    
        console.log("ID:", doenca.id);
        console.log("Tipo:", doenca.tipo);
    });

}

//getConformidades().then(data => pesquisarNoArray(data));


function pesquisarEmTempoReal(array, palavraParcial) {
    let resultados = array.filter(elemento =>
        typeof elemento.tipo === 'string' && elemento.tipo.toLowerCase().startsWith(palavraParcial)
    );
    return resultados;
}

function exibirResultados(resultados) {
    
    resultadosLista.innerHTML = '';
    
    resultados.forEach(resultado => {
        var itemLista = document.createElement('li');
        itemLista.textContent = resultado.tipo;
        resultadosLista.appendChild(itemLista);
    });
}