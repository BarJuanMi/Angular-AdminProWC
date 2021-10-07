import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModeloWC } from 'src/app/models/modelowc.model';
import { Retiro } from 'src/app/models/retiro.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ModelosService } from 'src/app/services/modelos.service';
import { RetirosService } from 'src/app/services/retiros.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nuevo-retiro',
  templateUrl: './nuevo-retiro.component.html',
  styles: [
  ]
})
export class NuevoRetiroComponent implements OnInit {

  public modelosList: ModeloWC[] = [];
  public retiroForm: FormGroup;
  public retiro: Retiro;
  public usuario: Usuario;
  fechaActual: Date;

  constructor(private router: Router,
    private modeloService: ModelosService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private retiroService: RetirosService) 
  { 
    this.usuario = usuarioService.usuario;
    this.retiro = new Retiro('',null,'',new Date(),null,"GENERADO","",false,false,null,null,'','',false);
    this.fechaActual = new Date();
  }

  ngOnInit(): void {
    this.cargarListadoModelosEstado();
    this.retiroForm = this.fb.group({
      modelo: [this.retiro.modelo, Validators.required],
      usuarioNombre: [this.usuario.nombre],
      estado: [this.retiro.estado],
      motivoRetiro: [this.retiro.motivoRetiro, Validators.required],
      entrevista: [this.retiro.entrevista],
      encuesta: [this.retiro.encuesta],
      fechaRenuncia: [this.retiro.fechaRenuncia, Validators.required]
    });
  }

  cargarListadoModelosEstado() {
    const estado : string = 'true';
    this.modeloService.cargarModelosFiltroEstado(estado).subscribe(({modelos}) => {
      this.modelosList = modelos;
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
