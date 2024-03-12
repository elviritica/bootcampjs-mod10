export interface Personaje {
    id: number;
    nombre: string;
    apodo: string;
    especialidad: string;
    habilidades: string[];
    amigo: string;
    imagen: string;       
};


export const __URL = 'http://localhost:3000/';
export const __PERSONAJES = `${__URL}personajes`;