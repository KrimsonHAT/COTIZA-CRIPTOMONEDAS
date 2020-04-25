// Intanciamos las clases
const cotizadorAPI = new API('dab19ac4e32ec88882d9dcadc9fa693d29808db3b642c3316228051dca3f929a');
const ui = new Interface();



// leer el formulario

const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const moneda = document.querySelector('#moneda');
    const monedaSeleccionada = moneda.options[moneda.selectedIndex].value;
   
    const criptomoneda  =document.querySelector('#criptomoneda');
    const criptomonedaSeleccionada = criptomoneda.options[criptomoneda.selectedIndex].value;
    

    if(monedaSeleccionada == '' && criptomonedaSeleccionada ==''){
        
        //    arrojar una alerta de error
    ui.mostrarMensaje("Ambos campos son Obligatorios","alert bg-danger text-center");
  
    }else{
      // todo bien consultar la api
      cotizadorAPI.obtnerValores(monedaSeleccionada,criptomonedaSeleccionada)
      .then((data)=>{
        ui.mostrarResultado(data.resultado.RAW,monedaSeleccionada,criptomonedaSeleccionada)
      })
    }
});