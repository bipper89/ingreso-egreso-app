import {IngresoEgreso} from './models/ingreso-egreso.model';
import {acciones, SET_ITEMS, UNSET_ITEMS} from './ingreso-egreso.actions';
import {AppState} from '../app.reducer';

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

export interface AppState extends AppState {
  ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
  items: []
}

export function ingresoEgresoReducer(state = estadoInicial, action: acciones): IngresoEgresoState {

  switch (action.type) {

    case SET_ITEMS:
      return {
        items: [
          ...action.items.map(
            item => {
              return {
                ...item
              };
            }
          )
        ]
      }

    case UNSET_ITEMS:
      return {
        items: []
      }
    default:
      return state;
  }
}
