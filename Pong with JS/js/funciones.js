//Primera posición en eje X y eje Y
var ceroX = 383;
var ceroY = 11;
//Variable que define la velocidad mientras menos sea mayor será la velocidad
var velocidad = 5;
//Última posición en el eje X y el eje Y 
var paredX = 600 + ceroX;
var paredY = 400 + ceroY;
//Variable donde se guarda el puntaje de los jugadores
var puntosJugadorUno = 0;
var puntosJugadorDos = 0;

//objeto donde se guardará el puntaje final de los jugadores
var puntajes = {};

//Se recupera el elemento del HTML para ingresar el puntaje 
var jugadorUno = document.getElementById("puntosj1");
var jugadorDos = document.getElementById("puntosj2");

function obtenerX(id){
    //Accesedmos al objeto sea cual sea este
    var objeto = document.getElementById(id);
    //Accedemos a una propiedad del estilo
    var posicion = objeto.style.left;   
    var longitudObjeto = posicion.length;
    //SubString me sirve para indicar en la posición de caracteres que empieza en la posición de caracteres que termina 
    //Se pone longitud -2 debido a que longitudObjeto nos devuelve EJM:"320px" y con -2 eliminamos el px pudiendo manejar solo el número de la posición
    posicion = posicion.substring(0, longitudObjeto-2);
    //Se vuelve a transformar a la posicion en tipo número.
    posicion = parseInt(posicion);
    return posicion;
};

function obtenerY(id){
    var objeto = document.getElementById(id);
    var posicion = objeto.style.top;   
    var longitudObjeto = posicion.length;
    posicion = posicion.substring(0, longitudObjeto-2);
    posicion = parseInt(posicion);
    return posicion;
};

function colocarXY(id,x,y){
    var objeto = document.getElementById(id);
    objeto.style.left = x + "px";
    objeto.style.top = y + "px";
};

//Funciones para la pelota
// var y/xpdir = dirección de la pelota en x o y
 var xpdir = 1;
 var ypdir = 1;

 colocarXY("bola", 290+ceroX, 190+ceroY);

 function pelota(){
     var posicionX = obtenerX("bola");
     var posicionY = obtenerY("bola");
     posicionX += xpdir;
     posicionY += ypdir;
     //Condicionales para que la "bola" no salga del recuadro
     //Se resta 20 debido al ancho de los bordes
     if(posicionX<=ceroX){
         xpdir=1;
         //toca pared derecha punto para jugador Dos
         puntosJugadorDos++;
         jugadorDos.innerHTML = puntosJugadorDos;
     };
     if(posicionX>=(paredX)-20){
         xpdir=-1;
         //toca pared izquierda punto para jugador Uno
         puntosJugadorUno++;
         jugadorUno.innerHTML = puntosJugadorUno;
     };
     if(posicionY<=ceroY){
        ypdir=1;
    };
    if(posicionY>=(paredY)-20){
        ypdir=-1;
    };

    //Condicionales para que el juego termine cuando alguno de los dos jugadores haga 10 puntos
    puntajes.puntajeJugadorUno = puntosJugadorUno;
    puntajes.puntajeJugadorDos = puntosJugadorDos;
    if (puntosJugadorUno == 10){
        document.getElementById("fin").innerHTML= 'ganó jugador 1: '+puntajes.puntajeJugadorUno;
        $('#target').html('sending..');
        //var myJSON = JSON.stringify(puntajes);
        $.ajax({
        url: 'http://localhost:53994/api/values',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        $('#target').html(data.msg);
        },
        data: JSON.stringify(puntajes)
        });
    }
    else if (puntosJugadorDos ==10){
        document.getElementById("fin").innerHTML= 'ganó jugador 2: '+puntajes.puntajeJugadorDos;
        $('#target').html('sending..');
//var myJSON = JSON.stringify(puntajes);
$.ajax({
    url: 'http://localhost:53994/api/values',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
        $('#target').html(data.msg);
    },
    data: JSON.stringify(puntajes)
});
    }
    else {
        colocarXY("bola",posicionX,posicionY);
    };    
 }; 

//Raquetas
 var ydirUno = 0;
 var ydirDos = 0;
var xUno = 20 + ceroX;
var xDos = 560 + ceroX;
colocarXY("j1",xUno, (ceroY)+160);
colocarXY("j2",xDos, (ceroY)+160);

function mover(event){
    var c = event.keyCode;
    switch(c){
        //87 es el código para la tecla W: al ser presionada la raqueta uno subirá
        case 87:ydirUno = -1;
        break;
        //83 es el código de la tecla S: al ser presionada la raqueta bajará
        case 83:ydirUno = 1;
        break;
        //38 es el código de la tecla arriba y la raqueta del jugador dos subira
        case 38:ydirDos = -1;
        break;
        //40 es el codigo de la tecla abajo y la raqueta del jugador dos bajara
        case 40:ydirDos = 1;   
        break;
    }
};
function parar(event){
    var c = event.keyCode;
    //Cuando se deje de presionar las teclas la dirección de las raquetas queda en 0 para que dejen de moverse
    if(c== 87 || c==83){
        ydirUno = 0;
    };  
    if(c==38||c==40){
        ydirDos=0; 
    };
};
function raqueta(){
    var posicionUno = obtenerY("j1");
    var posicionDos = obtenerY("j2");
    posicionUno += ydirUno;
    if(posicionUno<=ceroY){
        colocarXY("j1",xUno,ceroY);
   };
   if(posicionUno>=(paredY)-80){
        colocarXY("j1",xUno,(paredY)-80);
   };
   if (posicionUno>= ceroY && posicionUno<= (paredY)-80){
        colocarXY("j1",xUno,posicionUno);
   }
   
   //Raqueta Dos
   posicionDos += ydirDos;
   if(posicionDos<=ceroY){
       colocarXY("j2",xDos,ceroY);
  };
  if(posicionDos>=(paredY)-80){
       colocarXY("j2",xDos,(paredY)-80);
  };
  if (posicionDos>= ceroY && posicionDos<= (paredY)-80){
       colocarXY("j2",xDos,posicionDos);
  }
};

//Choque Raquetas

function choque(){
    if (obtenerX("bola") == (obtenerX("j1")+20)){
        if(obtenerY("bola") >= obtenerY("j1") && obtenerY("bola")<=(obtenerY("j1")+80)){
            xpdir = 1;
        };
    };
    if (obtenerX("bola") == (obtenerX("j2")-20)){
        if(obtenerY("bola") >= obtenerY("j2") && obtenerY("bola")<=(obtenerY("j2")+80)){
            xpdir = -1;
        };
    };
};




