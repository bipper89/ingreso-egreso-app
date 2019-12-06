import {State, uiReducer} from './shared/ui.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {authReducer, AuthState} from './auth/auth.reducer';

export interface AppState {
  ui: State;
  auth: AuthState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
};
