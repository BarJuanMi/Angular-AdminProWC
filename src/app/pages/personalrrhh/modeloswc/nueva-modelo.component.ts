import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloWC } from '../../../models/modelowc.model';
import { ModelosService } from '../../../services/modelos.service';
import { UtileslistService } from '../../../services/utileslist.service';
import Swal from 'sweetalert2';
import { Ciudad } from '../../../models/ciudad.util.model';
import { Pais } from '../../../models/pais.util.model';

@Component({
  selector: 'app-nueva-modelo',
  templateUrl: './nueva-modelo.component.html',
  styles: [
  ]
})
export class NuevaModeloComponent implements OnInit {
  
  public ciudadesList: Ciudad[] = [];
  public paisesList: Pais[] = [];
  public modelowcForm: FormGroup;
  public modelo: ModeloWC;

  constructor(private router: Router,
              private fb: FormBuilder,
              private modelosService: ModelosService,
              private utilesListService: UtileslistService) 
  {
    this.modelo = new ModeloWC('','','','','','','','','','','','','','',false,'','',null,null,'','','','','');
  }

  ngOnInit(): void {
    this.cargarListadoCiudades();
    this.cargarListadoPaises();

    this.modelowcForm = this.fb.group({
      documento: [this.modelo.documento ],
      tipoDocumento: [this.modelo.tipoDocumento],
      nombres: [this.modelo.nombres ],
      apellidos: [this.modelo.apellidos ],
      genero: [this.modelo.genero],
      fechaNac: [this.modelo.fechaNac],
      emailCorporativo: [this.modelo.emailCorporativo],
      telCelular: [this.modelo.telCelular],
      direccion: [this.modelo.direccion], 
      rh: [this.modelo.rh],
      nomContEmer: [this.modelo.nomContEmer],
      telContEmer: [this.modelo.telContEmer],
      fechaIngreso: [this.modelo.fechaIngreso],
      numHijos: [this.modelo.numHijos],
      entidadBanco: [this.modelo.entidadBanco],
      numCuentaBanco: [this.modelo.numCuentaBanco],
      nacionalidad: [this.modelo.nacionalidad],
      ciudadResidencia: [this.modelo.ciudadResidencia]
    });
  }

  cargarListadoCiudades() {
    this.utilesListService.cargarCiudadesList().subscribe(({ciudades}) => {
      this.ciudadesList = ciudades;
    });
  }

  cargarListadoPaises() {
    this.utilesListService.cargarPaisesList().subscribe(({paises}) => {
      this.paisesList = paises;
    });
  }
  
  /**
   * 
   */
  crearNuevaModelo() {
    this.modelosService.crearModelo( this.modelowcForm.value )
      .subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/modelos');

        Swal.fire('Guardado', 'Modelo Creada Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
