import { Departamento } from './Departamento';

export interface Empleado {
	_id?: string;
	nombre: string;
	sueldo?: number;
	// puede venir como id (string) o como objeto poblado desde el backend
	departamento?: string | Departamento;
	createdAt?: string;
	updatedAt?: string;
}