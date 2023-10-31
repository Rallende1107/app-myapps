import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private sqlite: SQLite) {

    //this.sqlite.create({
      ////name: 'data.db',
      ////location: 'default'
    //})
    //.then((db: SQLiteObject) => {
      //db.executeSql('DROP TABLE IF EXISTS USUARIO', [])
        //.then(() => console.log('FSR: TABLA ELIMINADA OK'))
    //    //.catch(e => console.log('FSR: ' + JSON.stringify(e)));
   // })
    //.catch(e => console.log('FSR: ' + JSON.stringify(e)));

    this.sqlite.create({
      name: 'data.db',

      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO (nombreUsuario VARCHAR(20), correoElectronico VARCHAR(20), contrasena VARCHAR(20))', [])
          .then(() => console.log('FSR: TABLA CREADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

  getUsuario(nombreUsuario: string, contrasena: string) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('SELECT * FROM USUARIO WHERE nombreUsuario = ?', [nombreUsuario])
            .then((data) => {
              if (data.rows.length > 0) {
                // El usuario existe, ahora compara la contraseña
                const usuario = data.rows.item(0);
                if (usuario.contrasena === contrasena) {
                  // Contraseña correcta, resuelve la promesa con el usuario
                  resolve(usuario);
                } else {
                  // Contraseña incorrecta, rechaza la promesa
                  reject('Contraseña incorrecta');
                }
              } else {
                // Usuario no encontrado, rechaza la promesa
                reject('Usuario no encontrado');
              }
            })
            .catch((error) => {
              reject('Error al ejecutar la consulta: ' + JSON.stringify(error));
            });
        })
        .catch((error) => {
          reject('Error al abrir la base de datos: ' + JSON.stringify(error));
        });
    });
  }




  agregarUsuario(nombreUsuario: string, correoElectronico: string, contrasena: string): Promise<void> {
    console.log('Agregando usuario...');
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // Verificar si el usuario ya existe antes de insertar
        db.executeSql('SELECT * FROM USUARIO WHERE nombreUsuario = ?', [nombreUsuario])
          .then((data) => {
            if (data.rows.length > 0) {
              // El usuario ya existe, rechazar la promesa y mostrar un mensaje
              console.log('El usuario ya existe en la base de datos.');
              reject('El usuario ya existe en la base de datos.');
            } else {
              // El usuario no existe, realizar la inserción
              db.executeSql('INSERT INTO USUARIO VALUES(?, ?, ?)', [nombreUsuario, correoElectronico, contrasena])
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



  actualizarUsuarioPorNombre(nombreUsuario: string, nuevaContrasena: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        // Primero, verifica si el usuario existe
        db.executeSql('SELECT * FROM USUARIO WHERE nombreUsuario = ?', [nombreUsuario])
          .then((data) => {
            if (data.rows.length > 0) {
              // Si se encontró al menos un usuario con el nombre de usuario dado
              // Puedes proceder a actualizar su contraseña
              db.executeSql('UPDATE USUARIO SET contrasena = ? WHERE nombreUsuario = ?', [nuevaContrasena, nombreUsuario])
                .then(() => console.log('Contraseña actualizada con éxito en la base de datos.'))
                .catch(e => console.log('FSR: ' + JSON.stringify(e)));
            } else {
              console.log('El usuario con el nombre de usuario proporcionado no existe.');
            }
          })
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }



  obtenerCantidadUsuarios() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT COUNT(nombreUsuario) AS CANTIDAD FROM USUARIO', [])
          .then((data) => {
            return data.rows.item(0).CANTIDAD;
          })
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

  verificarUsuariosAlmacenados(): Promise<void> {
    console.log('Verificando usuarios almacenados...');
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM USUARIO', [])
          .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
              console.log('Fila ' + i + ':', data.rows.item(i));
            }
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
            console.error('Error al obtener usuarios: ' + JSON.stringify(e));
            reject(e); // Rechazamos la promesa en caso de error
          });
      }).catch(e => {
        console.error('Error al abrir la base de datos: ' + JSON.stringify(e));
        reject(e); // Rechazamos la promesa en caso de error al abrir la base de datos
      });
    });
  }



}