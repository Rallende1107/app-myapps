import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.page.html',
  styleUrls: ['./my-home.page.scss'],
})
export class MyHomePage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }
  toggleMenu(){
    console.log('desplegar menu');
    this.menuController.toggle(); // Abre o cierra el menú desplegable
  }
}
