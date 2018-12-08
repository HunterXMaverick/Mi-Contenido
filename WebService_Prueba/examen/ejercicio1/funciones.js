// Creo una variable que contiene el encabezado que será enviado el webservice
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://localhost:44307/api/eus",
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
    }
}
//Se captura la respuesta de la petición y se dibuja una tablaTotal
$.ajax(settings).done(function (response) {
    var DatosJson = JSON.parse(JSON.stringify(response));
    $("#tablaTotal").append('<tr><td>Id</td>'+
    '<td></td>' + 
    '<td></td>');
    // Se recorre al array para dibujarlo en una tablaTotal
    for (i = 0; i < DatosJson.length; i++){
 $("#tablaTotal").append('<tr>' + 
    '<td align="center" style="dislay: none;">' + DatosJson[i].id + '</td>'+
    '<td align="center" style="dislay: none;">' + DatosJson[i].nombre+ '</td>'+
    '<td align="center" style="dislay: none;">' + DatosJson[i].resultado+ '</td>');
    }
});