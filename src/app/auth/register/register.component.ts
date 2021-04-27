import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(10) ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['',  Validators.required ],
    password2: ['', Validators.required ],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) { }
  
  /**
   * 
   * @returns 
   */
  crearUsuario() {
    this.formSubmitted = true;
    //console.log(this.registerForm.value);

    if( this.registerForm.invalid ) {
      return;
    }

    //Realizar el post al service
    this.usuarioService.crearUsuario (this.registerForm.value )
        .subscribe( resp => {

          // Navegar al dashboard
          this.router.navigateByUrl('/');
          
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }
  
  /**
   * 
   * @param campo 
   * @returns 
   */
  campoNoValido( campo: string ): boolean {
    if ( this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else{
      return false;
    }
  }
  
  /**
   * 
   * @returns 
   */
  contrasenasValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }
  
  /**
   * 
   * @returns 
   */
  aceptaTerminos( ) {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }
  
  /**
   * 
   * @param pass1Name 
   * @param pass2Name 
   * @returns 
   */
  passwordsIguales(pass1Name: string, pass2Name: string)  {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noesIgual: true})
      }
    }
  }

}
