// MODELO DE DATOS (la "M" de MVC).
// Una interface es solo un molde para que TypeScript compruebe tipos.
// No genera JavaScript: desaparece al compilar.

// Unión de literales: solo se admiten estos dos textos exactos.
export type Categoria = 'Principal' | 'Spin-off';

export interface Juego {
  id: number;
  titulo: string;
  plataforma: string;
  anio: number;
  categoria: Categoria;
  descripcion: string;
  imagenUrl: string;
  genero?: string;   // El "?" indica que el campo es opcional
}