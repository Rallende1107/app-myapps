import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mdl_usuario: string = '';
  mdl_contrasena: string = '';

  isAlertOpen = false;
  alertMessage = '';
  alertButtons = ['OK'];
  cantidad: number = 0;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.obtenerCantidadUsuarios().then(data => {
      this.cantidad = data;
    });
  }

  async navegar() {
    console.log('La función navegar() se está ejecutando.');
    
    // Verificar si los campos están vacíos
    if (this.mdl_usuario.trim() === '' || this.mdl_contrasena.trim() === '') {
      this.mostrarAlerta('Campos vacíos', 'Por favor, complete todos los campos.');
      return; // Salir de la función si los campos están vacíos
    }
  
    try {
      const nombreUsuario = this.mdl_usuario;
      const contrasena = this.mdl_contrasena;
  
      const usuario = await this.usuarioService.getUsuario(nombreUsuario, contrasena);
  
      if (usuario) {
        this.router.navigate(['principal']);
        this.limpiarCampos();
      } else {
        this.mostrarAlerta('Credenciales incorrectas', 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Error al obtener usuarios de la base de datos.');
      console.error('Error en la consulta a la base de datos: ', error);
    }
  }

  limpiarCampos() {
    this.mdl_usuario = '';
    this.mdl_contrasena = '';
  }

  mostrarAlerta(header: string, message: string) {
    this.alertMessage = message;
    this.isAlertOpen = true;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
