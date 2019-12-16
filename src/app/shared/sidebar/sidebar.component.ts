import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {IngresoEgresoService} from '../../ingreso-egreso/services/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => this.nombre = auth.user.nombre);
  }

  logout() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscripciones();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
