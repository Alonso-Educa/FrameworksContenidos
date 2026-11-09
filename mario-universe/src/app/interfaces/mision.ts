// Coincide exactamente con lo que devuelve https://jsonplaceholder.typicode.com/todos
// Regla: NUNCA trabajar con any al consumir un backend.
export interface Mision {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}