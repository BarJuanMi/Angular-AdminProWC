import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Aspirante } from 'src/app/models/aspirante.model';
import { CargoAspirante } from 'src/app/models/cargoaspirante.model';
import { Localidad } from 'src/app/models/localidad.util.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AspirantesService } from 'src/app/services/aspirantes.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-aspirantes',
  templateUrl: './aspirantes.component.html',
  styles: [
  ]
})
export class AspirantesComponent implements OnInit {

  public totalAspirantes: number = 0;
  public aspirantes: Aspirante[] = [];
  public aspirantesTemp: Aspirante[] = [];
  public aspiranteWCDetalle: Aspirante = new Aspirante('','','','','','','','',new Usuario('','',null,'','','',false,'','',''),
                                                      new CargoAspirante('','',''),'','','',new Localidad('','',''),false,null,null,'',false,'',false);

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor(private aspirantesService: AspirantesService,
              private busquedasService: BusquedasService,) { }

  ngOnInit(): void {
    this.cargarAspirantes();
  }

  cargarAspirantes() {
    this.cargando = true;
    this.aspirantesService.cargarAspirantesDesde(this.desde).subscribe( ({ total, aspirantes}) => {

      console.log(aspirantes);
      this.totalAspirantes = total;
      this.aspirantes = aspirantes;
      this.aspirantesTemp = aspirantes;
      this.cargando = false;
    });
  }
  
  /**
   * 
   * @param valor 
   */
   cambiarPagina( valor: number) {
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde >= this.totalAspirantes) {
      this.desde -=  valor;
    }

    this.cargarAspirantes();
  }

  /**
   * 
   * @param termino 
   * @returns 
   */
   buscarAspirantesTermino( termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if ( termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.aspirantes = this.aspirantesTemp;
    }

    this.busquedasService.buscarTerminoEnAspirantes( 'aspirantes', termino)
        .subscribe( (resultados: Aspirante[]) => {
          this.aspirantes = resultados;
        });
  }
}
