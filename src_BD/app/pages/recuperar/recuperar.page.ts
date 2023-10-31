import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuarioIngresado: boolean = false;
  nombreUsuario: string = '';
  nuevaContrasena: string = '';
  confirmarNuevaContrasena: string = '';

  isAlertOpen: boolean = false;
  alertHeader: string = '';
  alertMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() { }

  mostrarAlerta(header: string, message: string) {
    this.isAlertOpen = true;
    this.alertHeader = header;
    this.alertMessage = message;
  }

  recuperarContrasena() {
    if (this.usuarioIngresado) {
      if (this.nombreUsuario === '' || this.nuevaContrasena === '' || this.confirmarNuevaContrasena === '') {
        this.mostrarAlerta('Campos incompletos', 'Por favor, complete todos los campos.');
        console.log('Por favor, complete todos los campos.');
        return;
      }

      if (this.nuevaContrasena === this.confirmarNuevaContrasena) {
        this.mostrarAlerta('Contraseñas no coinciden', 'Las contraseñas no coinciden.');
        this.usuarioService.actualizarUsuarioPorNombre(this.nombreUsuario, this.nuevaContrasena);

        this.router.navigate(['/login']);
      } else {
        console.log('Las contraseñas no coinciden.');
      }
    } else {
      this.usuarioIngresado = true;
    }
  }
}
