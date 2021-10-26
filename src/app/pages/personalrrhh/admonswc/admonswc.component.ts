import { Component, OnInit } from '@angular/core';
import { AdmonWC } from 'src/app/models/admonwc.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Pais } from 'src/app/models/pais.util.model';
import { Ciudad } from 'src/app/models/ciudad.util.model';

@Component({
  selector: 'app-admonswc',
  templateUrl: './admonswc.component.html',
  styles: [
  ]
})
export class AdmonswcComponent implements OnInit {

  public totalModelos: number = 0;
  public admons: AdmonWC[] = [];
  public admonsTemp: AdmonWC[] = [];
  public admonWCDetalle: AdmonWC = new AdmonWC('', '', '', '', '', '', '', '', '', '', '', '', '', '',
                      false, '', '', new Pais('', '', '', ''), new Ciudad('', '', ''), '', '', '', '', '');
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
