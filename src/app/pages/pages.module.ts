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
import { ModeloswcComponent } from './modeloswc/modeloswc.component';
import { NuevaModeloComponent } from './modeloswc/nueva-modelo.component';
import { ActualizaModeloComponent } from './modeloswc/actualiza-modelo.component';
import { MonitoreswcComponent } from './monitoreswc/monitoreswc.component';
import { NuevoMonitorComponent } from './monitoreswc/nuevo-monitor.component';
import { ActualizaMonitorComponent } from './monitoreswc/actualiza-monitor.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { NuevoPrestamoComponent } from './prestamos/nuevo-prestamo.component';
import { RetirosComponent } from './retiros/retiros.component';
import { NuevoRetiroComponent } from './retiros/nuevo-retiro.component';
import { ActualizaRetiroComponent } from './retiros/actualiza-retiro.component';

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
    ActualizaRetiroComponent
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
