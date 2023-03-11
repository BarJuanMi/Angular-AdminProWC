import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './ejemplos/progress/progress.component';
import { Grafica1Component } from './ejemplos/grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './ejemplos/promesas/promesas.component';
import { RxjsComponent } from './ejemplos/rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
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
import { ActualizaRetiroComponent } from './gest-documental/retiros/actualiza-retiro.component';
import { NuevoUsuarioComponent } from './mantenimientos/usuarios/nuevo-usuario.component';
import { ActualizarUsuarioComponent } from './mantenimientos/usuarios/actualizar-usuario.component';
import { VacunasCodiv19Component } from './procesos/vacunas-codiv19/vacunas-codiv19.component';
import { NuevoRegVacunaComponent } from './procesos/vacunas-codiv19/nuevo-reg-vacuna.component';
import { AdmonswcComponent } from './personalrrhh/admonswc/admonswc.component';
import { AspirantesComponent } from './personalrrhh/aspirantes/aspirantes.component';
import { NuevoEmpleadoComponent } from './personalrrhh/empleados/nuevo-empleado.component';
import { ActualizaEmpleadoComponent } from './personalrrhh/empleados/actualiza-empleado.component';
import { NuevoAspiranteComponent } from './personalrrhh/aspirantes/nuevo-aspirante.component';
import { UploadDocsAspiranteComponent } from './personalrrhh/aspirantes/upload-docs-aspirante.component';
import { ServLavanderiaComponent } from './procesos/serv-lavanderia/serv-lavanderia.component';
import { NuevoServLavanderiaComponent } from './procesos/serv-lavanderia/nuevo-serv-lavanderia.component';
import { NuevoPqrsComponent } from './procesos/pqrs/nuevo-pqrs.component';
import { PqrsComponent } from './procesos/pqrs/pqrs.component';
import { AusentismosComponent } from './gest-documental/ausentismos/ausentismos.component';
import { NuevoAusentismoComponent } from './gest-documental/ausentismos/nuevo-ausentismo.component';
import { FacturasComponent } from './contabilidad/facturas/facturas.component';
import { MemorandosComponent } from './gest-documental/memorandos/memorandos.component';
import { ContratosComponent } from './gest-documental/contratos/contratos.component';
import { NuevoMemorandoComponent } from './gest-documental/memorandos/nuevo-memorando.component';

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
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios de aplicación'} },
            {path: 'nuevoUsuario', component: NuevoUsuarioComponent, data: {titulo: 'Creación de Nuevo Usuario'} },
            {path: 'actualizarUsuario/:id', component: ActualizarUsuarioComponent, data: {titulo: 'Actualización Datos de Usuario'} },

            {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Manejo de Hospitales'} },
            {path: 'medicos', component: MedicosComponent, data: {titulo: 'Manejo de Medicos'} },

            //WebCam Empleados
            {path: 'nuevoEmpleado/:tipo', component: NuevoEmpleadoComponent, data: {titulo: 'Creación de nuevo empleado'} },
            {path: 'actualizarEmpleado/:tipo/:id', component: ActualizaEmpleadoComponent, data: {titulo: 'Actualización de datos de Empleado'} },

            //WebCam Modelos - Monitores - Administrativos - Aspirantes
            {path: 'aspirantes', component: AspirantesComponent, data: {titulo: 'Administración de Aspirantes'} },
            {path: 'modelos', component: ModeloswcComponent, data: {titulo: 'Administración de Modelos'} },
            {path: 'monitores', component: MonitoreswcComponent, data: {titulo: 'Administración de Monitores'} },
            {path: 'administrativos', component: AdmonswcComponent, data: {titulo: 'Administración de Empleados Administrativos'} },

            //WebCam Aspirantes
            {path: 'nuevoAspirante', component: NuevoAspiranteComponent, data: {titulo: 'Creación de Nuevo Aspirante'} },
            {path: 'uploadDocsApirante/:id', component: UploadDocsAspiranteComponent, data: {titulo: 'Cargue de documentos relacionados al aspirante'}},

            //WebCam Prestamos
            {path: 'prestamos', component: PrestamosComponent, data: {titulo: 'Administración de Prestamos para empleados'}},
            {path: 'nuevoPrestamo', component: NuevoPrestamoComponent, data: {titulo: 'Creación de Nuevo Prestamo'} },

            //WebCam Retiros
            {path: 'retiros', component: RetirosComponent, data: {titulo: 'Administración de Retiros de empleados'}},
            {path: 'nuevoRetiro', component: NuevoRetiroComponent, data: {titulo: 'Creación de Nuevo Retiro'}},
            {path: 'actualizaRetiro/:id', component: ActualizaRetiroComponent, data: {titulo: 'Actualización Datos de Retiro'}},

            //WebCam Vacunas
            {path: 'vacunados', component: VacunasCodiv19Component, data: {titulo: 'Administración de Registros de vacunas para empleados'}},
            {path: 'nuevoRegVacuna', component: NuevoRegVacunaComponent, data: {titulo: 'Creación de Nuevo Registro de Vacuna para empleado'}},

            //WebCam ServLavanderia
            {path: 'servsLavanderia', component: ServLavanderiaComponent, data: {titulo: 'Registros de servicios de lavanderia para sedes'}},
            {path: 'nuevoServLavan', component: NuevoServLavanderiaComponent, data: {titulo: 'Creacion de Nuevo de Servicio de Lavanderia'}},

            //WebCam PQRS
            {path: 'pqrsi', component: PqrsComponent, data: {titulo: 'Administración de PQRS o Incidentes'}},
            {path: 'nuevoPQRS', component: NuevoPqrsComponent, data: {titulo: 'Creacion de Nuevo PQRS o Incidente'}},

            //WebCam Ausentismos
            {path: 'ausentismos', component: AusentismosComponent, data: {titulo: 'Administración de Ausentismos y Permisos Temporales'}},
            {path: 'nuevoAusentismo', component: NuevoAusentismoComponent, data: {titulo: 'Creacion de Nuevo Registro de Ausentimo Temporal'}},

            //WebCam Facturas
            {path: 'facturas', component: FacturasComponent, data: {titulo: 'Administración de Facturas Internas del Estudio'}},

            //WebCam Memorandos
            {path: 'memorandos', component: MemorandosComponent, data: {titulo: 'Administración de Memorandos para el Personal'}},
            {path: 'nuevoMemorando', component: NuevoMemorandoComponent, data: {titulo: 'Creacion de Nuevo Registro de Memorando'}},

            //WebCam Contratos
            {path: 'contratos', component: ContratosComponent, data: {titulo: 'Administración de Contratos con el Personal'}},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
