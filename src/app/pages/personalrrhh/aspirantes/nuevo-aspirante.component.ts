import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CargoAspirante } from 'src/app/models/cargoaspirante.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AspirantesService } from 'src/app/services/aspirantes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Aspirante } from '../../../models/aspirante.model';
import { Localidad } from '../../../models/localidad.util.model';
import { UtileslistService } from 'src/app/services/utileslist.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nuevo-aspirante',
  templateUrl: './nuevo-aspirante.component.html',
  styles: [
  ]
})
export class NuevoAspiranteComponent implements OnInit {

  public cargoAspiranteList: CargoAspirante[] = [];
  public localidadesList: Localidad[] = [];
  public aspirante: Aspirante;
  public aspiranteForm: FormGroup;
  public usuario: Usuario;

  constructor(
              private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private aspiranteService: AspirantesService,
              private utilesListService: UtileslistService) 
  {
    this.usuario = usuarioService.usuario;
    this.aspirante = new Aspirante('','','','','','','','','',null,null,'','','',null,false,null,null,'',false,'',false);
  }

  ngOnInit(): void {
    this.cargarListadoCargosAspirantes();
    this.cargarListadoLocalidades();

    this.aspiranteForm = this.fb.group({
      documento: [this.aspirante.documento ],
      tipoDocumento: [this.aspirante.tipoDocumento],
      nombres: [this.aspirante.nombres ],
      apellidos: [this.aspirante.apellidos ],
      email: [this.aspirante.email],
      telCelular: [this.aspirante.numCelular],
      cargoAspirante: [this.aspirante.cargoAspirante],
      direccion: [this.aspirante.direccion],
      localidad: [this.aspirante.localidad],
      edad: [this.aspirante.edad],
      notasEntrevistador: [this.aspirante.notasEntrevistador],
      experienciaPrevia: [this.aspirante.experienciaPrevia],
      fechaEntrevista: [this.aspirante.fechaEntrevista]
    })
  }

  cargarListadoCargosAspirantes() {
    this.utilesListService.cargarCargosAspirantes().subscribe(({cargosAspirantes}) => {
      this.cargoAspiranteList = cargosAspirantes;
    });
  }

  cargarListadoLocalidades() {
    this.utilesListService.cargarLocalidadesCiudad().subscribe(({localidades}) => {
      this.localidadesList = localidades;
    })
  }

  crearNuevoAspirante() {
    this.aspiranteService.crearNuevoAspirante( this.aspiranteForm.value )
      .subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/aspirantes');

        Swal.fire('Guardado', 'Registro de Aspirante Creado Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
