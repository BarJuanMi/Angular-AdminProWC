import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Ausentismo } from 'src/app/models/ausentismo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AusentismosService } from 'src/app/services/ausentismos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { UtileslistService } from '../../../services/utileslist.service';
import { TipoAusentismo } from '../../../models/tipoausentismo.model';
import { UtilesValidaService } from 'src/app/services/utilesvalida.service';

@Component({
  selector: 'app-nuevo-ausentismo',
  templateUrl: './nuevo-ausentismo.component.html',
  styles: [
  ]
})
export class NuevoAusentismoComponent implements OnInit {

  public empleadosList: Empleado[] = [];
  public tipoAusentismosList: TipoAusentismo[] = [];
  public ausentismoForm: FormGroup;
  public ausentismo: Ausentismo;
  public usuario: Usuario;

  constructor(
    private router: Router,
    private empleadoService: EmpleadosService,
    private utilitiesService: UtileslistService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ausentismoService: AusentismosService,
    private utilesValidaService: UtilesValidaService) 
  { 
    this.usuario = usuarioService.usuario;
    this.ausentismo = new Ausentismo('',null,'',null,new Date(),new Date(),'',
                                    new Usuario('','',null,'','','',false,'','',''),new Date(),'',new Date(),
                                    new Usuario('','',null,'','','',false,'','',''),new Date(),
                                    new Usuario('','',null,'','','',false,'','',''),'',false,'','');
  }

  ngOnInit(): void {
    this.cargarListadoEmpleadosEstado();
    this.cargarListadoTipoAusentismo();
    this.ausentismoForm = this.fb.group({
      empleado: [this.ausentismo.empleado, Validators.required],
      tipo: [this.ausentismo.tipoAusentismo, Validators.required],
      fechaInicio: [this.ausentismo.fechaInicio, Validators.required],
      fechaFinalizacion: [this.ausentismo.fechaFinalizacion],
      usuarioNombre: [this.usuario.nombre],
      estado: [this.ausentismo.estado]
    });
  }

  cargarListadoEmpleadosEstado() {
    const estado : string = 'true';
    this.empleadoService.cargarEmpleadosFiltroEstado(estado).subscribe(({empleados}) => {
      this.empleadosList = empleados;
    });
  }

  cargarListadoTipoAusentismo() {
    this.utilitiesService.cargarTipoAusentismos().subscribe(({tipoausentismos}) => {
      this.tipoAusentismosList = tipoausentismos;
    });
  }

  crearNuevoAusentismo() {
    const { fechaInicio, fechaFinalizacion } = this.ausentismoForm.value;

    if(!this.utilesValidaService.validaFechas(fechaInicio, fechaFinalizacion)) {
      Swal.fire('Error', 'La Fecha de Inicio no puede ser mayor a la Fecha de Finalizacion' , 'error');
    } else {
      this.ausentismoService.crearNuevoAusentismo(this.ausentismoForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/dashboard/ausentismos');
        Swal.fire('Guardado', 'Registro de Ausentismo Creado Satisfactoriamente', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg , 'error');
      });
    }
  }

}
