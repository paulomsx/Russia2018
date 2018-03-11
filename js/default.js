const FALTANTES     = "faltantes";
const REPETIDAS     = "repetidas";
const REPETIDAS_ON  = "REPETIDAS_ON";
const FALTANTES_ON  = "FALTANTES_ON";
const FALTANTES_OFF = "FALTANTES_OFF";
const REPEDITAS_OFF = "REPEDITAS_OFF";

var local = new Local(); 
var copa  = new Album(); 
var usuario = new Usuario();


$(document).ready(function(){
    copa.Inicia();
    mobile();

    $("#usuario").html(usuario.nome);
    $("#email").html(usuario.email);
}); 