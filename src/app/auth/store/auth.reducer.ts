import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export type AuthSate = {
  user: User | null;
};

const initialState: AuthSate = {
  user: null,
};

// export type AppAuthState = {
//   auth:AuthSate;
// }
export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
): AuthSate {
  // console.log(state);
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
