import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorWC } from 'src/app/models/monitorwc.model';
import { MonitoresService } from 'src/app/services/monitores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-monitor',
  templateUrl: './actualiza-monitor.component.html',
  styles: [
  ]
})
export class ActualizaMonitorComponent implements OnInit {

  numHijosTemp: string = '';
  monitorActualizar: MonitorWC = new MonitorWC('','','','','','','','','','','','','','',false,false,'','','','','','','');

  constructor(private monitoresService: MonitoresService,
              private router: Router,
              private activatedRoute: ActivatedRoute)
  {
    activatedRoute.params.subscribe( params => {
    let id = params['id'];
    this.cargarMonitor(id);
    });
  }

  ngOnInit(): void {
  }

  /**
   * Metodo que permite cargar la informacion de un monitor a traves
   * del id que le identifica en la coleccion de la base de datos .
   */
   cargarMonitor(id: string) {
    this.monitoresService.buscarMonitorPorId( id ).subscribe( monitor => {
      this.monitorActualizar = monitor;
      this.numHijosTemp = this.monitorActualizar.numHijos;

      if(this.monitorActualizar.estado === false){
        this.router.navigateByUrl('/dashboard/monitores');
        Swal.fire('Error', 'No es posible actualizar los datos de un monitor inactivo.', 'error');
      }
    });
  }

  /**
   * Metodo que permite actualizar la informacion personal de una monitor en especifico
   */
   actualizarDatosMonitorWC( forma: NgForm ) {
    if (forma.invalid) {
      return;
    }

    if(this.monitorActualizar.numHijos === ''){
      this.monitorActualizar.numHijos = this.numHijosTemp;
    }
    

    this.monitoresService.actualizarMonitor( this.monitorActualizar ).subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/monitores');

        Swal.fire('Guardado', 'Datos de Monitor actualizados satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
