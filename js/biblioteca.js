function mobile()
{
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
  exitFromApp();
}

function exitFromApp()
{ 
  navigator.notification.confirm(
      'Deseja sair do App ?',  	// message
      onConfirm,              	// callback to invoke with index of button pressed
      'Atenção',            	// title
      'Sim,Não'          		// buttonLabels
  );
}

function alertDismissed() {
  if(navigator.app){
      navigator.app.exitApp();
  }else if(navigator.device){
          navigator.device.exitApp();
  }
}

function onConfirm(buttonIndex) {
  if (buttonIndex==1){
      alertDismissed();
  }
}

function pad(str, max) {
str = str.toString();
return str.length < max ? pad("0" + str, max) : str;
}

function DataAtual(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  return yyyy.toString()+pad(mm.toString(),2)+dd.toString();
}

function Loading(){
  cordova.plugin.pDialog.init({
      theme : 'HOLO_DARK',
      progressStyle : 'SPINNER',
      cancelable : true,
      title : 'Aguarde ...',
      message : 'Processando ...'
  });
}

function StopLoading(){
  cordova.plugin.pDialog.dismiss(); 
}


$('.button-collapse').sideNav({
    menuWidth: 280, 
    menuHeight:  10, 
    closeOnClick: true,
    draggable: true, 
    onOpen: function(el) { }, 
    onClose: function(el) { },
});

function Padder(len, pad) {
  
    if (len === undefined) {
        len = 1;
    } else if (pad === undefined) {
        pad = '0';
    }

    var pads = '';
    while (pads.length < len) {
        pads += pad;
    }

    this.pad = function (what) {
        var s = what.toString();
        return pads.substring(0, pads.length - s.length) + s;
    };
}

function substituiCharPosicao(s,  pos, c) {
    return s.substring(0,pos) + c + s.substring(pos+1);
}
  