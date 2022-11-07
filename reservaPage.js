(function divsPasajeros() {
    var numPasajeros = JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    for (let i = 0; i < numPasajeros; i++) {
        creaDiv(i);
    }
    pintaAsientos()
    pintaPrecioTotal();
})();


//pintamos un div por persona
function creaDiv(i) {
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');
    document.getElementsByClassName('pasajeros')[0].appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.style.display = 'grid';
    div1.style.border = "solid"
    div1.style.gridTemplateColumns = '180px 400px';
    div1.style.gridTemplateRows = '230px';
    div2.style.backgroundColor = '	#bae0e2';
    div3.style.backgroundColor = '	#bae0e2';
    div3.style.boxShadow = '1px 1px 6px';
    div2.style.boxShadow = '1px 1px 6px';
    div2.style.padding = '15%';
    div3.style.padding = '6%';
    div1.style.margin = '0.6%';

    var pas = document.createElement('p');
    pas.appendChild(document.createTextNode(`PASAJERO ${i + 1}:`));
    pas.style.fontFamily = 'system-ui';
    pas.style.fontWeight = '500';
    pas.style.color = '#2e2e5c';
    pas.style.lineHeight = '1.0';
    div2.appendChild(pas);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('Los datos de los pasajeros deben coincidir con la documentación que presenten en el momento del vuelo.'));
    p.style.color = 'black'
    div2.appendChild(p);

    div3.style.display = 'flex';
    div3.style.flexDirection = 'column';
    div3.style.justifyContent = 'space-evenly';
    div3.style.alignItems = 'stretch';
    div3.setAttribute('id', `pasajero${i}`);

    var nombre = document.createElement('input');
    nombre.setAttribute('placeholder', 'Nombre');
    nombre.setAttribute('required', 'required');
    nombre.setAttribute('id','inputNombrePasajero-' + i)
    div3.appendChild(nombre);

    var apellidos = document.createElement('input');
    apellidos.setAttribute('required', 'required');
    apellidos.setAttribute('placeholder', 'Apellidos');
    apellidos.setAttribute('id','inputApellidoPasajero-' + i)
    div3.appendChild(apellidos);

    var dni = document.createElement('input');
    dni.setAttribute('required', 'required');
    dni.setAttribute('placeholder', 'DNI');
    dni.setAttribute('id','inputDniPasajero-' + i)
    div3.appendChild(dni);
    

    var label = document.createElement('label');
    var necEspeciales = document.createElement('input');
    necEspeciales.setAttribute('required', 'required');
    necEspeciales.setAttribute('type', 'checkbox');
    label.appendChild(necEspeciales);
    label.appendChild(document.createTextNode('Pasajero con necesidades especiales'));
    div3.appendChild(label);
    div3.setAttribute('class', 'pasajero');
    label.style.textAlign = "center"
}


function pintaPrecioTotal() {
    var vuelo = JSON.parse(localStorage.getItem('vueloSeleccionado'));
    var precioTotal = vuelo.precio * JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    document.getElementById('precioTotal').appendChild(document.createTextNode('TOTAL: ' + precioTotal + '€'));
}


//recogemos los datos y los añadimos.
function continuarApago() {
    let datosPasajeros = document.getElementsByClassName('pasajero');
    let pasajeros = [];
    i = 0;
    var nombre, apellidos, dni;//las asigna vacias y fuera de la función para poder usarlas dentro del while.
    console.log(nombre, apellidos, dni)

    do {
        nombre = datosPasajeros[i].getElementsByTagName('input')[0].value;
        apellidos = datosPasajeros[i].getElementsByTagName('input')[1].value;
        dni = datosPasajeros[i].getElementsByTagName('input')[2].value;
        

        pasajeros.push({
            nombre: nombre,
            apellidos: apellidos,
            dni: dni
        });
        i++;
    } while (nombre && apellidos && dni && i < datosPasajeros.length)

    var datosValidos = pasajeros.every(pasajero => {
        return datosPasajeroValidos(pasajero)
    });

    //Si los datos son correctos entoces guardaremos los datos en el local
    if (datosValidos) {
        let reserva = new Reserva();
        reserva = Object.assign(reserva, JSON.parse(localStorage.getItem('reservaActual')));
        reserva.setPasajeros(pasajeros);
        localStorage.setItem('reservaActual', JSON.stringify(reserva));
        window.location = 'pago.html';
        //Ponemos un "else if" por si alguno de los campos no están completos
    } else if (nombre == false || apellidos == false || dni == false) {
        alert("Compruebe que todos los campos están completos")
        //el "else" solo contemplará la opción de que todos los datos está completos,por el cual si falla será por que no está correcta la letra del DNI
    
    }else if (dni.length != 9 ){
        alert("Su Dni debe tener 9 caracteres")

    } else
        alert('Compruebe si la letra de su DNI es la correcta')
}


function datosPasajeroValidos(pasajero) {
    return pasajero.nombre && pasajero.apellidos && pasajero.dni && pasajero.dni.length === 9 && dniValido(pasajero.dni)
}

//////////////////////////////////////////////////////////////////////////////////////

function dniValido(dni) {

    //Cogemos la última letra del dni y le pasamos "toUpperCsse para convertirlo mayusculas"
    var letraDni = dni[dni.length - 1].toUpperCase()
    console.log(letraDni)

    var numero = compruebaNumeroDni(dni);
    console.log(numero)

    if (numero > "99999999") {

        return false
    }

    else {

        //resto será la posicion del array y a la vez la letra que le corresponde de su
        var resto = numero % 23;
        var arrayLetrasDni = "TRWAGMYFPDXBNJZSQVHLCKET"

        //Conversión de letra en una cadena string para que confirme que la letra es la correcta.
        var LetraCorrectaDni = arrayLetrasDni.charAt(resto);
        console.log(LetraCorrectaDni)

        if (letraDni == LetraCorrectaDni) {

            return true
        }
        else {
            
            return false
        }

    }
}

function atras() {
    window.location = 'home.html';
}



function compruebaNumeroDni(dni) {
    var num = ""
    for (let i = 0; i <= dni.length - 2; i++) {
        num = num + dni[i];

    }
    return num
}



/////////////////////////////////////////////////////////////////

//Creo un checkbox para simular los asientos.Faltaría ponerle lógica para que el usuario no seleccionara más billetes de los reservados.

function pintaAsientos(){
    for (let i = 0; i < 30 ; i++) {
        var inputAsiento = document.createElement('input');
    inputAsiento.setAttribute('type', 'checkbox');
    var divAsientos = document.getElementById("asientos")
    divAsientos.appendChild(inputAsiento);
    }
    
}