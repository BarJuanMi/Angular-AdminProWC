import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private router: Router,
    private modeloService: ModelosService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private retiroService: RetirosService) 
  { 
    this.usuario = usuarioService.usuario;
    this.retiro = new Retiro("","","",null,"GENERADO","",false,false,'',null);
  }

  ngOnInit(): void {
    this.cargarListadoModelosEstado();
    this.retiroForm = this.fb.group({
      modelo: [this.retiro.modelo],
      usuarioNombre: [this.usuario.nombre],
      estado: [this.retiro.estado],
      motivoRetiro: [this.retiro.motivoRetiro],
      entrevista: [this.retiro.entrevista],
      encuesta: [this.retiro.encuesta],
      fechaRenuncia: [this.retiro.fechaRenuncia]
    });
  }

  cargarListadoModelosEstado() {
    const estado : string = 'true';
    this.modeloService.cargarModelosFiltroEstado(estado).subscribe(({modelos}) => {
      this.modelosList = modelos;
    });
  }

  crearNuevoRetiro() {
    console.log('Datos de retiro: ' + JSON.stringify(this.retiroForm.value));

    this.retiroService.crearNuevoRetiro( this.retiroForm.value )
    .subscribe( resp => {
      // Navegar al dashboard
      this.router.navigateByUrl('/dashboard/retiros');

      Swal.fire('Guardado', 'Registro de Retiro Creado Satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }
}
