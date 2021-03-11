import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuario => {
      console.log(usuario);
    });
  }

  getUsuarios() {
    const promesa = new Promise( resolve => {

    // Promesa
    fetch('https://reqres.in/api/users')
      .then( resp => resp.json())
      .then( body => resolve (body.data) );
    });
    return promesa;
  }

}
