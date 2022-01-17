import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Ejemplos...',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main...', url: '/'},
        //{titulo: 'ProgessBar...', url: 'progress'},
        {titulo: 'Graficas...', url: 'grafica1'},
        //{titulo: 'Promesas...', url: 'promesas'},
        //{titulo: 'RXJS...', url: 'rxjs'}
      ]
    },
    {
      titulo: 'Gest. Documental',
      icono: 'mdi mdi-library-books',
      submenu: [
        {titulo: 'Memorandos a empleados', url: '/'},
        {titulo: 'Retiros de empleados', url: '/dashboard/retiros'},
      ]
    },
    {
      titulo: 'Personal RRHH',
      icono: 'mdi mdi-account-circle',
      submenu: [
        {titulo: 'Aspirantes', url: '/dashboard/aspirantes'},
        {titulo: 'Modelos', url: '/dashboard/modelos'},
        {titulo: 'Monitores', url: '/dashboard/monitores'},
        {titulo: 'Administrativos', url: '/dashboard/administrativos'},
      ]
    },
    {
      titulo: 'Accesos APP',
      icono: 'mdi mdi-settings',
      submenu: [
        {titulo: 'Usuarios', url: 'usuarios'},  //Relacione las rutas con pages.routing.ts
        //{titulo: 'Hospitales', url: 'hospitales'},
        //{titulo: 'Medicos', url: 'medicos'},
      ]
    },
    {
      titulo: 'Proc. Internos',
      icono: 'mdi mdi-server',
      submenu: [
        {titulo: 'Prestamos o adelantos a empleados', url: '/dashboard/prestamos'},
        {titulo: 'Registros de personal vacunados', url: '/dashboard/vacunados'},
        {titulo: 'Servicios de lavanderia a modelos', url: '/dashboard/servsLavanderia'}
      ]
    },
  ]

  constructor() { }
}
