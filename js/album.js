class Album{

    constructor(){ 
    }

    Inicia(){
        
        let mythis=this;
        $("#fig-faltam").html(CarregaAlbum(FALTANTES));
        $("#fig-repetidas").html(CarregaAlbum(REPETIDAS));
    }
    
    Colar(o,tipoClique){
        
        let classe = $(o).attr('class');
        let posicao = parseInt($(o).attr('value'));
        let selecionado = "";
        let album = ""
           
        if (classe==FALTANTES_ON || classe==REPETIDAS_ON){
            selecionado="0";

            if (tipoClique==FALTANTES){
                o.className=FALTANTES_OFF;
                album = FALTANTES;
            }
            else{
                o.className=REPETIDAS_ON;
                album = REPETIDAS;
            }
        }
        else{
            selecionado="1";
            if (tipoClique==FALTANTES){
                o.className=FALTANTES_ON;                
                album = FALTANTES;
            }
            else{
                o.className=REPETIDAS_ON
                album = REPETIDAS;                
            }
        }
       
        local.Put(album, substituiCharPosicao(local.Get(album),posicao,selecionado));

    }//Colar
}

function CarregaAlbum(album){

    let zero3 = new Padder(3);
    let conteudo = "";
    let tipoClique = FALTANTES;
   
    if (album!=FALTANTES) tipoClique = REPETIDAS;
    
    let dados =  local.Get(album);

    conteudo+='<div class="row">';
   
    for (i = 0; i < 600; i++) { 
      
        if (dados.substring(i,i+1)=="1"){
            //marcado
            if (album==FALTANTES){
                tipoClasse = FALTANTES_ON; 
            }else{
                tipoClasse = REPETIDAS_ON; 
            }
        }else{
            //desmarcado
            if (album==FALTANTES){
                tipoClasse = FALTANTES_OFF;
            }else{
                tipoClasse = REPEDITAS_OFF;
            }
        }
        
        let numero = zero3.pad(i);

        if (i==20 || i==10 || i==1){
            conteudo+=`
            <input type="button" title="${numero}" class="${tipoClasse}" onclick='copa.Colar(this,"${tipoClique}");' value="${numero}">
            
            <a href="" class="badge1" data-badge="3"></a>
            `;
        }
        else{
            conteudo+=`
            <input type="button" title="${numero}" class="${tipoClasse}" onclick='copa.Colar(this,"${tipoClique}");' value="${numero}">
            `;
        }
    }

    conteudo+='</div>'

    return(conteudo); 
} 
