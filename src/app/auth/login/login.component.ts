import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subsctiption: Subscription = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subsctiption = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);
  }

  login(value: any) {
    this.authService.login(value.email, value.password);
  }

  ngOnDestroy() {
    this.subsctiption.unsubscribe();
  }

}
