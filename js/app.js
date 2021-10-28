// constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function() {
    /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = eurpeo 1.35
    */ 
    let cantidad;
    const base = 2000;

    console.log(this.marca);
    switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;  
        case '2':
            cantidad = base * 1.05;
            break;  
        case '3':
            cantidad = base * 1.35;
            break;  
        default:
            break;
    }

    // leer el anio
    const diferencia = new Date().getFullYear() - this.year;
    // cada anio que la difgerencia es mayor el costo va a reducirse un 3% el valor del seguro
    cantidad -= ((diferencia *3)*cantidad)/100;

    /*
        si el seguro es basico se multiploca por un 30% mas
        si el seguro es completo se multiplica por un 50% ams
    */

        if(this.tipo === 'basico') {
            cantidad *= 1.3;
        } else {
            cantidad *= 1.5;
        }
        return cantidad;
}

function UI() {

}

// llena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i=max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}


// muestra alertas en pantalla
UI.prototype.mostrarMensaje = function(mensaje, tipo){
    const div = document.createElement('div');
    if(tipo=== 'error') {
        div.classList.add('mensaje','error');
    }else {
        div.classList.add('mensaje','Correcto');
    }
    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    // insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) => {
    
    const { marca, year, tipo} = seguro;
    
    let textoMarca;

    switch(marca){
        case '1': 
        textoMarca = 'Americano';
        break;
        case '2': 
        textoMarca = 'Asiatico';
        break;
        case '3': 
        textoMarca = 'Europeo';
        break;
        default:
            break;
    }

    // crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header"> Tu Resumen</p>
        <p class="font-bold">Marca:<span class="font-normal"> ${textoMarca} </span></p>
        <p class="font-bold">Año:<span class="font-normal"> ${year} </span></p>
        <p class="font-bold">Tipo:<span class="font-normal capitalize"> ${tipo} </span></p>
        <p class="font-bold">Total:<span class="font-normal">$ ${total} </span></p>
       
    `;

    const resultadoDiv = document.querySelector('#resultado');
    

    // mostrar el Spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none'; //se borra el spinner y se muestra el resultado
        resultadoDiv.appendChild(div);
    }, 3000);

}


// instanciar UI

const ui = new UI();


document.addEventListener('DOMContentLoaded',()=> {
    ui.llenarOpciones();//llena el select con los anios
})


eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    // leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    // leer anio seleccionado
    const year = document.querySelector('#year').value;
    // leertipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca === '' || year==='' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
       
    ui.mostrarMensaje('Cotizando...', 'error');
    // ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados !== null) {
        resultados.remove();
    }
    // instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    // utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, seguro);


}

