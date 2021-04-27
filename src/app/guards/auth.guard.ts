import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor ( private UsuarioService: UsuarioService ) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.UsuarioService.validarToken();
  }
  
}
