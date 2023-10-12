// FUNCIONES

function saludar(){
    alert('Hola! Bienvenido al sector servicios. Aquí podrás seleccionar los servicios que deseas contratar');
}

const totalServiciosRedes = function() {
    var servicioRedes = prompt(' Ingrese A si desea contratar el Plan A por 55usd,\n Ingrese B si desea contratar el Plan B por 65usd,\n Ingrese C si desea salir u obtener el total a pagar');
    if (servicioRedes === 'A') {
        alert('Has seleccionado el Plan A por un valor de 55usd y se ha añadido a tu carrito');
        return 55;
    } else if (servicioRedes === 'B') {
        alert('Has seleccionado el Plan B por un valor de 65usd y se ha añadido a tu carrito');
        return 65;
    } else {
        return 0;
    }
}

const totalServiciosSesion = function() {
    var servicioSesion = prompt(' Ingrese A si desea contratar la Sesión A por un valor de 25usd,\n Ingrese B si desea contratar la Sesión B por un valor de 30usd,\n Ingrese C si desea contratar la Sesión C por un valor de 44usd,\n Ingrese D si desea salir u obtener el total a pagar');
    if (servicioSesion === 'A') {
        alert('Has seleccionado la Sesión A por un valor de 25usd y se ha añadido a tu carrito');
        return 25;
    } else if (servicioSesion === 'B') {
        alert('Has seleccionado la Sesión B por un valor de 30usd y se ha añadido a tu carrito');
        return 30;
    } else if (servicioSesion === 'C') {
        alert('Has seleccionado la Sesión C por un valor de 44usd y se ha añadido a tu carrito');
        return 44;
    } else {
        return 0;
    }
}

function seleccionarServicios(totalServiciosRedes,totalServiciosSesion) {
    while (true) {
        var opcion = prompt('Ingrese 1 si desea adquirir un servicio de manejo de redes,\nIngrese 2 si desea adquirir un servicio sesión de contenido,\nIngrese 3 si desea salir u obtener el total a pagar');
    
        if (opcion === '1') {
            total += totalServiciosRedes();
        } else if (opcion === '2') {
            total += totalServiciosSesion();
        } else if (opcion === '3') {
            break;
        }
    }
}

function informarTotal(valor) {
    if (valor > 0) {
        alert('Total a pagar: $' + total);
    } else {
        alert('No se seleccionaron servicios.');
    }
}

// VARIABLES

var total = 0;

// INICIO DEL CODIGO

saludar();


seleccionarServicios(totalServiciosRedes,totalServiciosSesion);


informarTotal(total);
