class Usuario{
    
    constructor(){ 
       
        let  objectFromString = JSON.parse(localStorage.getItem("usuario"));   

        this.id = objectFromString.id;
        this.nome = objectFromString.nome;
        this.email = objectFromString.email;
    }
    
    Ativar(id, nome, email){
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}
