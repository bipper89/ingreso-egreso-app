import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngresoEgreso} from './models/ingreso-egreso.model';
import {IngresoEgresoService} from './services/ingreso-egreso.service';
import swal from 'sweetalert2';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';
  loadingSubscription: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);

    this.form = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(1)),
    });
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({...this.form.value, tipo: this.tipo});
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(response => {
        this.form.reset();
        this.store.dispatch(new DesactivarLoadingAction());
        swal.fire('Creado', ingresoEgreso.descripcion, 'success');
      });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
