import { Component, OnInit } from '@angular/core';
import { ModeloWC } from 'src/app/models/modelowc.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelosService } from 'src/app/services/modelos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Vacunado } from 'src/app/models/vacunado.model';
import { VacunadosService } from '../../../services/vacunas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-reg-vacuna',
  templateUrl: './nuevo-reg-vacuna.component.html',
  styles: [
  ]
})
export class NuevoRegVacunaComponent implements OnInit {

  public modelosList: ModeloWC[] = [];
  public usuario: Usuario;
  public primDosisForm: FormGroup;
  public vacunado: Vacunado;

  constructor(
    private router: Router,
    private modeloService: ModelosService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private vacunadosService: VacunadosService
  ) { 
    this.usuario = usuarioService.usuario;
    this.vacunado = new Vacunado('','','',new Date(),null,null,null,null,'EPS PERSONAL',null,false,'');
  }

  ngOnInit(): void {
    this.cargarListadoModelosEstado();
    this.primDosisForm = this.fb.group({
      modelo: [this.vacunado.modelo, Validators.required],
      usuarioNombre: [this.usuario.nombre],
      regulador: [this.vacunado.regulador],
      fechaPriDosis: [this.vacunado.fechaPriDosis],
      farmaceutica: [this.vacunado.farmaceutica],
      sintomatologia: [this.vacunado.sintomatologia]
    });
  }

  cargarListadoModelosEstado() {
    const estado : string = 'true';
    this.modeloService.cargarModelosFiltroEstado(estado).subscribe(({modelos}) => {
      this.modelosList = modelos;
    });
  }

  crearRegPrimDosis() {
    this.vacunadosService.crearPrimerRegVacunado( this.primDosisForm.value )
    .subscribe( resp => {
      // Navegar a la pantalla de vacunados
      this.router.navigateByUrl('/dashboard/vacunados');
      Swal.fire('Guardado', 'Registro de Retiro Creado Satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
      this.router.navigateByUrl('/dashboard/vacunados');
    });
  }

}
