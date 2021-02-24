import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../models/user.model';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
  error: any;
}

export const initialState: State = {
  users: [],
  error: null
};

export const reducer = createReducer(
  initialState,

  on(UserActions.loadUsers, state => state),
  on(UserActions.loadUsersSuccess, (state, action) => ({ ...state, users: action.users })),
  on(UserActions.loadUsersFailure, (state, action) => ({ ...state, error: action.error })),

  on(UserActions.addUserSuccess, (state, action) => ({ ...state })),
  on(UserActions.addUserFailure, (state, action) => ({ ...state, error: action.error }))
);
