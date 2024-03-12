import Axios from 'axios';
import {Personaje, __PERSONAJES} from './listado-personajes.model';

export const obtenerPersonajes = async () : Promise<Personaje[]> => {
    try {
        const {data} = await Axios.get(__PERSONAJES);
        return data;
    } catch (error) {
        throw new Error('Error al obtener los personajes');
    }
};

export const filtraPersonajes = async (valor: string) : Promise<Personaje[]> => {
    try {
        const {data} = await Axios.get(`${__PERSONAJES}?nombre_like=${valor}`);
        return data;
    } catch (error) {
        throw new Error('Error al filtrar los personajes');
    }
};