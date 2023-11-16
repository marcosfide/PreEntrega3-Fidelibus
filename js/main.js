// FUNCIONES


function ordenarPorPrecioCreciente(){
    const serviciosOrdenados = listaDeServicios.sort((servicioA,servicioB) => {
        if(servicioA.precio > servicioB.precio){
            return 1;
        }else if(servicioA.precio < servicioB.precio){
            return -1;
        }
        return 0;
    });
    renderizarServicios(serviciosOrdenados)
}

function ordenarPorPrecioDecreciente(){
    const serviciosOrdenados = listaDeServicios.sort((servicioA,servicioB) => {
        if(servicioA.precio < servicioB.precio){
            return 1;
        }else if(servicioA.precio > servicioB.precio){
            return -1;
        }
        return 0;
    });
    renderizarServicios(serviciosOrdenados)
}

function filtrarSoloContenido() {
    const serviciosContenido = listaDeServicios.filter((servicio) => {
        return servicio.tipo === 'contenido';
    });
    renderizarServicios(serviciosContenido);
}

function filtrarSoloRedes() {
    const serviciosRedes = listaDeServicios.filter((servicio) => {
        return servicio.tipo === 'redes';
    });
    renderizarServicios(serviciosRedes);
}

function inicializarSelect(){
    const select = document.getElementById("selectOrden");
    
    select.addEventListener("change", () =>{
        const value = select.value;

        switch(value){
            case 'todos':
                renderizarServicios(listaDeServicios);
                break;
            case 'precioCreciente':
                ordenarPorPrecioCreciente();
                break;
            case 'precioDecreciente':
                ordenarPorPrecioDecreciente();
                break;
            case 'serviciosContenido':
                filtrarSoloContenido();
                break;
            case 'serviciosRedes':
                filtrarSoloRedes();
                break;
        }
    })
}

function inicializarInput(){

    const input = document.getElementById("buscarServicio");

    input.addEventListener("keyup", () =>{

        //filtramos servicios por lo qe pyso el usuario en el input
        const value = input.value;

        const serviciosFiltrados = listaDeServicios.filter( (servicio) =>{
            return servicio.nombre.toUpperCase().includes(value.toUpperCase());
        });

        //Renderizo los servicios
        renderizarServicios(serviciosFiltrados);
    })
}

function eliminarServicio(servicio){

    // Busco el servicio a elminar por el nombre
    const indiceServicioAEliminar = carrito.findIndex((el) => {
        return servicio.nombre === el.nombre
    });

    // Compruebo si el indice a eliminar existe
    if(indiceServicioAEliminar !== -1){

        // Elimino el servicio del carrito
        carrito.splice(indiceServicioAEliminar,1);

        // Actualizo el localStorage
        localStorage.setItem("carrito",JSON.stringify(carrito));

        //Vuelvo a renderizar la tabla
        renderizarTablaCarrito(carrito);
    }
}

function obtenerProductosEnLS(){

    carrito = JSON.parse(localStorage.getItem('carrito'));

    if(carrito){
        renderizarTablaCarrito(carrito);
    }

}

function guardarServicioEnLS(servicio){

    const servicioAgregar = {
        nombre: servicio.nombre,
        tipo: servicio.tipo,
        precio: servicio.precio
    }

    if(carrito == null){   //si no hay servicios en el carrito

        carrito = [servicioAgregar];

    }else{

        const existeServicioEnCarrito = carrito.some(item => item.nombre === servicio.nombre);
        const existeRedes = carrito.some(servicio => servicio.tipo === 'redes');
        const existeServicioContenidoCompleto = carrito.some(servicio => servicio.nombre === 'Produccion de contenido C');
        const existeServicioContenidoBasico = carrito.some(servicio => servicio.nombre === 'Produccion de contenido A' || servicio.nombre === 'Produccion de contenido B');

        if(existeServicioEnCarrito){
            alert('El servicio ya fue agregado al carrito');
        }else if(existeRedes && servicio.tipo === 'redes') {
            alert('Ya existe un servicio del tipo redes en el carrito. Si desea cambiar el plan a uno con mayor o menor cantidad de publicaciones, elimine del carrito el plan no deseado y vuelva a agregar el que desea contratar');
        }else if(servicio.tipo === 'contenido' && existeServicioContenidoCompleto){
            alert('Ya existe un servicio del tipo contenido en el carrito que contempla el servicio que ud desea agregar');

        }else if(existeServicioContenidoBasico && servicio.nombre === 'Produccion de contenido C'){
            alert('Ya existe un servicio del tipo contenido en el carrito que contempla el servicio que ud desea agregar. Si desea cambiar de servicio, elimine del carrito el servicio que no desea contratar y seleccione uno nuevo');

        }else{
            carrito.push(servicioAgregar);
            alert(`El servicio ${servicio.nombre} con un valor de ${servicio.precio}usd fue agregado al carrito`);
        }

    }
    
    //actualizo el localStorage
    localStorage.setItem('carrito',JSON.stringify(carrito));

    renderizarTablaCarrito(carrito);
}

