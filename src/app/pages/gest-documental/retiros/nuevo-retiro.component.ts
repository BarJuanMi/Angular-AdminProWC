import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Retiro } from 'src/app/models/retiro.model';
import { Usuario } from 'src/app/models/usuario.model';
import { RetirosService } from 'src/app/services/retiros.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { CausalRetiro } from 'src/app/models/causalesretiro.model';
import { UtileslistService } from 'src/app/services/utileslist.service';

@Component({
  selector: 'app-nuevo-retiro',
  templateUrl: './nuevo-retiro.component.html',
  styles: [
  ]
})
export class NuevoRetiroComponent implements OnInit {

  public empleadosList: Empleado[] = [];
  public causalesRetiroList: CausalRetiro[] = [];
  public retiroForm: FormGroup;
  public retiro: Retiro;
  public usuario: Usuario;

  constructor(
    private router: Router,
    private empleadoService: EmpleadosService,
    private utilitiesService: UtileslistService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private retiroService: RetirosService) 
  { 
    this.usuario = usuarioService.usuario;
    this.retiro = new Retiro('',null,'',null,'',new Date(),null,'GENERADO','',false,false,null,null,null,'','',false);
  }

  ngOnInit(): void {
    this.cargarListadoEmpleadosEstado();
    this.cargarListadoCausalesRetiro();
    this.retiroForm = this.fb.group({
      empleado: [this.retiro.empleado, Validators.required],
      usuarioNombre: [this.usuario.nombre],
      estado: [this.retiro.estado],
      causal: [this.retiro.causalRetiro],
      motivoRetiro: [this.retiro.motivoRetiro, Validators.required],
      entrevista: [this.retiro.entrevista],
      encuesta: [this.retiro.encuesta],
      fechaRenuncia: [this.retiro.fechaRenuncia, Validators.required],
      contrato: [this.retiro.contrato],
    });
  }

  cargarListadoEmpleadosEstado() {
    const estado : string = 'true';
    this.empleadoService.cargarEmpleadosFiltroEstado(estado).subscribe(({empleados}) => {
      this.empleadosList = empleados;
    });
  }

  cargarListadoCausalesRetiro() {
    this.utilitiesService.cargarCausalesRetiro().subscribe(({causalesretiro}) => {
      this.causalesRetiroList = causalesretiro;
    });
  }

  crearNuevoRetiro() {
    this.retiroService.crearNuevoRetiro( this.retiroForm.value )
    .subscribe( resp => {
      // Navegar a la pantalla de retiros
      this.router.navigateByUrl('/dashboard/retiros');
      Swal.fire('Guardado', 'Registro de Retiro Creado Satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }
}
