
/**
 * Variables
 */

const listaTareas = document.getElementById('lista-tareas');


/**
 * Event Listeners
 */

eventsListeners();

function eventsListeners() {
    // Botón agregar nueva tarea al enviar el formulario
    document.getElementById('formulario').addEventListener('submit', agregarTarea);

    // Borrar tarea
    listaTareas.addEventListener('click', borrarTarea);

    // Cargar contenido al cargar la página
    document.addEventListener('DOMContentLoaded', cargarLS());
}

/**
 * Funciones
 */

 // Añadir tarea
function agregarTarea(e) {
    // Cancelamos acción predeterminada
    e.preventDefault();
    // Leo tarea
    tarea = leerTarea();
    // Evaluamos si la tarea esta vacia
    if (comprobarTareaVacia(tarea)) {
        // Si esta vacia salgo de la función
        return;
    }
    // Creo elemento
    crearTareaDOM(tarea);
    // Limpiarmos textarea
    limpiarTextArea();
    //Agregramos al local Storage
    agregarLS(tarea);
}

// Leer tarea del textarea
function leerTarea() {
    // Leemos el valor del texarea
    const tarea = document.getElementById('tarea').value;
    return tarea;    
}

// Comprobamos si el text area esta vacio, devuelve true si esta vacio
function comprobarTareaVacia(tarea) {
    if (tarea.length == 0) {
        // Cambio el placeholder para avisar al usuario y devuelvo el focus al text area
        const textArea = document.getElementById('tarea');
        textArea.placeholder = 'La tarea no puede estar vacía';
        textArea.focus();
        return true;
    } else {
        return false;
    }
}

// Crea un nuevo elemento en el DOM con la nueva tarea en una lista (li)
function crearTareaDOM(tarea) {
    // Añado la tarea al DOM
    const li = document.createElement('li');
    li.innerText = tarea;
    listaTareas.appendChild(li);
    // Añado el boton para eliminar la tarea en el DOM
    crearBotonEliminar(li);
}

// Crea un boton para eliminar la tarea en el DOM
function crearBotonEliminar(elemento) {
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tarea';
    botonBorrar.innerText = 'X';
    elemento.appendChild(botonBorrar);
}

// Limpiar textarea y reseteao el placeholder
function limpiarTextArea(){
    const textArea = document.getElementById('tarea');
    textArea.value = '';
    textArea.placeholder = 'Escriba una nueva tarea...';
    textArea.focus();
}

// Borrar tarea
function borrarTarea(e) {
    // Cancelamos acción predeterminada
    e.preventDefault();

    // Uso delegation para usar los botones de borrar
    if (e.target.className === 'borrar-tarea') {
        // Confirmo si el usuario esta seguro de eliminar la tarea
        eliminar = confirmarMensaje('¿Quiere eliminar esta tarea?');
        if (eliminar) {
            e.target.parentElement.remove();
            borrarLS(e.target.parentElement.innerText);
            mensajeAlert('Tarea eliminada con éxito');
        } else {
            mensajeAlert('La tarea no ha sido eliminada');
        }
    }
}

// Mostrar mensaje por alert
function mensajeAlert(mensaje) {
    alert(mensaje);
}

// Confirmar un mensaje
function confirmarMensaje (mensaje){
    const confirmacion = confirm(mensaje);
    if (confirmacion == true) {
        return true;
    } else {
        return false;
    }
}

// Guardar tarea en el Local Storage
function agregarLS(tarea) {
    let tareas;    
    // Tareas es lo que hay en el local storage
    tareas = obtenerLS();
    // Como traigo un array uso el método push para añadir la nueva tarea
    tareas.push(tarea);
    // Guardarlo de nuevo en un array en el local storage
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Obtenemos lo que hay en el local storage
function obtenerLS() {
    let tareas;
    if (localStorage.getItem('tareas') === null) {
        // Si esta vacio tarea lo convierto en un array
        tareas = [];
    } else {
        // Si tiene contenido lo transformo en un JSOM
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }    
    return tareas;
}

// Cargamos lo que hay en el local storage al cargar la pagina
function cargarLS() {
    let tareas;
    // Obtengo el arreglo de lo que hay en el local stogra
    tareas = obtenerLS();
    // Creo los elementos necesarios en el DOM mediante un foreach
    tareas.forEach(function (tarea) {
        crearTareaDOM(tarea);
    })
}

// Eliminamos una tarea del local storage
function borrarLS(tarea) {
    let tareas;
    let tareaSinX;
    // Le quitamos la X a la tarea
    tareaSinX = tarea.substring(0, tarea.length - 1);
    // Obtenemos las tareas
    tareas = obtenerLS();

    // Buscamos la tarea para eliminarla
    tareas.forEach(function (tarea, index) {
        if (tareaSinX === tarea) {
            tareas.splice(index, 1);
        }
    })
    // Guardarlo de nuevo en un array en el local storage
    localStorage.setItem('tareas', JSON.stringify(tareas));
}