function renderizarTablaCarrito(serviciosCarrito){

    const tbody = document.querySelector("#carrito table tbody");
    tbody.innerHTML = "";

    for(const servicioCarrito of serviciosCarrito){

        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.innerText = `${servicioCarrito.nombre}`;

        const tdTipo = document.createElement("td");
        tdTipo.innerText = `${servicioCarrito.tipo}`;

        const tdPrecio = document.createElement("td");
        tdPrecio.innerText = `${servicioCarrito.precio}`;

        const tdEliminar = document.createElement("td");

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-danger";
        botonEliminar.innerText = "Eliminar";

        //Agregar evento al boton
        botonEliminar.addEventListener('click', () =>{
            eliminarServicio(servicioCarrito)
        })

        //Agregar elementos uno adentro del otro
        tdEliminar.append(botonEliminar);
        tr.append(tdNombre,tdTipo,tdPrecio,tdEliminar);

        tbody.append(tr);
    }
}

function renderizarServicios(servicios){

    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    for(const servicio of servicios){
        
        //CREO LOS ELEMENTOS
        const divPadre = document.createElement("div");
        divPadre.className = "col-12 col-sm-6";

        const divCard = document.createElement("div");
        divCard.className = "card m-2";

        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body";

        const h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerText = servicio.nombre;

        const p = document.createElement("p");
        p.className = "card-title";
        p.innerHTML = `${servicio.caracteristicas}.<br>-  <strong>Precio:</strong> ${servicio.precio}usd`;

        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerText = "Agregar al carrito";
        
        // Agregar al carrito
        button.addEventListener('click', () =>{
            
            guardarServicioEnLS(servicio);
        })

        //INSERTO LOS ELEMENOS uno adentro de otro
        divCardBody.append(h5,p,button);
        divCard.append(divCardBody);
        divPadre.append(divCard);
        contenedor.append(divPadre);

    }
}


// Objetos

class Servicio {
    constructor(nombre, tipo, caracteristicas, precio) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.caracteristicas = caracteristicas;
        this.precio = precio;
    }
}


// VARIABLES

let carrito = [];

// INICIO DEL CÓDIGO

const listaDeServicios = [
    new Servicio('Manejo de Redes: Plan A', 'redes','- Incluye 9 publicaciones mensuales en el feed (foto, video o reel) + historias 4 dias a la semana (maximo 3 por dia).<br>- Incluye diseño de publicaciones/historias.<br>- No incluye sesión de fotos. Se utilizará material fotográfico que dispone el cliente o se acordaran sesiones de producción de contenido', 55),
    new Servicio('Manejo de Redes: Plan B', 'redes','- Incluye 12 publicaciones mensuales en el feed (foto, video o reel) + historias 6 días a la semana (máximo 3 por día).<br>- Incluye diseño de publicaciones/historias.<br>- No incluye sesión de fotos. Se utilizará material fotográfico que dispone el cliente o se acordaran sesiones de producción de contenido' ,  65),
    new Servicio('Produccion de contenido A', 'contenido','- Sesión de fotos, se entregan entre 50 y 100 imagenes. Duración aproximada 3hs', 25),
    new Servicio('Produccion de contenido B', 'contenido', '- Sesión de reels, se entregan entre 8 y 10 videos editados', 30),
    new Servicio('Produccion de contenido C', 'contenido', '- En caso de querer adquirir ambos servicios(Sesion A y B, con sesión de fotos y reels) se aplica un 20% de descuento', 44),
];


renderizarServicios(listaDeServicios);
inicializarInput();
inicializarSelect();
obtenerProductosEnLS()


