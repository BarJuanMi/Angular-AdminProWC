import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloWC } from 'src/app/models/modelowc.model';
import { Prestamo } from 'src/app/models/prestamo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ModelosService } from 'src/app/services/modelos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PrestamosService } from '../../services/prestamos.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-nuevo-monitor',
    templateUrl: './nuevo-prestamo.component.html',
    styles: [
    ]
  })
  export class NuevoPrestamoComponent implements OnInit {

    public modelosList: ModeloWC[] = [];
    public prestamoForm: FormGroup;
    public prestamo: Prestamo;
    public usuario: Usuario;

    constructor(private router: Router,
                private modeloService: ModelosService,
                private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private prestamoService: PrestamosService)
    {
      this.usuario = usuarioService.usuario;
      this.prestamo = new Prestamo('','','','',null,'','',null,null,'');
    }

    ngOnInit(): void {
      this.cargarListadoModelosEstado();
      this.prestamoForm = this.fb.group({
        monto: [this.prestamo.monto],
        modelo: [this.prestamo.modelo],
        observaciones: [this.prestamo.observaciones],
        usuarioNombre: [this.usuario.nombre]
      });
    }

    cargarListadoModelosEstado() {
      const estado : string = 'true';
      this.modeloService.cargarModelosFiltroEstado(estado).subscribe(({modelos}) => {
        this.modelosList = modelos;
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