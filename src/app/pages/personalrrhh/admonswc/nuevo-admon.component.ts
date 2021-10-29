import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdmonWC } from '../../../models/admonwc.model';
import { AdmonsService } from '../../../services/admons.service';
import { UtileslistService } from '../../../services/utileslist.service';
import Swal from 'sweetalert2';
import { Ciudad } from '../../../models/ciudad.util.model';
import { Pais } from '../../../models/pais.util.model';

@Component({
  selector: 'app-nuevo-admon',
  templateUrl: './nuevo-admon.component.html',
  styles: [
  ]
})
export class NuevoAdmonComponent implements OnInit {
  
  public ciudadesList: Ciudad[] = [];
  public paisesList: Pais[] = [];
  public admonwcForm: FormGroup;
  public admon: AdmonWC;

  constructor(private router: Router,
              private fb: FormBuilder,
              private admonsService: AdmonsService,
              private utilesListService: UtileslistService) 
  {
    this.admon = new AdmonWC('','','','','','','','','','','','','','',false,'','',new Pais('','','',''),new Ciudad('','',''),'','','','','');
  }

  ngOnInit(): void {
    this.cargarListadoCiudades();
    this.cargarListadoPaises();

    this.admonwcForm = this.fb.group({
      documento: [this.admon.documento ],
      tipoDocumento: [this.admon.tipoDocumento],
      nombres: [this.admon.nombres ],
      apellidos: [this.admon.apellidos ],
      genero: [this.admon.genero],
      fechaNac: [this.admon.fechaNac],
      emailCorporativo: [this.admon.emailCorporativo],
      telCelular: [this.admon.telCelular],
      direccion: [this.admon.direccion], 
      rh: [this.admon.rh],
      nomContEmer: [this.admon.nomContEmer],
      telContEmer: [this.admon.telContEmer],
      fechaIngreso: [this.admon.fechaIngreso],
      numHijos: [this.admon.numHijos],
      entidadBanco: [this.admon.entidadBanco],
      numCuentaBanco: [this.admon.numCuentaBanco],
      nacionalidad: [this.admon.nacionalidad],
      ciudadResidencia: [this.admon.ciudadResidencia]
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
   crearNuevaAdmon() {
    this.admonsService.crearAdministrativo( this.admonwcForm.value )
      .subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/administrativos');

        Swal.fire('Guardado', 'Empleado Administrativo Creado Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}