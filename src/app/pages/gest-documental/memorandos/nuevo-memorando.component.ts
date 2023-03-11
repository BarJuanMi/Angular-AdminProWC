import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Memorando } from 'src/app/models/memorando.model';
import { Usuario } from 'src/app/models/usuario.model';
import { MemorandosService } from 'src/app/services/memorandos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-nuevo-memorando',
  templateUrl: './nuevo-memorando.component.html',
  styles: [
  ]
})
export class NuevoMemorandoComponent implements OnInit {

  public empleadosList: Empleado[] = [];
  public memoForm: FormGroup;
  public memorando: Memorando;
  public usuario: Usuario;

  constructor(
    private router: Router,
    private empleadoService: EmpleadosService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private memorandoService: MemorandosService) 
  { 
    this.usuario = usuarioService.usuario;
    this.memorando = new Memorando('',null,'','CREADO SIN SOPORTE',new Usuario('','',null,'','','',false,'','',''),
                                  new Date(),'','','',new Date(),'',new Date(),new Usuario('','',null,'','','',false,'','',''),
                                  '',false,'','');
  }

  ngOnInit(): void {
    this.cargarListadoEmpleadosEstado();
    this.memoForm = this.fb.group({
      empleado: [this.memorando.empleado, Validators.required],
      usuarioNombre: [this.usuario.nombre],
      estado: [this.memorando.estado],
      descripcion: [this.memorando.descripcion, Validators.required],
      normaInfringida: [this.memorando.normaInfringida],
      posiblesConsecuencias: [this.memorando.posiblesConsecuencias],
      fechaEvento: [this.memorando.fechaEvento, Validators.required]
    });
  }

  cargarListadoEmpleadosEstado() {
    const estado : string = 'true';
    this.empleadoService.cargarEmpleadosFiltroEstado(estado).subscribe(({empleados}) => {
      this.empleadosList = empleados;
    });
  }

  crearNuevoMemo() {
    this.memorandoService.crearNuevoMemorando( this.memoForm.value )
    .subscribe( resp => {
      // Navegar a la pantalla de retiros
      this.router.navigateByUrl('/dashboard/memorandos');
      Swal.fire('Guardado', 'Registro de Memorando Creado Satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }
}
