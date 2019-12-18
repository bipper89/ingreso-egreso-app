import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DetalleComponent} from './detalle/detalle.component';
import {EstadisticaComponent} from './estadistica/estadistica.component';
import {IngresoEgresoComponent} from './ingreso-egreso.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {OrdenIngresoEgresoPipe} from './orden-ingreso-egreso.pipe';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from '../dashboard/dashboard.routing';
import {StoreModule} from '@ngrx/store';
import {ingresoEgresoReducer} from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ],
})
export class IngresoEgresoModule { }
