import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'menu',
    templateUrl: './menu.componente.html',
    styleUrls: ['./menu.componente.css']
})
export class MenuComponent {

    constructor(private router: Router) { }

    perfil(){

    }

    salir(){
        this.router.navigate(['/login']);
    }

}