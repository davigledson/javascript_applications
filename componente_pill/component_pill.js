//criar funcao construtora


function Component_pill(){

 this.busca= document.getElementById("busca");
 this.resultadosLista = document.getElementById("resultado");
 this.conformidades = document.getElementById("conformidades");
 this.parte_fixar = document.getElementById("parte_fixar");

//resultado.innerHTML += busca.value;
//console.log(busca.value);

this.inicia = () => {
    
    this.busca.addEventListener("input", () => {
    
    var termoPesquisa = this.busca.value.toLowerCase();
    
    this.getConformidades().then(data => {
        const resultados = this.pesquisarEmTempoReal(data.doencas, termoPesquisa);
        //console.log(resultados);
        
        this.exibirResultados(resultados);
        
    });
});

this.resultadosLista.addEventListener('click', event =>{
    if(event.target.tagName === 'SPAN'){
        const texto = event.target.innerText; 
       
       // console.log(`Você clicou no: ${texto}`);
        var span = document.createElement('span');
        span.textContent = texto;
        span.classList = `btn btn-primary me-2 mt-2 class-${resultado.tipo}`;
        this.parte_fixar.appendChild(span);
    }
})
}




this.getConformidades = () => {
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


this.pesquisarEmTempoReal = (array, palavraParcial) => {

    if (palavraParcial != ''){
        let resultados = array.filter(elemento =>
        typeof elemento.tipo === 'string' && elemento.tipo.toLowerCase().startsWith(palavraParcial)
    );
   // console.log(resultados);
    return resultados;

    //se nao tiver nenhuma letra, retorna uma array vazio
    } else return [];
    
}

this.exibirResultados = (resultados) => {
    
    this.resultadosLista.innerHTML = '';
    
    resultados.forEach(resultado => {
        var itemLista = document.createElement('span');
        itemLista.textContent = resultado.tipo + ' ';
        itemLista.classList = `btn btn-info pill class-${resultado.tipo}`
        this.resultadosLista.appendChild(itemLista);
    });


   

}




}

const componente_pill = new Component_pill();
componente_pill.inicia();


   
   

    
