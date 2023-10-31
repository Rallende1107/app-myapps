import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
}  from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin : FormGroup;


  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router // Inyecta el router
    ) {
    this.formularioLogin = this.fb.group({
      'email' : new FormControl("", Validators.required),
      'password' : new FormControl("", Validators.required),
    })

  }

  ngOnInit() {
  }

  async ingresar() {
    console.log('Ingreso 1 xD')

    var f = this.formularioLogin.value;

    var usuarioString = localStorage.getItem('usuarios'); // Cambia 'usuario' a 'usuarios'

    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);

      if (usuario.email == f.email && usuario.password == f.password) {
        console.log('credeciales validas')
        this.router.navigate(['/my-home']); // Asegúrate de que '/dashboard' coincida con la ruta correcta

      }
      else{

        console.log('credeciales invalidas')
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos ingresados no se encuentran registrados',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

    } else {
       const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos ingresados no se encuentran registrados',
          buttons: ['OK']
        });
        await alert.present();
        return;
      console.log('No se encontró un usuario en el almacenamiento local');
    }


}
navegar() {
  this.router.navigate(['login']);
}

irAlInicio() {
  this.router.navigate(['inicio']);
}

}
