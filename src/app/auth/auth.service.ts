import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {User} from '../auth/models/user.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../shared/ui.actions';
import {SetUserAction, UnsetUserAction} from './auth.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        const user: User = {
          uid: response.user.uid,
          nombre,
          email: response.user.email
        };
        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then( () => {
            this.router.navigate(['/']);
            this.store.dispatch(new DesactivarLoadingAction());
          });
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        swal.fire('Error al crear el usuario', err.message, 'error');
    });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        swal.fire('Error en el login', err.message, 'error');
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch(new UnsetUserAction());
    this.router.navigate(['/login']);
  }

  initAuthListener() {
    this.userSubscription = this.afAuth.authState.subscribe(
      (fbUser: firebase.User) => {
        if (fbUser) {
          this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
            .subscribe((response: User) => {
              this.usuario = response;
              this.store.dispatch(new SetUserAction(response));
            });
        } else {
          this.usuario = null;
          this.userSubscription.unsubscribe();
        }
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

  getUsuario() {
    return {...this.usuario};
  }
}
