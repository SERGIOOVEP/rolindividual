
//Recogemos datos y los añadimos a la reserva
function confirmarPago() {
    var nombre = document.getElementById('cardholder').value; //datos del input nombre
    var numTarjeta = document.getElementById('cardnumber').value;//datos del input numero de tarjeta
    var fechaEx = document.getElementById('date').value;//datos del input fecha
    var cvv = document.getElementById('cvv').value;//datos del input cvv
    const regExp = new RegExp("[^0-9]")
    var tarjetaNumero = regExp.test(numTarjeta);
    var cvvNumero = regExp.test(cvv);

    if (nombre == '' || numTarjeta == '' || fechaEx == '' || cvv == '') {
        alert("Todos los campos deben estar completos")
    } else if (tarjetaNumero == true) {
        alert("El numero de la tarjeta sólo puede contener dígitos")
    } else if (numTarjeta.length < 13) {
        alert("El numero de la tarjeta debe tener un mínimo de 13 dígitos")
    } else if (fechaEx.length != 4) {
        alert("Los datos de fecha de expedición son incorrectos")
    }else if (cvvNumero == true) {
        alert("El campo CVV sólo puede contener 3 dígitos")

    } else {
        var vuelo = JSON.parse(localStorage.getItem('vueloSeleccionado'));
        var usuario = JSON.parse(localStorage.getItem('sesion')).usuario;
        var pasajeros = JSON.parse(localStorage.getItem('reservaActual')).pasajeros.length;
        var vueloComprado = {
            vueloId: vuelo.id,
            asientosComprados: pasajeros
        }
        usuario.vComprados.push(vueloComprado)
        console.log(usuario)
        //localStorage.setItem('sesion')
        // Buscar en el vuelo (usuariosReservas) el usuario actual
        // SI se encuentra se le suma a totalReservas el numero de pasajeros
        // NO se añade el pasajero nuevo con totalReservas = pasajeros

        vuelo.usuariosReserva.push({
            dni: usuario.dni,
            totalReservas: pasajeros
        });

        // Buscar el vuelo en el locaStore por el id
        // Sobreescribor el objeto del localstore con el vuelo de aquí
        // guardar en el local

        debugger;

        var reserva = new Reserva();
        var reservaJson = JSON.parse(localStorage.getItem('reservaActual'));
        reserva = Object.assign(reserva, reservaJson);
        reserva.setMetodoPago({
            'nombre': nombre,
            'numeroTarjeta': numTarjeta,
            'fechaExpedicion': fechaEx,
            'cvv': cvv
        });
        localStorage.setItem('reservaActual', JSON.stringify(reserva));
        debugger;
        window.location = 'resumen.html';
    }
}

function pintaPrecioTotal() {
    var vuelo = JSON.parse(localStorage.getItem('vueloSeleccionado'));
    var precioTotal = vuelo.precio * JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    document.getElementById('precioTotal').appendChild(document.createTextNode('TOTAL: ' + precioTotal + '€'));
};


