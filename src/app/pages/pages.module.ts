import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './ejemplos/progress/progress.component';
import { Grafica1Component } from './ejemplos/grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './ejemplos/promesas/promesas.component';
import { RxjsComponent } from './ejemplos/rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { ModeloswcComponent } from './personalrrhh/modeloswc/modeloswc.component';
import { MonitoreswcComponent } from './personalrrhh/monitoreswc/monitoreswc.component';
import { PrestamosComponent } from './procesos/prestamos/prestamos.component';
import { NuevoPrestamoComponent } from './procesos/prestamos/nuevo-prestamo.component';
import { RetirosComponent } from './gest-documental/retiros/retiros.component';
import { NuevoRetiroComponent } from './gest-documental/retiros/nuevo-retiro.component';
import { NuevoUsuarioComponent } from './mantenimientos/usuarios/nuevo-usuario.component';
import { ActualizarUsuarioComponent } from './mantenimientos/usuarios/actualizar-usuario.component';
import { VacunasCodiv19Component } from './procesos/vacunas-codiv19/vacunas-codiv19.component';
import { NuevoRegVacunaComponent } from './procesos/vacunas-codiv19/nuevo-reg-vacuna.component';
import { AdmonswcComponent } from './personalrrhh/admonswc/admonswc.component';
import { AspirantesComponent } from './personalrrhh/aspirantes/aspirantes.component';
import { EmpleadosComponent } from './personalrrhh/empleados/empleados.component';
import { NuevoEmpleadoComponent } from './personalrrhh/empleados/nuevo-empleado.component';
import { ActualizaEmpleadoComponent } from './personalrrhh/empleados/actualiza-empleado.component';
import { NuevoAspiranteComponent } from './personalrrhh/aspirantes/nuevo-aspirante.component';
import { UploadDocsAspiranteComponent } from './personalrrhh/aspirantes/upload-docs-aspirante.component';
import { ServLavanderiaComponent } from './procesos/serv-lavanderia/serv-lavanderia.component';
import { NuevoServLavanderiaComponent } from './procesos/serv-lavanderia/nuevo-serv-lavanderia.component';
import { PqrsComponent } from './procesos/pqrs/pqrs.component';
import { NuevoPqrsComponent } from './procesos/pqrs/nuevo-pqrs.component';
import { AusentismosComponent } from './gest-documental/ausentismos/ausentismos.component';
import { NuevoAusentismoComponent } from './gest-documental/ausentismos/nuevo-ausentismo.component';
import { ContratosComponent } from './gest-documental/contratos/contratos.component';
import { MemorandosComponent } from './gest-documental/memorandos/memorandos.component';
import { FacturasComponent } from './contabilidad/facturas/facturas.component';
import { NuevoMemorandoComponent } from './gest-documental/memorandos/nuevo-memorando.component';
import { NuevoContratoComponent } from './gest-documental/contratos/nuevo-contrato.component';
import { ApoyologisticoComponent } from './personalrrhh/apoyologistico/apoyologistico.component';
import { NuevoFacturaComponent } from './contabilidad/facturas/nuevo-factura.component';
import { CertbancariasComponent } from './gest-documental/certbancarias/certbancarias.component';
import { NuevaCertBancaComponent } from './gest-documental/certbancarias/nueva-cert-banca.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    ModeloswcComponent,
    MonitoreswcComponent,
    PrestamosComponent,
    NuevoPrestamoComponent,
    RetirosComponent,
    NuevoRetiroComponent,
    NuevoUsuarioComponent,
    ActualizarUsuarioComponent,
    VacunasCodiv19Component,
    NuevoRegVacunaComponent,
    AdmonswcComponent,
    AspirantesComponent,
    EmpleadosComponent,
    NuevoEmpleadoComponent,
    ActualizaEmpleadoComponent,
    NuevoAspiranteComponent,
    UploadDocsAspiranteComponent,
    ServLavanderiaComponent,
    NuevoServLavanderiaComponent,
    PqrsComponent,
    NuevoPqrsComponent,
    AusentismosComponent,
    NuevoAusentismoComponent,
    ContratosComponent,
    MemorandosComponent,
    FacturasComponent,
    NuevoMemorandoComponent,
    NuevoContratoComponent,
    ApoyologisticoComponent,
    NuevoFacturaComponent,
    CertbancariasComponent,
    NuevaCertBancaComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
