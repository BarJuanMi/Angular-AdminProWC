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

            // Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios de aplicación'}},
            {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Manejo de Hospitales'}},
            {path: 'medicos', component: MedicosComponent, data: {titulo: 'Manejo de Medicos'}}

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
