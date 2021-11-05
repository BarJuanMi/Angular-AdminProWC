import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmonWC } from 'src/app/models/admonwc.model';
import { Ciudad } from 'src/app/models/ciudad.util.model';
import { Pais } from 'src/app/models/pais.util.model';
import { AdmonsService } from 'src/app/services/admons.service';
import { UtileslistService } from 'src/app/services/utileslist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-admon',
  templateUrl: './actualiza-admon.component.html',
  styles: [
  ]
})
export class ActualizaAdmonComponent implements OnInit {

  public ciudadesList: Ciudad[] = [];
  public paisesList: Pais[] = [];
  numHijosTemp: string = '';
  admonActualizar: AdmonWC = new AdmonWC('','','','','','','','','','','','','','',false,'','',new Pais('','','',''),new Ciudad('','',''),'','','','','');

  constructor(private admonsService: AdmonsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private utilesListService: UtileslistService)
  {
    activatedRoute.params.subscribe( params => {
    let id = params['id'];
    this.cargarAdmon(id);
    });
  }

  ngOnInit(): void {
    this.cargarListadoCiudades();
    this.cargarListadoPaises();
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
   * Metodo que permite cargar la informacion de un modelo a traves
   * del id que le identifica en la coleccion de la base de datos .
   */
   cargarAdmon(id: string) {
    this.admonsService.buscarAdministrativoPorId( id ).subscribe( administrativo => {
      this.admonActualizar = administrativo;
      this.numHijosTemp = this.admonActualizar.numHijos;

      if(this.admonActualizar.estado === false){
        this.router.navigateByUrl('/dashboard/administrativos');
        Swal.fire('Error', 'No es posible actualizar los datos de un empleado administrativo inactivo.', 'error');
      }
    });
  }

  /**
   * Metodo que permite actualizar la informacion personal de una modelo en especifico
   */
   actualizarDatosAdmonWC( forma: NgForm ) {
    if (forma.invalid) {
      return;
    }

    if(this.admonActualizar.numHijos === ''){
      this.admonActualizar.numHijos = this.numHijosTemp;
    }
    
    this.admonsService.actualizarAdministrativo( this.admonActualizar ).subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/administrativos');

        Swal.fire('Guardado', 'Datos de empleado administrativo actualizado satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
