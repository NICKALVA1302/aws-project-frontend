import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../models/Departamento';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private readonly URL_API = `cl/api/departamentos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Departamento[]>(this.URL_API);
  }

  create(dep: Partial<Departamento>) {
    return this.http.post<Departamento>(this.URL_API, dep);
  }
}
