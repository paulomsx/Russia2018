class Local{
    
    constructor(){        

        if (localStorage.getItem(FALTANTES)==null)
        {
            localStorage.setItem(FALTANTES, this.RepeteString('0',648));
        }
        if (localStorage.getItem(REPETIDAS)==null)
        {
            localStorage.setItem(REPETIDAS, this.RepeteString('0',648));
        }
    }

    Get(album){
        return(localStorage.getItem(album));
    }

    Put(album, dados){
        localStorage.setItem(album, dados);
    }
    
    RepeteString(caracter, quantidade){
        let ret = ''; 
        while (quantidade-- > 0) ret += caracter; 
        return ret; 
    }
}
