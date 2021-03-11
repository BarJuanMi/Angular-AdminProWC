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
        {titulo: 'ProgessBar...', url: '/dashboard/progress'},
        {titulo: 'Graficas...', url: '/dashboard/grafica1'},
        {titulo: 'Promesas...', url: '/dashboard/promesas'}
      ]
    },
    {
      titulo: 'Personal...',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Hoja Vida...', url: '/'},
        {titulo: 'Memorandos...', url: '/dashboard/progress'},
        {titulo: 'Calificacion...', url: '/dashboard/grafica1'},
        {titulo: 'Reportes...', url: '/dashboard/grafica1'}
      ]
    }
  ]

  constructor() { }
}
