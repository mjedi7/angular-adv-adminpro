import { Component, OnInit } from '@angular/core';

//Codigo modificado por que no funcionaba la importacion de variables desde JS
interface CustomWindow extends Window {
  customInitFunctions?: () => void;
}

declare const window: CustomWindow;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  ngOnInit(): void {
    //Codigo modificado por que no funcionaba la importacion de variables desde JS
    if (typeof window.customInitFunctions === 'function') {
      window.customInitFunctions();
    }
  }
}