function main(){
    pelota();
    raqueta();
    choque();
};
function iniciar(event){
    var c = event.keyCode;
    if(c==13){         
        setInterval("main();", velocidad);
    };
};
//generar JSON para webService
