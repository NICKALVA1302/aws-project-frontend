import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpleadoService } from '../../service/empleado';
import { DepartamentoService } from '../../service/departamento.service';
import { Empleado } from '../../models/Empleado';
import { Departamento } from '../../models/Departamento';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-empleado',
  imports: [FormsModule, CommonModule], 
  standalone: true,
  templateUrl: './empleado.html',
  styleUrls: ['./empleado.css'],
})
export class EmpleadoComponent implements OnInit {
  empleado: Empleado[] = [];
  departamentos: Departamento[] = [];
  isEditing = false;

  constructor(
    public empleadoService: EmpleadoService,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
    this.loadDepartamentos();
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (res) => {
        this.empleadoService.empleados = res;
      },
      error: (err) => console.error(err),
    });
  }

  loadDepartamentos(): void {
    this.departamentoService.list().subscribe({
      next: (res) => (this.departamentos = res),
      error: (err) => console.error('Error cargando departamentos', err),
    });
  }

  addEmpleado(form: NgForm): void {
    // If editing, call update; otherwise create
    const payload = { ...form.value } as any;
    if (payload.departamento && typeof payload.departamento !== 'string') {
      payload.departamento = payload.departamento._id || payload.departamento;
    }

    if (this.isEditing && this.empleadoService.selectedEmpleado._id) {
      const id = this.empleadoService.selectedEmpleado._id as string;
      this.empleadoService.updateEmpleado(id, payload).subscribe({
        next: () => {
          this.isEditing = false;
          this.empleadoService.selectedEmpleado = { nombre: '', departamento: '', sueldo: 0 } as Empleado;
          this.getEmpleados();
          form.resetForm();
        },
        error: (err) => console.error('Error actualizando empleado', err),
      });
      return;
    }

    this.empleadoService.createEmpleado(payload).subscribe({
      next: () => {
        this.getEmpleados();
        form.resetForm();
      },
      error: (err) => console.error(err),
    });
  }

  startEdit(empleado: Empleado): void {
    // Populate the selectedEmpleado in the service (form binds to it)
    // Normalize departamento to id for the select control
    const dep = (empleado.departamento && typeof empleado.departamento !== 'string') ? (empleado.departamento as Departamento)._id : empleado.departamento;
    this.empleadoService.selectedEmpleado = { ...empleado, departamento: dep } as Empleado;
    this.isEditing = true;
  }

  cancelEdit(form?: NgForm): void {
    this.isEditing = false;
    this.empleadoService.selectedEmpleado = { nombre: '', departamento: '', sueldo: 0 } as Empleado;
    if (form) form.resetForm();
  }

  removeEmpleado(id?: string): void {
    if (!id) return;
    if (!confirm('¿Eliminar este empleado?')) return;
    this.empleadoService.deleteEmpleado(id).subscribe({
      next: () => this.getEmpleados(),
      error: (err) => console.error('Error eliminando empleado', err),
    });
  }

  // Helper para mostrar nombre del departamento sin provocar errores de tipado en la plantilla
  getDepartamentoNombre(dep?: string | Departamento): string {
    if (!dep) return '';
    return typeof dep === 'string' ? dep : (dep.nombre || '');
  }
}
