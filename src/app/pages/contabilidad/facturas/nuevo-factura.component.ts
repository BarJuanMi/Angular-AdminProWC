import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sede } from 'src/app/models/sede.util.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TipoCompraFactura } from 'src/app/models/tipocomprafactura.model';
import { UtileslistService } from 'src/app/services/utileslist.service';
import { Factura } from '../../../models/factura.model';
import { FacturasService } from '../../../services/facturas.service';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-nuevo-factura',
  templateUrl: './nuevo-factura.component.html',
  styles: [
  ]
})
export class NuevoFacturaComponent implements OnInit {

  public sedesList: Sede [] = [];
  public tipoFacturasList: TipoCompraFactura[] = [];
  public usuariosRetribuibleList: Usuario[] = [];
  public facturaForm: FormGroup;
  public factura: Factura;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private utilitiesService: UtileslistService,
    private usuariosService: UsuarioService,
    private facturaService: FacturasService,
  ) { 
    this.factura = new Factura('',null,0,false,null,'',null,null,null,'',false,null,null,null,'',false,'','');
  }

  ngOnInit(): void {
    this.cargarListadoTipoFactura();
    this.cargarListadoSedes();
    this.cargarListadoUsuariosTipo();

    this.facturaForm = this.fb.group({
      montoFactura: [this.factura.montoFactura],
      sede: [this.factura.sede],
      tipoCompraFactura: [this.factura.tipoCompraFactura],
      vendedorFactura: [this.factura.vendedorFactura],
      fechaFactura: [this.factura.fechaFactura],
      grupoFacturas: [this.factura.grupoFacturas],
      retribuible: [this.factura.retribuible],
      usuarioRetribuible: [this.factura.usuarioRetribuible],
      observaciones: [this.factura.observaciones]
    })
  }


  cargarListadoSedes() {
    this.utilitiesService.cargarSedesList().subscribe(({sedes}) => {
      this.sedesList = sedes;
    })
  }

  cargarListadoTipoFactura() {
    this.utilitiesService.cargarTipoFacturas().subscribe(({tipoFacturas}) => {
      this.tipoFacturasList = tipoFacturas;
    });
  }

  cargarListadoUsuariosTipo() {
    this.usuariosService.cargarUsuariosFilter('role','ADMIN_ROLE').subscribe(({usuarios}) => {
      console.log(JSON.stringify(usuarios));
      this.usuariosRetribuibleList = usuarios;
    });
  }

  crearNuevoFactura() {
    this.facturaService.crearFactura( this.facturaForm.value )
      .subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/facturas');

        Swal.fire('Guardado', 'Factura Creada Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
