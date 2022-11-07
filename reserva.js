class Reserva {
    constructor(vuelo) {
        this.vuelo = vuelo; //objeto de tipo Vuelo
        this.pasajeros; //Array de JSONs con los datos de los pasajeros
        this.metodoPago; //JSON con los datos de pago
    }

    setPasajeros(pasajeros) {
        this.pasajeros = pasajeros;
    }

    setMetodoPago(metodoPago) {
        this.metodoPago = metodoPago;
    }
}

function realizaReserva(vuelo) {
    var reserva = new Reserva(vuelo);
    localStorage.setItem('reservaActual', JSON.stringify(reserva));
}


///////////////////////////////////////////////////////////////////////////////////////////


//recogemos nodos.
//nos traemos el objeto sesion del local.
//a los nodos les damos el valor que ha introducido el usuario y está guardado en el local.


function autoRellenar() {
    var nombreTarjeta1 = document.getElementById("inputNombrePasajero-0");
    var apellidoTarjeta1 = document.getElementById("inputApellidoPasajero-0");
    var dniTarjeta1 = document.getElementById("inputDniPasajero-0");

    var sesion = JSON.parse(localStorage.getItem("sesion"));
    nombreTarjeta1.value = sesion.usuario.nom;
    apellidoTarjeta1.value = sesion.usuario.ape;
    dniTarjeta1.value = sesion.usuario.dni
}


//Sólo se me ocurre usar setTimeout para que la página no cargue antes de que se rellenen los datos de la tajeta.
setTimeout( autoRellenar, 100);


