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
import { NuevoUsuarioComponent } from './mantenimientos/usuarios/nuevo-usuario.component';
import { ActualizarUsuarioComponent } from './mantenimientos/usuarios/actualizar-usuario.component';

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

            //WebCam Prestamos
            {path: 'prestamos', component: PrestamosComponent, data: {titulo: 'Administración de Prestamos a Modelos'}},
            {path: 'nuevoPrestamo', component: NuevoPrestamoComponent, data: {titulo: 'Creación de Nuevo Prestamo'} },

            //WebCam Retiros
            {path: 'retiros', component: RetirosComponent, data: {titulo: 'Administración de Retiros de Modelos'}},
            {path: 'nuevoRetiro', component: NuevoRetiroComponent, data: {titulo: 'Creación de Nuevo Retiro'} },
            {path: 'actualizaRetiro/:id', component: ActualizaRetiroComponent, data: {titulo: 'Actualización Datos de Retiro'} },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
