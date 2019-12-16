import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngresoEgreso} from '../models/ingreso-egreso.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from '../services/ingreso-egreso.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  itemSubscripcion = new Subscription();

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.itemSubscripcion = this.store.select('ingresoEgreso')
      .subscribe(response => {
        this.items = response.items;
      });
  }

  borrarItem(item) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
      .then(response => {
        swal.fire('Eliminado', item.descripcion, 'success');
      })
      .catch(err => console.error(err));
  }

  ngOnDestroy() {
    this.itemSubscripcion.unsubscribe()
    ;
  }
}
