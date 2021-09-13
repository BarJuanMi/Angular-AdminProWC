import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard...',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main...', url: '/'},
        {titulo: 'ProgessBar...', url: 'progress'},
        {titulo: 'Graficas...', url: 'grafica1'},
        {titulo: 'Promesas...', url: 'promesas'},
        {titulo: 'RXJS...', url: 'rxjs'}
      ]
    },
    {
      titulo: 'Documentos',
      icono: 'mdi mdi-file-document',
      submenu: [
        {titulo: 'Hoja Vida...', url: '/'},
        {titulo: 'Memorandos...', url: '/dashboard/progress'},
        {titulo: 'Calificacion...', url: '/dashboard/grafica1'},
        {titulo: 'Reportes...', url: '/dashboard/grafica1'}
      ]
    },
    {
      titulo: 'Personal',
      icono: 'mdi mdi-file-document',
      submenu: [
        {titulo: 'Modelos', url: '/dashboard/modelos'},
        {titulo: 'Monitores', url: '/dashboard/monitores'},
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: 'usuarios'},  //Relacione las rutas con pages.routing.ts
        {titulo: 'Hospitales', url: 'hospitales'},
        {titulo: 'Medicos', url: 'medicos'},
      ]
    },
    {
      titulo: 'Administrativos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Prestamos a modelos', url: 'prestamos'},  //Relacione las rutas con pages.routing.ts
        {titulo: 'Retiros de modelos', url: 'retiros'},  //Relacione las rutas con pages.routing.ts
      ]
    },
  ]

  constructor() { }
}
