import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombreUsuario: string = '';
  correoElectronico: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  isAlertOpen: boolean = false;
  alertHeader: string = '';
  alertMessage: string = '';
  cantidad: number = 0;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  mostrarAlerta(header: string, message: string) {
    this.isAlertOpen = true;
    this.alertHeader = header;
    this.alertMessage = message;
  }

  registro() {
    console.log('La función de registro se está ejecutando.');
  
    // Agregar el usuario a la base de datos
    this.usuarioService.agregarUsuario(this.nombreUsuario, this.correoElectronico, this.contrasena).then(() => {
      console.log('Usuario almacenado en la base de datos.');
  
      // Verificar los usuarios almacenados en la base de datos
      this.usuarioService.verificarUsuariosAlmacenados().then(() => {
        console.log('Usuarios verificados.');
  
        // Luego, continúa con las demás comprobaciones
        if (!this.nombreUsuario || !this.correoElectronico || !this.contrasena || !this.confirmarContrasena) {
          this.mostrarAlerta('Campos incompletos', 'Por favor, complete todos los campos.');
        } else if (this.contrasena !== this.confirmarContrasena) {
          this.mostrarAlerta('Contraseñas no coinciden', 'Las contraseñas no coinciden.');
        } else if (this.contrasena.length < 8) {
          this.mostrarAlerta('Contraseña débil', 'La contraseña debe tener al menos 8 caracteres.');
        } else {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(this.correoElectronico)) {
            console.log('Antes de obtener la cantidad de usuarios desde el servicio.');
            this.usuarioService.obtenerCantidadUsuarios().then(data => {
              this.cantidad = data;
              console.log('Datos almacenados con éxito en la base de datos.');
            }).catch((error: any) => {
              console.error('Error en la consulta a la base de datos: ' + error);
            });
          }
  
          this.nombreUsuario = '';
          this.correoElectronico = '';
          this.contrasena = '';
          this.confirmarContrasena = '';
  
          this.router.navigate(['/login']);
        }
      }).catch(error => {
        console.error('Error al verificar usuarios: ' + error);
      });
    }).catch(error => {
      console.error('Error al almacenar usuario: ' + error);
    });
  }
  
}
