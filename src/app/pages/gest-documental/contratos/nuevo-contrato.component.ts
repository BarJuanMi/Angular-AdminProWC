import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Memorando } from 'src/app/models/memorando.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Empleado } from 'src/app/models/empleado.model';
import { Contrato } from 'src/app/models/contrato.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ContratosService } from 'src/app/services/contratos.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { CargarTipoContrato } from '../../../interfaces/cargar-tipocontrato.interface';
import { TipoContrato } from 'src/app/models/tipocontrato.model';
import { UtileslistService } from 'src/app/services/utileslist.service';


@Component({
  selector: 'app-nuevo-contrato',
  templateUrl: './nuevo-contrato.component.html',
  styles: [
  ]
})
export class NuevoContratoComponent implements OnInit {

  public empleadosList: Empleado[] = [];
  public tipoContratosList: TipoContrato[] = [];
  public contratoForm: FormGroup;
  public contrato: Contrato;
  public usuario: Usuario;

  constructor(
    private router: Router,
    private empleadoService: EmpleadosService,
    private utilitiesService: UtileslistService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private contratoService: ContratosService) 
  { 
    this.usuario = usuarioService.usuario;
    this.contrato = new Contrato('',null,'','',new Usuario('','',null,'','','',false,'','',''),
                                new Date(),null,new Date(),null,'',new Date(),
                                new Usuario('','',null,'','','',false,'','',''),'',false,'','',
                                new Date(),new Usuario('','',null,'','','',false,'','',''),'',false,'','','');
  }

  ngOnInit(): void {
    this.cargarListadoEmpleadosEstado();
    this.cargarListadoTipoContrato();
    this.contratoForm = this.fb.group({
      empleado: [this.contrato.empleado, Validators.required],
      tipo: [this.contrato.tipoContrato, Validators.required],
      usuarioNombre: [this.usuario.nombre],
      fechaInicioContrato: [this.contrato.fechaInicioContrato, Validators.required],
      fechaFinContrato: [this.contrato.fechaFinContrato],
      observaciones: [this.contrato.observaciones],
    });
  }

  cargarListadoEmpleadosEstado() {
    const estado : string = 'true';
    this.empleadoService.cargarEmpleadosFiltroEstado(estado).subscribe(({empleados}) => {
      this.empleadosList = empleados;
    });
  }

  cargarListadoTipoContrato() {
    this.utilitiesService.cargarTipoContratos().subscribe(({tipocontratos}) => {
      this.tipoContratosList = tipocontratos;
    });
  }

  crearNuevoContrato() {
    this.contratoService.consultaTipoContrato(this.contratoForm.value.tipo).subscribe(tipoContratoRet => {
      console.log(JSON.stringify(tipoContratoRet));
      let tipoRet: TipoContrato = tipoContratoRet;
      if (tipoRet.tipocontratoDesc.includes('Indefinido') && this.contratoForm.value.fechaFinContrato !== null && this.contratoForm.value.fechaFinContrato !== '') {
        Swal.fire('Advertencia', 'El tipo de contrato seleccionado no debe tener estipulada una fecha de culminación de la obligación contractual.', 'warning');
      } else {
        this.contratoService.crearNuevoContrato( this.contratoForm.value )
        .subscribe( resp => {
          // Navegar a la pantalla de retiros
          this.router.navigateByUrl('/dashboard/contratos');
          Swal.fire('Guardado', 'Registro de Contrato Creado Satisfactoriamente', 'success');
        }, ( err ) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
      }
    });
  }
}

