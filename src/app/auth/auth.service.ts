import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../auth/models/user.model';
import {AngularFirestore} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router
  ) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        const user: User = {
          uid: response.user.uid,
          nombre,
          email: response.user.email
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then( () => this.router.navigate(['/']));
        this.router.navigate(['/']);
      })
      .catch(err => {
        swal.fire('Error al crear el usuario', err.message, 'error');
    });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        swal.fire('Error en el login', err.message, 'error');
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(
      (fbUser: firebase.User) => {
        console.log(fbUser);
      }
    );
  }

  isAuth(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser === null) {
            this.router.navigate(['/login']);
          }
          return fbUser !== null;
        })
      );
  }
}
