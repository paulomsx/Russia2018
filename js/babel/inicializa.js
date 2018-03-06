"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Local = function () {
    function Local() {
        _classCallCheck(this, Local);

        var dados = localStorage.getItem("faltantes");
        if (dados == null) {
            var str = this.RepeteString('0', 648);
            localStorage.setItem("faltantes", str);
        }

        var repetidas = localStorage.getItem("repetidas");
        if (repetidas == null) {
            var str = this.RepeteString('0', 648);
            localStorage.setItem("repetidas", str);
        }
    }

    _createClass(Local, [{
        key: "Get",
        value: function Get() {
            return localStorage.getItem(tema == "a" ? "faltantes" : "repetidas");
        }
    }, {
        key: "Put",
        value: function Put(dados) {
            localStorage.setItem(tema == "a" ? "faltantes" : "repetidas", dados);
        }
    }, {
        key: "RepeteString",
        value: function RepeteString(caracter, quantidade) {
            var ret = '';
            while (quantidade-- > 0) {
                ret += caracter;
            }return ret;
        }
    }]);

    return Local;
}();

var local = new Local();

$(document).ready(function () {

    $("#fig-faltam").html(CarregaAlbum("faltantes"));

    $("#fig-repetidas").html(CarregaAlbum("repetidas"));

    /**********************************************************************/
    $("input[type='button']").click(function () {

        var classe = $(this).attr('class');
        var posicao = parseInt($(this).attr('value'));

        var valorClicado = "";
        var tipo = "";

        if (classe == "FD" || classe == "FR") valorClicado = "1";else valorClicado = "0";

        if (classe == "FDV" || classe == "FD") tipo = "faltantes";else tipo = "repetidas";

        var dados = localStorage.getItem(tipo);
        dados = substituiCharPosicao(dados, posicao, valorClicado);

        localStorage.setItem(tipo, dados);
    });
    /**********************************************************************/
});

function troca(o, tipoClique) {

    var classe = $(o).attr('class');

    if (classe == "FD" || classe == "FR") {

        if (tipoClique == "faltantes") o.className = 'FDV';else o.className = 'FRV';
    } else {
        if (tipoClique == "faltantes") o.className = 'FD';else o.className = 'FR';
    }
}

function CarregaAlbum(album) {
    var zero3 = new Padder(3);
    var conteudo = "";
    var tipoClique = "faltantes";

    if (album != "faltantes") {
        tipoClique = "repetidas";
    }

    var dados = localStorage.getItem(album);

    conteudo += '<div class="row">';

    for (i = 0; i < 600; i++) {

        if (dados.substring(i, i + 1) == "1") {
            //marcado
            if (album == "faltantes") {
                tipoClasse = "FD";
            } else {
                tipoClasse = "FR";
            }
        } else {
            //desmarcado
            if (album == "faltantes") {
                tipoClasse = "FDV";
            } else {
                tipoClasse = "FRV";
            }
        }

        var numero = zero3.pad(i);

        if (i == 20 || i == 10 || i == 1) {
            conteudo += "\n            <input type=\"button\" title=\"" + numero + "\" class=\"" + tipoClasse + "\" onclick='troca(this,\"" + tipoClique + "\");' value=\"" + numero + "\">\n            \n            <a href=\"\" class=\"badge1\" data-badge=\"3\"></a>\n            ";
        } else {
            conteudo += "\n            <input type=\"button\" title=\"" + numero + "\" class=\"" + tipoClasse + "\" onclick='troca(this,\"" + tipoClique + "\");' value=\"" + numero + "\">\n            ";
        }
    }

    conteudo += '</div>';

    return conteudo;
}

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

function substituiCharPosicao(s, pos, c) {
    return s.substring(0, pos) + c + s.substring(pos + 1);
}

/************************************************************************/

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    var oStart = new StartController(); //  INICIA CONTROLES 
}

function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
    exitFromApp();
}

function exitFromApp() {
    navigator.notification.confirm('Deseja sair do App ?', // message
    onConfirm, // callback to invoke with index of button pressed
    'Atenção', // title
    'Sim,Não' // buttonLabels
    );
}

function alertDismissed() {
    if (navigator.app) {
        navigator.app.exitApp();
    } else if (navigator.device) {
        navigator.device.exitApp();
    }
}

function onConfirm(buttonIndex) {
    if (buttonIndex == 1) {
        alertDismissed();
    }
}

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function DataAtual() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    //var data_atual = yyyy.toString()+pad(mm.toString(),2)+dd.toString();
    return yyyy.toString() + pad(mm.toString(), 2) + dd.toString();
}

function ShowLoading(show) {
    try {
        if (show) {
            cordova.plugin.pDialog.init({
                theme: 'HOLO_DARK',
                progressStyle: 'SPINNER',
                cancelable: true,
                title: 'Aguarde ...',
                message: 'Processando ...'
            });
        } else {
            cordova.plugin.pDialog.dismiss();
        }
    } catch (err) {}
}

function altera() {
    var codigo_produto = $("#item-selecionado").html().substring(0, 3);
    var quantidade = $("#alter-quantidade").val();
    _Carrinho.AlteraQuantidade(codigo_produto, quantidade);
}

$('.button-collapse').sideNav({
    menuWidth: 280,
    menuHeight: 10,
    closeOnClick: true,
    draggable: true,
    onOpen: function onOpen(el) {},
    onClose: function onClose(el) {}
});