import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciudad } from 'src/app/models/ciudad.util.model';
import { ModeloWC } from 'src/app/models/modelowc.model';
import { Pais } from 'src/app/models/pais.util.model';
import { ModelosService } from 'src/app/services/modelos.service';
import { UtileslistService } from 'src/app/services/utileslist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-modelo',
  templateUrl: './actualiza-modelo.component.html',
  styles: [
  ]
})
export class ActualizaModeloComponent implements OnInit {

  public ciudadesList: Ciudad[] = [];
  public paisesList: Pais[] = [];
  numHijosTemp: string = '';
  modeloActualizar: ModeloWC = new ModeloWC('','','','','','','','','','','','','','',false,'','',new Pais('','','',''),new Ciudad('','',''),'','','','','');

  constructor(private modelosService: ModelosService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private utilesListService: UtileslistService)
  {
    activatedRoute.params.subscribe( params => {
    let id = params['id'];
    this.cargarModelo(id);
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
   cargarModelo(id: string) {
    this.modelosService.buscarModeloPorId( id ).subscribe( modelo => {
      this.modeloActualizar = modelo;
      this.numHijosTemp = this.modeloActualizar.numHijos;

      if(this.modeloActualizar.estado === false){
        this.router.navigateByUrl('/dashboard/modelos');
        Swal.fire('Error', 'No es posible actualizar los datos de una modelo inactiva.', 'error');
      }
    });
  }

  /**
   * Metodo que permite actualizar la informacion personal de una modelo en especifico
   */
   actualizarDatosModeloWC( forma: NgForm ) {
    if (forma.invalid) {
      return;
    }

    if(this.modeloActualizar.numHijos === ''){
      this.modeloActualizar.numHijos = this.numHijosTemp;
    }
    
    this.modelosService.actualizarModelo( this.modeloActualizar ).subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/modelos');

        Swal.fire('Guardado', 'Datos de Modelo Actualizados Satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
