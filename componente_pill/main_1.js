var busca= document.getElementById("busca");
var resultadosLista = document.getElementById("resultado");
var conformidades = document.getElementById("conformidades");
var parte_fixar = document.getElementById("parte_fixar");

//resultado.innerHTML += busca.value;
//console.log(busca.value);

busca.addEventListener("input", function() {
    
    var termoPesquisa = busca.value.toLowerCase();

    getConformidades().then(data => {
        var resultados = pesquisarEmTempoReal(data.doencas, termoPesquisa);
        //console.log(resultados);
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


function pesquisarEmTempoReal(array, palavraParcial) {
    let resultados = array.filter(elemento =>
        typeof elemento.tipo === 'string' && elemento.tipo.toLowerCase().startsWith(palavraParcial)
    );
    return resultados;
}

function exibirResultados(resultados) {
    
    resultadosLista.innerHTML = '';
    
    resultados.forEach(resultado => {
        var itemLista = document.createElement('span');
        itemLista.textContent = resultado.tipo + ' ';
        itemLista.classList = `btn btn-info pill class-${resultado.tipo}`
        resultadosLista.appendChild(itemLista);
    });
}


    resultadosLista.addEventListener('click', event =>{
        if(event.target.tagName === 'SPAN'){
            const texto = event.target.innerText; 
           
           // console.log(`Você clicou no: ${texto}`);
            var span = document.createElement('span')
            span.textContent = texto;
            span.classList = `btn btn-primary me-2 mt-2 class-${resultado.tipo}`
            parte_fixar.appendChild(span);
        }
    })




   
   

    
