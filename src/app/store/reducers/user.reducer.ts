import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(UserActions.loadUsers, state => state),
  on(UserActions.loadUsersSuccess, (state, action) => state),
  on(UserActions.loadUsersFailure, (state, action) => state),

);

