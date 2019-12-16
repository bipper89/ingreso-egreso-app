import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngresoEgreso} from '../models/ingreso-egreso.model';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {filter, map} from 'rxjs/operators';
import {SetItemsAction, UnsetItemsAction} from '../ingreso-egreso.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription = new Subscription();
  ingresoEgresoItemsSubscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
      }
    );
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(map(data => {
        return data.map(doc => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      }))
      .subscribe(
        (response: any) => {
          this.store.dispatch(new SetItemsAction(response));
        }
    );
  }

  cancelarSubscripciones() {
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
      .delete();
  }
}
