import { Component, OnDestroy } from '@angular/core';
import { retry, take, map, filter } from 'rxjs/operators'
import { tick } from '@angular/core/testing';
import { error } from 'console';
import { Observable, Subscription, UnsubscriptionError, interval } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})

export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() {

/*   this.retornaObservable().pipe(
    retry(1)
  ).subscribe(
  valor => console.log('Subs:', valor ),
  error => console.warn('Error:', error ),
  () => console.info('Obs terminado'),
  );
 */

  this.intervalSubs = this.retornaIntervalo()
  .subscribe( console.log )

  //this.retornaIntervalo().subscribe()
}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalSubs.unsubscribe();
  }


  retornaIntervalo(): Observable<number> {
    return interval(90)
          .pipe(
            take(50),
            map( valor => valor + 1 ),
            filter( valor => ( valor % 2 === 0 ) ? true: false)
          );
  }


  retornaObservable(): Observable<number> {

    const obs$ = new Observable<number>( observer => {
      let i = -1;

    const intervalo = setInterval(() => {
    
    i++;
    //console.log(tick);
    observer.next(i);

    if ( i ==12 ){
      clearInterval( intervalo );
      observer.complete();
    }

    if ( i ==2 ){
      observer.error('i llego al valor de 2');
    }    

  }, 1000);

  });

  return obs$;

  }

}