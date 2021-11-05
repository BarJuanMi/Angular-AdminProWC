import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { ModeloswcComponent } from './personalrrhh/modeloswc/modeloswc.component';
import { NuevaModeloComponent } from './personalrrhh/modeloswc/nueva-modelo.component';
import { ActualizaModeloComponent } from './personalrrhh/modeloswc/actualiza-modelo.component';
import { MonitoreswcComponent } from './personalrrhh/monitoreswc/monitoreswc.component';
import { NuevoMonitorComponent } from './personalrrhh/monitoreswc/nuevo-monitor.component';
import { ActualizaMonitorComponent } from './personalrrhh/monitoreswc/actualiza-monitor.component';
import { PrestamosComponent } from './admin/prestamos/prestamos.component';
import { NuevoPrestamoComponent } from './admin/prestamos/nuevo-prestamo.component';
import { RetirosComponent } from './admin/retiros/retiros.component';
import { NuevoRetiroComponent } from './admin/retiros/nuevo-retiro.component';
import { ActualizaRetiroComponent } from './admin/retiros/actualiza-retiro.component';
import { NuevoUsuarioComponent } from './mantenimientos/usuarios/nuevo-usuario.component';
import { ActualizarUsuarioComponent } from './mantenimientos/usuarios/actualizar-usuario.component';
import { VacunasCodiv19Component } from './admin/vacunas-codiv19/vacunas-codiv19.component';
import { NuevoRegVacunaComponent } from './admin/vacunas-codiv19/nuevo-reg-vacuna.component';
import { ActualizaRegVacunaComponent } from './admin/vacunas-codiv19/actualiza-reg-vacuna.component';
import { AdmonswcComponent } from './personalrrhh/admonswc/admonswc.component';
import { NuevoAdmonComponent } from './personalrrhh/admonswc/nuevo-admon.component';
import { ActualizaAdmonComponent } from './personalrrhh/admonswc/actualiza-admon.component';

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
    NuevaModeloComponent,
    ActualizaModeloComponent,
    MonitoreswcComponent,
    NuevoMonitorComponent,
    ActualizaMonitorComponent,
    PrestamosComponent,
    NuevoPrestamoComponent,
    RetirosComponent,
    NuevoRetiroComponent,
    ActualizaRetiroComponent,
    NuevoUsuarioComponent,
    ActualizarUsuarioComponent,
    VacunasCodiv19Component,
    NuevoRegVacunaComponent,
    ActualizaRegVacunaComponent,
    AdmonswcComponent,
    NuevoAdmonComponent,
    ActualizaAdmonComponent
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
