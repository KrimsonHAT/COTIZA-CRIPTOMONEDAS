class Interface {

    constructor(){
        this.init();
    }
    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizadorAPI.obtenerMonedasApi()
            .then(monedas=>{

                // crear un select de opciones
              const select  = document.querySelector("#criptomoneda");

                // iterar por los resultados de la api
                for(const [key,value] of Object.entries(monedas.monedas.Data)){
                    //    Añadir el symbol y el nombre como opciones

                    const opcion =document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
            }
            
            
        })
    }


    mostrarMensaje(mensaje,clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje))

        // seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        // mostarr contenidos
        setTimeout(function(){
            document.querySelector('.mensajes div').remove();
        },3000);
       
 
    }


    mostrarResultado(resultado,moneda,cripto){

        // En caso de un resultado amnterior ocultarlo
        const resultadoAnterior = document.querySelector('#resultado  div');

        if(resultadoAnterior){
            resultadoAnterior.remove();
        }




        const datosMoneda = resultado[cripto][moneda];

        // recortar difgitos del precio
        let precio = datosMoneda.PRICE.toFixed(4);
        let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(4);
        let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');

        // consultar el template
        let templateHtml = `
            <div class="card bg-warning">
                    <div class="card-body text-light">
                        <h2 class="card-title">Resultado:</h2>
                        <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda $
                         ${datosMoneda.TOSYMBOL} ES DE $ ${precio} </p>
                         <p>Variación último día: % ${porcentaje}</p>
                         <p>Última Actualización:  ${actualizado}</p>

                       
                    </div>

            </div>
        
        `;
        this.mostarSpinner();
        setTimeout(()=>{
            const spinnerno = document.querySelector('.contenido-spinner');
            spinnerno.style.display = 'none';
             // insertar el resultado
        document.querySelector('#resultado').innerHTML = templateHtml;
        },3000)


       
    }

    // mostrar el spinner de carga al enviar la cotización

    mostarSpinner(){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = "block";
    }



}