import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtileslistService } from '../../../services/utileslist.service';
import Swal from 'sweetalert2';
import { Ciudad } from '../../../models/ciudad.util.model';
import { Pais } from '../../../models/pais.util.model';
import { Empleado } from '../../../models/empleado.model';
import { EmpleadosService } from '../../../services/empleados.service';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styles: [
  ]
})
export class NuevoEmpleadoComponent implements OnInit {

  public ciudadesList: Ciudad[] = [];
  public paisesList: Pais[] = [];
  public empleadoWCForm: FormGroup;
  public empleado: Empleado;
  public tipoEmpleCrear: String;
  public labelTitle: string = ' del nuevo';

  constructor(private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private empleadosService: EmpleadosService,
              private utilesListService: UtileslistService) 
  {
    activatedRoute.params.subscribe( params => {
      this.tipoEmpleCrear = params['tipo'];
      if (String(this.tipoEmpleCrear).toLowerCase() === 'Modelo')
        this.labelTitle = ' de la nueva';
    });

    this.empleado = new Empleado('','','','','','','',null,null,'','','','','','',null,false,'',null,null,null,'','',null,'','','',null,'');
  }

  ngOnInit(): void {
    this.cargarListadoCiudades();
    this.cargarListadoPaises();

    this.empleadoWCForm = this.fb.group({
      documento: [this.empleado.documento ],
      tipoDocumento: [this.empleado.tipoDocumento],
      nombres: [this.empleado.nombres ],
      apellidos: [this.empleado.apellidos ],
      genero: [this.empleado.genero],
      fechaNac: [this.empleado.fechaNac],
      emailCorporativo: [this.empleado.emailCorporativo],
      telCelular: [this.empleado.telCelular],
      direccion: [this.empleado.direccion], 
      rh: [this.empleado.rh],
      nomContEmer: [this.empleado.nomContEmer],
      telContEmer: [this.empleado.telContEmer],
      fechaIngreso: [this.empleado.fechaIngreso],
      numHijos: [this.empleado.numHijos],
      entidadBanco: [this.empleado.entidadBanco],
      numCuentaBanco: [this.empleado.numCuentaBanco],
      nacionalidad: [this.empleado.nacionalidad],
      ciudadResidencia: [this.empleado.ciudadResidencia],
      epsSalud: [this.empleado.epsSalud],
      arlTrabajo: [this.empleado.arlTrabajo]
    });
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
   * 
   */
  crearNuevoEmpleado() {
    this.empleadosService.crearEmpleadoxTipo( this.empleadoWCForm.value, this.tipoEmpleCrear )
      .subscribe( resp => {
        if (this.tipoEmpleCrear === 'Modelo') {
          this.router.navigateByUrl('/dashboard/modelos');
        } else if(this.tipoEmpleCrear === 'Monitor'){
          this.router.navigateByUrl('/dashboard/monitores');
        } else if(this.tipoEmpleCrear === 'Administrativo') {
          this.router.navigateByUrl('/dashboard/administrativos');
        } else{
          this.router.navigateByUrl('/dashboard/');
        }
        
        Swal.fire('Guardado', 'Empleado ' + this.tipoEmpleCrear + ' Creado Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
