import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuAdmin: any[] = [
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
        {titulo: 'Memorandos', url: '/dashboard/memorandos'},
        {titulo: 'Contratos', url: '/dashboard/contratos'},
        {titulo: 'Retiros', url: '/dashboard/retiros'},
        {titulo: 'Ausentismos', url: '/dashboard/ausentismos'},
      ]
    },
    {
      titulo: 'Contabilidad',
      icono: 'mdi mdi-server',
      submenu: [
        {titulo: 'Facturas', url: '/dashboard/facturas'},
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
        {titulo: 'PQRS e Incidentes', url: '/dashboard/pqrsi'},
        {titulo: 'Prestamos o adelantos', url: '/dashboard/prestamos'},
        {titulo: 'Personal vacunados', url: '/dashboard/vacunados'},
        {titulo: 'Servicios de lavanderia', url: '/dashboard/servsLavanderia'},
      ]
    },
  ]

  menuUserApp: any[] = [
    {
      titulo: 'Proc. Internos',
      icono: 'mdi mdi-server',
      submenu: [
        {titulo: 'PQRS e Incidentes ', url: '/dashboard/pqrsi'},
        {titulo: 'Servicios de lavanderia', url: '/dashboard/servsLavanderia'},
      ]
    }
  ]

  constructor() { }
}
