import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public usuarioLogged: Usuario;

  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService) { 
    
    this.usuarioLogged = usuarioService.usuario;

    if ( this.usuarioLogged.role != 'ADMIN_ROLE' && this.usuarioLogged.role != 'GOD_ROLE') {
      this.menuItems = sidebarService.menuUserApp; 
    } else {
      this.menuItems = sidebarService.menuAdmin;
    }
  }

  ngOnInit(): void {
  }

}
