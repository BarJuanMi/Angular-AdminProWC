import { Component, OnInit } from '@angular/core';
import { Vacunado } from 'src/app/models/vacunado.model';
import { Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { VacunadosService } from 'src/app/services/vacunas.service';

@Component({
  selector: 'app-vacunas-codiv19',
  templateUrl: './vacunas-codiv19.component.html',
  styles: [
  ]
})
export class VacunasCodiv19Component implements OnInit {

  public totalVacunados: number = 0;
  public vacunados: Vacunado[] = [];
  public vacunadosTemp: Vacunado[] = [];
  public vacunadoDetalle: Vacunado = new Vacunado('','','','','','','','','',null,'');
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor(private vacunadosService: VacunadosService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarVacunados();
  }

  /**
   * Metodo que permite cargar todos los prestamos que se encuentran asociados en la aplicacion.
   */
   cargarVacunados() {
    this.cargando = true;
    this.vacunadosService.cargarVacunadosDesde(this.desde).subscribe( ({ total, vacunados}) => {
      this.totalVacunados = total;
      this.vacunados = vacunados;
      this.vacunadosTemp = vacunados;
      this.cargando = false;
    });
  }
  
  /**
   * Metodo que permite paginar las transacciones de tipo prestamo en el front
   * @param valor 
   */
  cambiarPagina( valor: number) {
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde >= this.totalVacunados) {
      this.desde -=  valor;
    }
    this.cargarVacunados();
  }

}
