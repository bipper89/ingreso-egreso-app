import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscripcion = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscripcion = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
    )
      .subscribe(auth => this.nombre = auth.user.nombre);
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

}
