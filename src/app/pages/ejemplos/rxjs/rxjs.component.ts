import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit {

  constructor() { 

    let i = -1;
    const obs$ = new Observable( observer => {

      // Ejecuta de manera indefinida cada segundo
      // hasta cuando i sea 10
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        if( i === 10 ) {
          clearInterval (intervalo );
          observer.complete();
        }

        if(i === 5){
          i = 0;
          observer.error('i llego al valor de 5');
        }
      }, 1000);
    });

    obs$
    .pipe(retry(1))
    .subscribe(
      valor => console.log('Subs:' , valor),
      (error) => console.warn('Error:', error) ,
      () => console.info('Obs Terminado')
    );

  }

  ngOnInit(): void {
  }

}
