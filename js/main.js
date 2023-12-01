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

function obtenerServiciosEnLS(){

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
            Toastify({
                text: "El servicio ya fue agregado al carrito",
                duration: 4000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "#fd4343db",
                  borderRadius: "5px",
                },
              }).showToast();
        }else if(existeRedes && servicio.tipo === 'redes') {
            Toastify({
                text: 'Ya existe un servicio del tipo redes en el carrito. Si desea cambiar el plan a uno con mayor o menor cantidad de publicaciones, elimine del carrito el plan no deseado y vuelva a agregar el que desea contratar',
                duration: 4000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "#fd4343db",
                  borderRadius: "5px",
                },
              }).showToast();
        }else if(servicio.tipo === 'contenido' && existeServicioContenidoCompleto){
            Toastify({
                text: 'Ya existe un servicio del tipo contenido en el carrito que contempla el servicio que ud desea agregar',
                duration: 4000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "#fd4343db",
                  borderRadius: "5px",
                },
              }).showToast();

        }else if(existeServicioContenidoBasico && servicio.nombre === 'Produccion de contenido C'){
            Toastify({
                text: 'Ya existe un servicio del tipo contenido en el carrito que contempla el servicio que ud desea agregar. Si desea cambiar de servicio, elimine del carrito el servicio que no desea contratar y seleccione uno nuevo',
                duration: 4000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "#fd4343db",
                  borderRadius: "5px",
                },
              }).showToast();

        }else{
            carrito.push(servicioAgregar);
            Toastify({
                text: `El servicio ${servicio.nombre} con un valor de ${servicio.precio}usd fue agregado al carrito`,
                duration: 4000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "#5ace5ed6",
                  borderRadius: "5px",
                },
              }).showToast();
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

async function obtenerServicios(){
    const response = await fetch('/servicios.json');
    const responseJson = await response.json();

    listaDeServicios.push(...responseJson);
}


// VARIABLES

const listaDeServicios = [];
let carrito = [];

// INICIO DEL CÓDIGO



obtenerServicios().then(() => {
    renderizarServicios(listaDeServicios);
    inicializarInput();
    inicializarSelect();
    obtenerServiciosEnLS();
});
