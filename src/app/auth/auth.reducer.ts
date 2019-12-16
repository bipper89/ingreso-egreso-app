import {User} from './models/user.model';
import {actions, SET_USER, UNSET_USER} from './auth.actions';

export interface AuthState {
  user: User;
}

const initState: AuthState = {
  user: null
}

export function authReducer(state = initState , action: actions) {

  switch (action.type) {
    case SET_USER:
      return {
        user: {...action.user}
      };
    case UNSET_USER:
      return {
        user: null
      };
    default:
      return state;
  }

}
