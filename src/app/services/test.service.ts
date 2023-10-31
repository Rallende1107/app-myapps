import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',

      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO (username VARCHAR(50), email VARCHAR(50), password VARCHAR(45)), nombre VARCHAR(20), apellido VARCHAR(30))', [])
          .then(() => console.log('FSR: TABLA CREADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }
  agregarUsuario(username: string, email: string, password: string, nombre: string, apellido: string): Promise<void> {
    console.log('Agregando usuario...');
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // Verificar si el usuario ya existe antes de insertar
        db.executeSql('SELECT * FROM USUARIO WHERE nombreUsuario = ?', [username])
          .then((data) => {
            if (data.rows.length > 0) {
              // El usuario ya existe, rechazar la promesa y mostrar un mensaje
              console.log('El usuario ya existe en la base de datos.');
              reject('El usuario ya existe en la base de datos.');
            } else {
              // El usuario no existe, realizar la inserción
              db.executeSql('INSERT INTO USUARIO VALUES(?, ?,?, ?, ?)', [username, email, password, nombre, apellido])
                .then(() => {
                  console.log('FSR: USUARIO ALMACENADO OK');
                  db.close()
                    .then(() => {
                      console.log('Base de datos cerrada.');
                      resolve(); // Resolvemos la promesa en caso de éxito
                    })
                    .catch(e => {
                      console.error('Error al cerrar la base de datos: ' + JSON.stringify(e));
                      reject(e); // Rechazamos la promesa en caso de error
                    });
                }).catch(e => {
                  console.error('FSR: Error al almacenar usuario: ' + JSON.stringify(e));
                  reject(e); // Rechazamos la promesa en caso de error
                });
            }
          }).catch(e => {
            console.error('Error al verificar usuario: ' + JSON.stringify(e));
            reject(e); // Rechazamos la promesa en caso de error en la verificación
          });
      }).catch(e => {
        console.error('FSR: Error al abrir la base de datos: ' + JSON.stringify(e));
        reject(e); // Rechazamos la promesa en caso de error al abrir la base de datos
      });
    });
  }

}
