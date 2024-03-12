import { obtenerPersonajes, filtraPersonajes } from "./listado-personajes.api";
import { Personaje, __URL } from "./listado-personajes.model";

const crearElementoImagen = (
  imagen: string,
  nombre: string
): HTMLImageElement => {
  const img = document.createElement("img");
  img.src = `${__URL}${imagen}`;
  img.alt = nombre;
  return img;
};

const crearElementoParrafo = (valor: string, texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = `<strong>${valor}:</strong> ${texto}`;
  return parrafo;
};

const crearContenedorPersonaje = (personaje: Personaje) : HTMLDivElement => {
    const elementoPersonaje = document.createElement('div');
    elementoPersonaje.classList.add('personaje-contenedor');

    const imagen = crearElementoImagen(personaje.imagen, personaje.nombre);
    elementoPersonaje.appendChild(imagen);

    const contenedorCaracteristicas = document.createElement('div');
    contenedorCaracteristicas.classList.add('personaje-caracteristicas');

    const nombre = crearElementoParrafo("Nombre", personaje.nombre);
    contenedorCaracteristicas.appendChild(nombre);

    const especialidad = crearElementoParrafo("Especialidad", personaje.especialidad);
    contenedorCaracteristicas.appendChild(especialidad);

    const habilidades = crearElementoParrafo("Habilidades", personaje.habilidades.join(', '));
    contenedorCaracteristicas.appendChild(habilidades);

    elementoPersonaje.appendChild(contenedorCaracteristicas);

    return elementoPersonaje;
};

const pintarPersonajes = async () => {
    const personajes = await obtenerPersonajes();
    const listado = document.getElementById('listado-personajes');

    if (listado && listado instanceof HTMLDivElement) {
        personajes.forEach(personaje => {
            const elementoPersonaje = crearContenedorPersonaje(personaje);
            listado.appendChild(elementoPersonaje);
        });
    } else {
        throw new Error('No se ha encontrado el contenedor listado-personajes');
    }
};

const pintarPersonajesFiltrados = async (personajesFiltrados: Personaje[]) => {
    const listado = document.getElementById('listado-personajes');

    if (listado && listado instanceof HTMLDivElement) {
        // Limpia el contenedor antes de pintar los personajes
        listado.innerHTML = '';

        personajesFiltrados.forEach(personaje => {
            const elementoPersonaje = crearContenedorPersonaje(personaje);
            listado.appendChild(elementoPersonaje);
        });
    } else {
        throw new Error('No se ha encontrado el contenedor listado-personajes');
    }
};

const filtrarPersonajes = async () => {
    try {
       const input = document.getElementById("input");
       if (input && input instanceof HTMLInputElement) {
            const valorActual = input.value;
            const response = await filtraPersonajes(valorActual);
            pintarPersonajesFiltrados(response);
       }

    } catch (error) {
        throw new Error('Error al filtrar los personajes');
    }
};
const botonFiltrar = document.querySelector('#boton-filtrar');

if (botonFiltrar && botonFiltrar instanceof HTMLButtonElement) {
    botonFiltrar.addEventListener('click', filtrarPersonajes);   
}

document.addEventListener('DOMContentLoaded', pintarPersonajes);