import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
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

const routes: Routes = [
    {  
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            {path: '', component: DashboardComponent, data: {titulo: 'DashBoard'}},
            {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
            {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica1'}},
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes'}},
            {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'}},
            {path: 'profile', component: ProfileComponent, data: {titulo: 'My Profile'}},

            // Mantenimientos Usuarios
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios de aplicación'}},
            {path: 'nuevoUsuario', component: NuevoUsuarioComponent, data: {titulo: 'Creación de Nuevo Usuario'} },
            {path: 'actualizarUsuario/:id', component: ActualizarUsuarioComponent, data: {titulo: 'Actualización Datos de Usuario'} },

            {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Manejo de Hospitales'}},
            {path: 'medicos', component: MedicosComponent, data: {titulo: 'Manejo de Medicos'}},

            //WebCam Modelos
            {path: 'modelos', component: ModeloswcComponent, data: {titulo: 'Administración de Modelos'}},
            {path: 'nuevaModelo', component: NuevaModeloComponent, data: {titulo: 'Creación de Nueva Modelo'} },
            {path: 'actualizarModelo/:id', component: ActualizaModeloComponent, data: {titulo: 'Actualización Datos de Modelo'} },

            //WebCam Monitores
            {path: 'monitores', component: MonitoreswcComponent, data: {titulo: 'Administración de Monitores'}},
            {path: 'nuevoMonitor', component: NuevoMonitorComponent, data: {titulo: 'Creación de Nueva Monitor'} },
            {path: 'actualizarMonitor/:id', component: ActualizaMonitorComponent, data: {titulo: 'Actualización Datos de Monitor'} },

            //WebCam Administrativos
            {path: 'administrativos', component: AdmonswcComponent, data: {titulo: 'Administración de Empleados Administrativos'}},
            {path: 'nuevoAdmon', component: NuevoAdmonComponent, data: {titulo: 'Creación de Nuevo Empleado Administrativo'} },

            //WebCam Prestamos
            {path: 'prestamos', component: PrestamosComponent, data: {titulo: 'Administración de Prestamos a Modelos'}},
            {path: 'nuevoPrestamo', component: NuevoPrestamoComponent, data: {titulo: 'Creación de Nuevo Prestamo'} },

            //WebCam Retiros
            {path: 'retiros', component: RetirosComponent, data: {titulo: 'Administración de Retiros de Modelos'}},
            {path: 'nuevoRetiro', component: NuevoRetiroComponent, data: {titulo: 'Creación de Nuevo Retiro'} },
            {path: 'actualizaRetiro/:id', component: ActualizaRetiroComponent, data: {titulo: 'Actualización Datos de Retiro'} },

            //WebCam Vacunas
            {path: 'vacunados', component: VacunasCodiv19Component, data: {titulo: 'Administración de Registros de vacunas para personal'}},
            {path: 'nuevoRegVacunado', component: NuevoRegVacunaComponent, data: {titulo: 'Creación de Nuevo Registro de Vacuna para empleado'} },
            {path: 'actualizaRegVacunado/:id', component: ActualizaRegVacunaComponent, data: {titulo: 'Actualización de Registro de Vacuna para empleado'} },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
