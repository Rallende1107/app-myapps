import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = 'Felipe';
  mdl_contrasena: string = '1234';

  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegar() {
    if(this.mdl_usuario =="Felipe" && this.mdl_contrasena == "1234")  {

      let parametros: NavigationExtras ={
        state: {
          user:this.mdl_usuario,
          pass: this.mdl_contrasena
        }
      }

    this.router.navigate(['principal'], parametros);
  } else {
    this.isAlertOpen = true;
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
