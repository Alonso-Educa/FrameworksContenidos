export interface Juego {
    id: number;
    titulo: string;
    plataforma: string;
    anio: number;
    categoria: 'Principal' | 'Spin-off';
    descripcion: string;
    imagenUrl: string;
}