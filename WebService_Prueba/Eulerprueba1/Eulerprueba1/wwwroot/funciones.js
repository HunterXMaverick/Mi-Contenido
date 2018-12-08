function enviar() {
    //Creo variables donde almaceno el valor de los datos ingresados
    var i_nombre = document.getElementById("inputNombre").value;
    var i_numero1 = document.getElementById("inputNumero1").value;
    var i_numero2 = document.getElementById("inputNumero2").value;




    //Creo un objeto que almacena todas mis variables
    var data = {
        nombre: i_nombre,
        par: i_numero1,
        impar: i_numero2,
    }

    //Convierto mi objeto en tipo JSON para ser enviado al webservice
    var formulario = JSON.stringify(data);
    //Creo una variable con el encabezado de envio para el webservice

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/eus",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        "data": formulario
    }
    //Recupero la respuesta correcta del servidor
    $.ajax(settings).done(function (response) {
        alert('Registro Exitoso ');
    });
}


function mostrarTabla() {
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

    //Se captura la respuesta de la petición y se dibuja una tabla
    $.ajax(settings).done(function (response) {
        var DatosJson = JSON.parse(JSON.stringify(response));
        $("#tabla").append('<tr><td>Id</td>' +
            '<td>Nombre</td>' +
            '<td>Numero1</td>' +
            '<td>Numero2</td>' +
            '<td>Resultado</td>');

        // Se recorre al array para dibujarlo en una tabla
        for (i = 0; i < DatosJson.length; i++) {
            $("#tabla").append('<tr>' +
                '<td align="center" style="dislay: none;">' + DatosJson[i].id + '</td>' +
                '<td align="center" style="dislay: none;">' + DatosJson[i].nombre + '</td>' +
                '<td align="center" style="dislay: none;">' + DatosJson[i].par + '</td>' +
                '<td align="center" style="dislay: none;">' + DatosJson[i].impar + '</td>' +
                '<td align="center" style="dislay: none;">' + DatosJson[i].resultado + '</td>');
        }

    });
}
