import { Component } from '@angular/core';
import { ActivationEnd, Router} from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})

export class BreadcrumbsComponent {
  public titulo: string = '';   // ← inicializado

  constructor(private router: Router) {
    this.getArgumentosRuta();
  }

  getArgumentosRuta(){
    this.router.events
    .pipe(
      //En esta parte se juntaron los filter, porque marcaba error con ActivationEnd
      filter((e): e is ActivationEnd => e instanceof ActivationEnd && e.snapshot.firstChild === null),
      map(e => e.snapshot.data)
    )
    .subscribe((data: any) => {
      this.titulo = data.titulo;
      //document.title = data.titulo;
      document.title = `AdminPro - ${ data.titulo }`;
      console.log(this.titulo);
    });
  }

}