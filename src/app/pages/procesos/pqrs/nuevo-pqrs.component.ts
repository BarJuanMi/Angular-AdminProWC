import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../services/empleados.service';
import { UsuarioService } from '../../../services/usuario.service';
import { UtileslistService } from '../../../services/utileslist.service';
import { PqrsiService } from '../../../services/pqrsi.service';
import { PQRS } from '../../../models/pqrs.model';
import { TipoPQRS } from '../../../models/tipopqrs.model';
import { Empleado } from '../../../models/empleado.model';
import { Sede } from '../../../models/sede.util.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-nuevo-pqrs',
  templateUrl: './nuevo-pqrs.component.html',
  styles: [
  ]
})
export class NuevoPqrsComponent implements OnInit {

  public sedesList: Sede [] = [];
  public tipoPQRSList: TipoPQRS [] = [];
  public empleadosList: Empleado[] = [];
  public pqrsForm: FormGroup;
  public pqrs: PQRS;
  public usuario: Usuario;

  constructor(private router: Router,
              private fb: FormBuilder,
              private pqrsiService: PqrsiService,
              private usuarioService: UsuarioService,
              private empleadoService: EmpleadosService,
              private utilesListService: UtileslistService) 
  { 
    this.usuario = usuarioService.usuario;
    this.pqrs = new PQRS('','','','',false,null,null,null,null,null,null,null,'','','');
  }

  ngOnInit(): void {
    this.cargarListadoSedes();
    this.cargarListadoTipoPQRS();
    this.cargarListadoEmpleadosEstado();

    this.pqrsForm = this.fb.group({
      prioridad: [this.pqrs.prioridad ],
      fechaOcurrencia: [this.pqrs.fechaOcurrencia],
      sede: [this.pqrs.sede],
      tipo: [this.pqrs.tipo],
      empleadoAsociado: [this.pqrs.empleadoAsociado],
      detallePrimario: [this.pqrs.detallePrimario]
    })
  }

  cargarListadoSedes() {
    this.utilesListService.cargarSedesList().subscribe(({sedes}) => {
      this.sedesList = sedes;
    })
  }

  cargarListadoTipoPQRS() {
    this.utilesListService.cargarTipoPQRSList().subscribe(({tipospqrs}) => {
      this.tipoPQRSList = tipospqrs; 
    })
  }

  cargarListadoEmpleadosEstado() {
    const estado : string = 'true';
    this.empleadoService.cargarEmpleadosFiltroEstado (estado).subscribe(({empleados}) => {
      this.empleadosList = empleados;
    });
  }

  crearNuevoPQRS() {
    this.pqrsiService.crearPQRSIncidente( this.pqrsForm.value )
      .subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/pqrsi');

        Swal.fire('Guardado', 'PQRS Creado Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
