import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController  } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.page.html',
  styleUrls: ['./my-home.page.scss'],
})
export class MyHomePage implements OnInit {
  emailUsuario: string='';
  constructor(private menuController: MenuController, private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.hola()
  }

  hola() {

    console.log('Ingreso 1 xD');
    var usuarioString = localStorage.getItem('usuarios');

    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);

      if (usuario && usuario.email) {
        console.log(usuario.email);
        // this.emailUsuario = usuario.email;
        this.emailUsuario = this.limpiarEmail(usuario.email);
        // Aquí puedes acceder al email del usuario: usuario.email
      } else {
        console.log('No se encontró un email en la estructura de usuario');
      }
    } else {
      console.log('No se encontró ningún usuario en el almacenamiento local');
    }
  }
  limpiarEmail(email: string): string {
    const partes = email.split('@');
    if (partes.length > 1) {
      // Si se encontró el símbolo "@" en el email, retorna la parte antes de él
      return partes[0];
    } else {
      // Si no se encontró el símbolo "@", retorna el email sin cambios
      return email;
    }
  }

  async salir() {
    const alert = await this.alertController.create({
      header: 'Confirmar salida',
      message: '¿Está seguro de que desea salir? Se borrará el almacenamiento local.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario cancela, no hace nada
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            // El usuario confirma, borra el contenido del localStorage
            localStorage.clear();

            // Redirige al inicio (reemplaza 'my-home' con la ruta de tu página de inicio)
            this.router.navigate(['/inicio']);
          },
        },
      ],
    });

    await alert.present();
  }
}


