import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription = null;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe( ui => {
        this.cargando = ui.isLoading;
      });
  }

  onSubmit(value: any) {
    this.authService.crearUsuario(value.nombre, value.email, value.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
