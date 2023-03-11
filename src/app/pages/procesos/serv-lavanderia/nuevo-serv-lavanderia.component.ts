import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sede } from 'src/app/models/sede.util.model';
import { Servlavanderia } from 'src/app/models/servlavanderia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtileslistService } from 'src/app/services/utileslist.service';
import Swal from 'sweetalert2';
import { ServLavanderiaService } from '../../../services/serv-lavanderia.service';

@Component({
  selector: 'app-nuevo-serv-lavanderia',
  templateUrl: './nuevo-serv-lavanderia.component.html',
  styles: [
  ]
})
export class NuevoServLavanderiaComponent implements OnInit {

  public sedesList: Sede [] = [];
  public servLavan: Servlavanderia;
  public servLavanForm: FormGroup;
  public usuario: Usuario;

  constructor(
              private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private servLavanderiaService: ServLavanderiaService,
              private utilesListService: UtileslistService) 
  { 
    this.usuario = usuarioService.usuario;
    this.servLavan = new Servlavanderia('','',null,'',null,null,null,null,'','',false,null,'','');
  }

  ngOnInit(): void {
    this.cargarListadoSedes();

    this.servLavanForm = this.fb.group({
      sede: [this.servLavan.sede],
      cantidadColchas: [this.servLavan.cantidadColchas],
      fechaSalidaColchas: [this.servLavan.fechaSalidaColchas],
      obsSalidaColchas: [this.servLavan.obsSalidaColchas],
    })
  }

  cargarListadoSedes() {
    this.utilesListService.cargarSedesList().subscribe(({sedes}) => {
      this.sedesList = sedes;
    })
  }

  crearNuevoServLavan() {
    this.servLavanderiaService.crearRegServLavan( this.servLavanForm.value )
      .subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/servsLavanderia');

        Swal.fire('Guardado', 'Registro de Servicio de Lavanderia Creado Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
