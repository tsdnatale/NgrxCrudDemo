import { Action, createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const initUpdate = createAction(
  '[UI] initUpdate',
  props<{ disable: boolean, action: Action }>()
);

export const initUpdateSuccess = createAction(
  '[UI] initUpdate success',
  props<{ disable: boolean }>()
);

export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[User] Add User',
  props<{ name: string }>()
);

export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ response: any }>()
);

export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ user: User }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ user: User }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);