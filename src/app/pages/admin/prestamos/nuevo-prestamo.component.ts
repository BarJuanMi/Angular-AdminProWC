import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Prestamo } from 'src/app/models/prestamo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PrestamosService } from '../../../services/prestamos.service';
import Swal from 'sweetalert2';
import { Empleado } from '../../../models/empleado.model';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
    selector: 'app-nuevo-monitor',
    templateUrl: './nuevo-prestamo.component.html',
    styles: [
    ]
  })
  export class NuevoPrestamoComponent implements OnInit {

    public empleadosList: Empleado[] = [];
    public prestamoForm: FormGroup;
    public prestamo: Prestamo;
    public usuario: Usuario;

    constructor(private router: Router,
                private empleadoService: EmpleadosService,
                private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private prestamoService: PrestamosService)
    {
      this.usuario = usuarioService.usuario;
      this.prestamo = new Prestamo('','',null,'',null,'','',null,null,'');
    }

    ngOnInit(): void {
      this.cargarListadoEmpleadosEstado();
      this.prestamoForm = this.fb.group({
        monto: [this.prestamo.monto],
        empleado: [this.prestamo.empleado],
        observaciones: [this.prestamo.observaciones],
        usuarioNombre: [this.usuario.nombre]
      });
    }

    cargarListadoEmpleadosEstado() {
      const estado : string = 'true';
      this.empleadoService.cargarEmpleadosFiltroEstado (estado).subscribe(({empleados}) => {
        this.empleadosList = empleados;
      });
    }

    crearNuevoPrestamo() {
      this.prestamoService.crearNuevoPrestamo( this.prestamoForm.value )
      .subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/prestamos');

        Swal.fire('Guardado', 'Prestamo Creado Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }

  }    