import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciudad } from 'src/app/models/ciudad.util.model';
import { Pais } from 'src/app/models/pais.util.model';
import { UtileslistService } from 'src/app/services/utileslist.service';
import { EmpleadosService } from '../../../services/empleados.service';
import Swal from 'sweetalert2';
import { Empleado } from 'src/app/models/empleado.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-actualiza-empleado',
  templateUrl: './actualiza-empleado.component.html',
  styles: [
  ]
})
export class ActualizaEmpleadoComponent implements OnInit {

  public ciudadesList: Ciudad[] = [];
  public paisesList: Pais[] = [];
  numHijosTemp: string = '';
  public tipoEmpleActua: String;
  empleadoActualizar: Empleado = new Empleado('','','','','','','',null,null,'','','','','','',null,false,'',null,null,null,'','',null,'','','',null,'');

  constructor(private empleadosService : EmpleadosService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private utilesListService: UtileslistService)
  {
    activatedRoute.params.subscribe( params => {
      this.tipoEmpleActua = params['tipo'];
      let id = params['id'];
      this.cargarEmpleado(id);
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
   cargarEmpleado(id: string) {
    this.empleadosService.buscarEmpleadoPorId( id ).subscribe( empleado => {
      this.empleadoActualizar = empleado;
      this.numHijosTemp = this.empleadoActualizar.numHijos;

      if(this.empleadoActualizar.estado === false) {

        switch(this.tipoEmpleActua) {
          case 'monitor':
            this.router.navigateByUrl('/dashboard/monitores');
          case 'administrativo':
            this.router.navigateByUrl('/dashboard/administrativos');
          case 'modelo':
            this.router.navigateByUrl('/dashboard/modelos');
        }
        Swal.fire('Error', 'No es posible actualizar los datos del empleado en estado inactivo.', 'error');
      }
    });
  }

  /**
   * Metodo que permite actualizar la informacion personal de una modelo en especifico
   */
   actualizarDatosEmpleado( forma: NgForm ) {
    if (forma.invalid) {
      return;
    }

    if(this.empleadoActualizar.numHijos === ''){
      this.empleadoActualizar.numHijos = this.numHijosTemp;
    }
    
    this.empleadosService.actualizarEmpleadoPorId( this.empleadoActualizar ).subscribe( resp => {
        // Navegar al dashboard
        switch(this.tipoEmpleActua) {
          case 'monitor':
            this.router.navigateByUrl('/dashboard/monitores');
          case 'administrativo':
            this.router.navigateByUrl('/dashboard/administrativos');
          case 'modelo':
            this.router.navigateByUrl('/dashboard/modelos');
        }

        Swal.fire('Guardado', 'Datos de empleado administrativo actualizado satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
