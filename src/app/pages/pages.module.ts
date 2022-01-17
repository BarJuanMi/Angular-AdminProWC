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
import { PrestamosComponent } from './admin/prestamos/prestamos.component';
import { NuevoPrestamoComponent } from './admin/prestamos/nuevo-prestamo.component';
import { RetirosComponent } from './gest-documental/retiros/retiros.component';
import { NuevoRetiroComponent } from './gest-documental/retiros/nuevo-retiro.component';
import { ActualizaRetiroComponent } from './gest-documental/retiros/actualiza-retiro.component';
import { NuevoUsuarioComponent } from './mantenimientos/usuarios/nuevo-usuario.component';
import { ActualizarUsuarioComponent } from './mantenimientos/usuarios/actualizar-usuario.component';
import { VacunasCodiv19Component } from './admin/vacunas-codiv19/vacunas-codiv19.component';
import { NuevoRegVacunaComponent } from './admin/vacunas-codiv19/nuevo-reg-vacuna.component';
import { ActualizaRegVacunaComponent } from './admin/vacunas-codiv19/actualiza-reg-vacuna.component';
import { AdmonswcComponent } from './personalrrhh/admonswc/admonswc.component';
import { AspirantesComponent } from './personalrrhh/aspirantes/aspirantes.component';
import { EmpleadosComponent } from './personalrrhh/empleados/empleados.component';
import { NuevoEmpleadoComponent } from './personalrrhh/empleados/nuevo-empleado.component';
import { ActualizaEmpleadoComponent } from './personalrrhh/empleados/actualiza-empleado.component';
import { NuevoAspiranteComponent } from './personalrrhh/aspirantes/nuevo-aspirante.component';
import { UploadDocsAspiranteComponent } from './personalrrhh/aspirantes/upload-docs-aspirante.component';

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
    ActualizaRetiroComponent,
    NuevoUsuarioComponent,
    ActualizarUsuarioComponent,
    VacunasCodiv19Component,
    NuevoRegVacunaComponent,
    ActualizaRegVacunaComponent,
    AdmonswcComponent,
    AspirantesComponent,
    EmpleadosComponent,
    NuevoEmpleadoComponent,
    ActualizaEmpleadoComponent,
    NuevoAspiranteComponent,
    UploadDocsAspiranteComponent
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
