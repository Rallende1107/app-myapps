import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-contrasenia',
  templateUrl: './cambio-contrasenia.page.html',
  styleUrls: ['./cambio-contrasenia.page.scss'],
})
export class CambioContraseniaPage implements OnInit {
  passwordActual: string = '';

  formularioContrasenia: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router // Inyecta el router
  ) {
    this.formularioContrasenia = this.fb.group({
      'oldPassword': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'passwordconfi': new FormControl("", Validators.required),
    })
  }

  ngOnInit() {
    this.obtenerPass(); // Llama a esta función para obtener la contraseña actual al cargar la página
  }

  async cambio() {
    var fc = this.formularioContrasenia.value;
    console.log('Valores del formulario:', fc);

    if (this.formularioContrasenia.invalid) {
      console.log('Formulario inválido');
      const alert = await this.alertController.create({
        header: 'Error en Datos ingresados',
        message: 'No completaste el formulario correctamente',
        buttons: ['OK']
      });
      await alert.present();
      return;
    } else {
      if (await this.validaPassActual()) { // Usa 'await' aquí para esperar la promesa
        if (fc.password != fc.passwordconfi) {
          console.log('No coinciden Passwords');
          const alert = await this.alertController.create({
            header: 'Contraseñas no coinciden',
            message: 'Las contraseñas no coinciden',
            buttons: ['OK']
          });
          await alert.present();
          return;
        } else {
          // Actualiza la contraseña almacenada en el almacenamiento local
          const usuarioString = localStorage.getItem('usuarios');

          if (usuarioString !== null) {
            const usuario = JSON.parse(usuarioString);
            usuario.password = fc.password; // Actualiza la contraseña
            localStorage.setItem('usuarios', JSON.stringify(usuario)); // Guarda los cambios
          }

          const alert = await this.alertController.create({
            header: 'Contraseña cambiada con éxito',
            message: 'La contraseña se ha actualizado correctamente',
            buttons: ['OK']
          });
          await alert.present();
          // Redirecciona a la página 'my-home' después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/my-home']);
          }, 1000);

          return;
        }
      }
    }
  }

  obtenerPass() {
    // Obtener la cadena JSON del usuario desde el localStorage
    const usuarioString = localStorage.getItem('usuarios');

    if (usuarioString !== null) {
      // Parsear la cadena JSON para obtener un objeto de usuario
      const usuario = JSON.parse(usuarioString);

      if (usuario.password) {
        // Si el campo 'password' existe en el objeto de usuario, asignarlo a 'passwordActual'
        console.log('Contraseña actual:', usuario.password);
        this.passwordActual = usuario.password;
      } else {
        console.log('No se encontró un campo "password" en la estructura de usuario');
      }
    } else {
      console.log('No se encontró ningún usuario en el almacenamiento local');
    }
  }

  async validaPassActual(): Promise<boolean> { // Devuelve una promesa booleana
    const passActual = this.passwordActual; // Obtener la contraseña actual
    var fc = this.formularioContrasenia.value;

    if (passActual === fc.oldPassword) {
      console.log('Contraseña actual correcta');
      return true; // La contraseña actual es correcta
    } else {
      console.log('Contraseña actual incorrecta');
      const alert = await this.alertController.create({
        header: 'Contraseña actual incorrecta',
        message: 'La contraseña actual no es válida',
        buttons: ['OK'],
      });
      await alert.present();
      return false; // La contraseña actual es incorrecta
    }
  }
}
