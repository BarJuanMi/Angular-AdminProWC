import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Vacunado } from 'src/app/models/vacunado.model';
import { VacunadosService } from '../../../services/vacunas.service';
import Swal from 'sweetalert2';
import { Empleado } from '../../../models/empleado.model';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-nuevo-reg-vacuna',
  templateUrl: './nuevo-reg-vacuna.component.html',
  styles: [
  ]
})
export class NuevoRegVacunaComponent implements OnInit {

  public empleadosList: Empleado[] = [];
  public usuario: Usuario;
  public primDosisForm: FormGroup;
  public vacunado: Vacunado;

  constructor(
    private router: Router,
    private empleadoService: EmpleadosService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private vacunadosService: VacunadosService
  ) { 
    this.usuario = usuarioService.usuario;
    this.vacunado = new Vacunado('','','','','','',new Date(),null,null,null,null,'EPS PERSONAL',null,false,'');
  }

  ngOnInit(): void {
    this.cargarListadoModelosEstado();
    this.primDosisForm = this.fb.group({
      empleado: [this.vacunado.empleado, Validators.required],
      usuarioNombre: [this.usuario.nombre],
      regulador: [this.vacunado.regulador],
      fechaPriDosis: [this.vacunado.fechaPriDosis],
      farmaPriDosis: [this.vacunado.farmaPriDosis],
      sintomatologia: [this.vacunado.sintomatologia]
    });
  }

  cargarListadoModelosEstado() {
    const estado : string = 'true';
    this.empleadoService.cargarEmpleadosFiltroEstado(estado).subscribe(({empleados}) => {
      this.empleadosList = empleados;
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
