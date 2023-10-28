// FUNCIONES

function saludar() {
    alert('Hola! Bienvenido al sector servicios. Aquí podrás seleccionar los servicios que deseas contratar');
}

function existeServicioEnCarrito(nombreServicio) {
    return carrito.some(item => item.nombre === nombreServicio);
}

const agregarServiciosRedes = function() {
    var servicioRedes;
    while (servicioRedes !== 'C') {
        servicioRedes = prompt(`Ingrese A si desea contratar el ${listaDeServicios[0].nombre} por $${listaDeServicios[0].precio},\nIngrese B si desea contratar el ${listaDeServicios[1].nombre} por $${listaDeServicios[1].precio},\nIngrese C si desea salir u obtener el total a pagar`).toUpperCase();
        switch (servicioRedes) {
            case "A":
                if (!existeServicioEnCarrito(listaDeServicios[0].nombre)) {
                    alert(`Has seleccionado el ${listaDeServicios[0].nombre} por un valor de $${listaDeServicios[0].precio} y se ha añadido a tu carrito`);
                    carrito.push(listaDeServicios[0]);
                } else {
                    alert(`El servicio ${listaDeServicios[0].nombre} ya está en el carrito.`);
                }
                break;
            case "B":
                if (!existeServicioEnCarrito(listaDeServicios[1].nombre)) {
                    alert(`Has seleccionado el ${listaDeServicios[1].nombre} por un valor de $${listaDeServicios[1].precio} y se ha añadido a tu carrito`);
                    carrito.push(listaDeServicios[1]);
                } else {
                    alert(`El servicio ${listaDeServicios[1].nombre} ya está en el carrito.`);
                }
                break;
            case "C":
                break;
            default:
                alert('OPCIÓN INCORRECTA');
        }
    }
}

const agregarServiciosSesion = function() {
    var servicioSesion;
    while (servicioSesion !== 'D') {
        servicioSesion = prompt(`Ingrese A si desea contratar la ${listaDeServicios[2].nombre} por $${listaDeServicios[2].precio},\nIngrese B si desea contratar la ${listaDeServicios[3].nombre} por $${listaDeServicios[3].precio},\nIngrese C si desea contratar la ${listaDeServicios[4].nombre} por $${listaDeServicios[4].precio},\nIngrese D si desea salir u obtener el total a pagar`).toUpperCase();
        switch (servicioSesion) {
            case "A":
                if (!existeServicioEnCarrito(listaDeServicios[2].nombre)) {
                    alert(`Has seleccionado la ${listaDeServicios[2].nombre} por un valor de $${listaDeServicios[2].precio} y se ha añadido a tu carrito`);
                    carrito.push(listaDeServicios[2]);
                } else {
                    alert(`El servicio ${listaDeServicios[2].nombre} ya está en el carrito.`);
                }
                break;
            case "B":
                if (!existeServicioEnCarrito(listaDeServicios[3].nombre)) {
                    alert(`Has seleccionado la ${listaDeServicios[3].nombre} por un valor de $${listaDeServicios[3].precio} y se ha añadido a tu carrito`);
                    carrito.push(listaDeServicios[3]);
                } else {
                    alert(`El servicio ${listaDeServicios[3].nombre} ya está en el carrito.`);
                }
                break;
            case "C":
                if (!existeServicioEnCarrito(listaDeServicios[4].nombre)) {
                    alert(`Has seleccionado la ${listaDeServicios[4].nombre} por un valor de $${listaDeServicios[4].precio} y se ha añadido a tu carrito`);
                    carrito.push(listaDeServicios[4]);
                } else {
                    alert(`El servicio ${listaDeServicios[4].nombre} ya está en el carrito.`);
                }
                break;
            case "D":
                break;
            default:
                alert('OPCIÓN INCORRECTA');
        }
    }
}

function seleccionarServicios() {
    var opcion;
    while (opcion !== '3') {
        opcion = prompt('Ingrese 1 si desea adquirir un servicio de manejo de redes,\nIngrese 2 si desea adquirir un servicio sesión de contenido,\nIngrese 3 si desea salir u obtener el total a pagar');
        switch (opcion) {
            case "1":
                agregarServiciosRedes();
                break;

            case "2":
                agregarServiciosSesion();
                break;

            case "3":
                alert('Has finalizado tu operación');
                break;

            default:
                alert('OPCIÓN INCORRECTA');
                break;
        }
    }
}

function informarTotal(servicios) {
    let total = servicios.reduce((accumulator, item) => accumulator + item.precio, 0);
    if (total > 0) {
        let serviciosSeleccionados = servicios.map(item => `\n- ${item.nombre} - $${item.precio}`).join(', ');
        alert(`Servicios seleccionados en el carrito: ${serviciosSeleccionados}\nEl total a pagar es de $${total}`);
    } else {
        alert('No se seleccionaron servicios.');
    }
}


// Objetos

class Servicio {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const listaDeServicios = [
    new Servicio('Plan A (Redes)', 55),
    new Servicio('Plan B (Redes)', 65),
    new Servicio('Sesión A', 25),
    new Servicio('Sesión B', 30),
    new Servicio('Sesión C', 44),
];

// VARIABLES

const carrito = [];

// INICIO DEL CÓDIGO

saludar();
seleccionarServicios();
informarTotal(carrito);
