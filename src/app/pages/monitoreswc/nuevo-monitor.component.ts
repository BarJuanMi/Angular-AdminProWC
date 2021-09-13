import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MonitorWC } from 'src/app/models/monitorwc.model';
import { MonitoresService } from 'src/app/services/monitores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-monitor',
  templateUrl: './nuevo-monitor.component.html',
  styles: [
  ]
})
export class NuevoMonitorComponent implements OnInit {

  public monitorwcForm: FormGroup;
  public monitor: MonitorWC;

  constructor(private router: Router,
    private fb: FormBuilder,
    private monitoresService: MonitoresService) 
    {
    this.monitor = new MonitorWC('','','','','','','','','','','','','','',false,false,'','','','','','','');
    }

    ngOnInit(): void {
      this.monitorwcForm = this.fb.group({
        documento: [this.monitor.documento ],
        tipoDocumento: [this.monitor.tipoDocumento],
        nombres: [this.monitor.nombres ],
        apellidos: [this.monitor.apellidos ],
        genero: [this.monitor.genero],
        recomendado: [this.monitor.recomendado],
        fechaNac: [this.monitor.fechaNac],
        emailCorporativo: [this.monitor.emailCorporativo],
        telCelular: [this.monitor.telCelular],
        direccion: [this.monitor.direccion], 
        rh: [this.monitor.rh],
        nomContEmer: [this.monitor.nomContEmer],
        telContEmer: [this.monitor.telContEmer],
        fechaIngreso: [this.monitor.fechaIngreso],
        numHijos: [this.monitor.numHijos],
        entidadBanco: [this.monitor.entidadBanco],
        numCuentaBanco: [this.monitor.numCuentaBanco]
      });
    }

  /**
   * 
   */
   crearNuevoMonitor() {
    this.monitoresService.crearMonitor( this.monitorwcForm.value )
      .subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/monitores');

        Swal.fire('Guardado', 'Monitor Creado Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
