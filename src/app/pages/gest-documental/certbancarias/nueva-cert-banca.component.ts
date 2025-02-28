import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from '../../../models/empleado.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { CertificacionBancaria } from 'src/app/models/certbancaria.model';
import { CertbancariasService } from 'src/app/services/certbancarias.service';
import { UtileslistService } from 'src/app/services/utileslist.service';
import { EntBancaria } from 'src/app/models/entbancaria.model';
import { TipoCuentaBanca } from 'src/app/models/tipocuentabanca.model';

@Component({
  selector: 'app-nueva-cert-banca',
  templateUrl: './nueva-cert-banca.component.html',
  styles: [
  ]
})
export class NuevaCertBancaComponent implements OnInit {

  public empleadosList: Empleado[] = [];
  public entBancariasList: EntBancaria[] = [];
  public tipocuentabancasList: TipoCuentaBanca[] = [];
  public certBancaForm: FormGroup;
  public certBanca: CertificacionBancaria;
  public usuario: Usuario;

  constructor(private router: Router,
    private empleadoService: EmpleadosService,
    private utilitiesService: UtileslistService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private certBancariasService: CertbancariasService) {
    this.usuario = usuarioService.usuario;
    this.certBanca = new CertificacionBancaria('','',null,null,'',null,null,null,null,null,'',false,'','');
  }

  ngOnInit(): void {
    this.cargarListadoEmpleadosEstado();
    this.cargarListadoEntBancarias();
    this.cargarListadoTipoCuentaBanca();
    this.certBancaForm = this.fb.group({
      empleado: [this.certBanca.empleado, Validators.required],
      emisorCuentaBanco: [this.certBanca.emisorCuentaBanco],
      numCuentaBanco: [this.certBanca.numCuentaBanco],
      tipoCuentaBanco: [this.certBanca.tipoCuentaBanco],
      usuarioNombre: [this.usuario.nombre],
    });
  }

  cargarListadoEmpleadosEstado() {
    const estado: string = 'true';
    this.empleadoService.cargarEmpleadosFiltroEstado(estado).subscribe(({ empleados }) => {
      this.empleadosList = empleados;
    });
  }

  cargarListadoEntBancarias() {
    this.utilitiesService.cargarEntBancarias().subscribe(({ entbancarias }) => {
      this.entBancariasList = entbancarias;
    });
  }

  cargarListadoTipoCuentaBanca() {
    this.utilitiesService.cargarTipoCuentaBancarias().subscribe(({ tipocuentabancas }) => {
      this.tipocuentabancasList = tipocuentabancas;
    });
  }  

  crearNuevaCertBancario() {
    this.certBancariasService.crearNuevaCertificacion(this.certBancaForm.value)
      .subscribe(resp => {

        var msg = resp['msg'];
        var status: boolean = resp['status'];

        if (status) {
          this.router.navigateByUrl('/dashboard/certbancarias');
          Swal.fire('Guardado', `${msg}`, 'success');

        } else {
          Swal.fire('Error', `${msg}`, 'error');
        }
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}    