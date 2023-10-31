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
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro : FormGroup;

  constructor(public fb: FormBuilder,
    public alertController : AlertController,
    private router: Router // Inyecta el router
    ) {
    this.formularioRegistro = this.fb.group({
      'email' : new FormControl("", Validators.required),
      'password' : new FormControl("", Validators.required),
      'passwordconfi' : new FormControl("", Validators.required),
    })

  }

  ngOnInit() {
  }

  async registrar() {
    var f = this.formularioRegistro.value;
    console.log('Valores del formulario:', f);

    if (this.formularioRegistro.invalid) {
      console.log('Formulario inválido'); // Agrega este console.log para verificar si el formulario se considera inválido
      const alert = await this.alertController.create({
        header: 'Error en Datos ingresados',
        message: 'No completaste el formulario correctamente',
        buttons: ['OK']
      });
      await alert.present();
      return;
    } else {
      console.log('Formulario completado con éxito');
      // Aquí puedes realizar la acción de registro si todos los datos son válidos.
      var usuario = {
        email: f.email,
        password: f.password
      }
      localStorage.setItem('usuarios',JSON.stringify(usuario));
      const alert = await this.alertController.create({
        header: 'Exito',
        message: 'Completaste el formulario correctamente',
        buttons: ['OK']
      });
      await alert.present();
      // return;
      this.router.navigate(['/login']);

    }
  }

  irAlInicio() {
    this.router.navigate(['inicio']);
  }

  }
