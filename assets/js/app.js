
/**
 * Variables
 */

const listaTareas = document.getElementById('lista-tareas');


/**
 * Event Listeners
 */

eventsListeners();

function eventsListeners() {
    // Botón agregar nueva tarea.
    document.getElementById('formulario').addEventListener('submit', agregarTarea);
}

/**
 * Funciones
 */

// Leer tarea del textarea
function leerTarea() {
    // Leemos el valor del texarea
    const tarea = document.getElementById('tarea').value;
    return tarea;    
}

// Crea un nuevo elemento en el DOM con la nueva tarea
function crearTareaDOM(tarea) {
    // Añado la tarea
    const li = document.createElement('li');
    li.innerText = tarea;
    listaTareas.appendChild(li);
    // Añado el boton para eliminar la tarea
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tarea';
    botonBorrar.innerText = 'X';
    li.appendChild(botonBorrar);
}

// Añadir tarea al DOM
function agregarTarea(e) {
    e.preventDefault();
    // Leo tarea
    tarea = leerTarea();
    // Creo elemento
    crearTareaDOM(tarea);
}