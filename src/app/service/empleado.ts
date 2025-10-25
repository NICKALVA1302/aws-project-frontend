import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/Empleado';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private readonly URL_API = `${environment.apiBaseUrl}/api/empleados`;

  empleados: Empleado[] = [];

  // selectedEmpleado usado por el formulario; departamento puede ser id o objeto
  selectedEmpleado: Empleado = {
    nombre: '',
    departamento: '',
    sueldo: 0,
  };

  constructor(private http: HttpClient) {}

  getEmpleados() {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  createEmpleado(empleado: Empleado) {
    // Si departamento viene como objeto, extraer su _id
    const body = { ...empleado } as any;
    if (body.departamento && typeof body.departamento !== 'string') {
      body.departamento = (body.departamento as any)._id;
    }
    return this.http.post(this.URL_API, body);
  }

  updateEmpleado(id: string, empleado: Partial<Empleado>) {
    const body = { ...empleado } as any;
    if (body.departamento && typeof body.departamento !== 'string') {
      body.departamento = (body.departamento as any)._id;
    }
    return this.http.put<Empleado>(`${this.URL_API}/${id}`, body);
  }

  deleteEmpleado(id: string) {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}
