// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

const listaCursos = document.querySelector('#lista-cursos');

cargarEventListeners();
function cargarEventListeners () {
    // cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] //reseteamos el carrito
        limpiarHTML(); // eliminamos todo el html
    })
}




// --Funciones--
function agregarCurso(e) {
    e.preventDefault(); // prevenimos la accion por default, en este caso seria al no tener definido un href en el index
    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}

// Elimina un curso del carrito

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo articulosCarrito por el id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

        carritoHTML(); // Iterar sobre el carrito y mostrar su html 
    }
}


// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCursos (curso) {
    console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso; // retorna el objeto actualizado
            } else{
                return curso; // retorna los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos]
    } else {
        // agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    
    console.log(articulosCarrito);

    carritoHTML();
}

// muestra el carrito de compras en el html
function carritoHTML() {

    // limpiar el html
    limpiarHTML()   



    // Recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const { id, imagen, titulo, precio, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <t>
                <a href="#" class="borrar-curso" data-id="${id}"> x </a>
            </t>
        `;

        // agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbdoy
function limpiarHTML () {
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}