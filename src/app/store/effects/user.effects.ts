import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {
  }

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      tap(() => console.log('effect called', UserActions.loadUsers.type)),
      switchMap(() =>
        this.apiService.GetUsers().pipe(
          map(response => UserActions.loadUsersSuccess({ users: response })),
          catchError(error => of(UserActions.loadUsersFailure({ error }))))
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap(action =>
        this.apiService.AddUser(action.name).pipe(
          tap(response => console.log('api, effect called', action.type, response)),
          //map(response => UserActions.addUserSuccess({ response: response })),
          map(response => UserActions.loadUsers()),
          catchError(error => of(UserActions.addUserFailure({ error }))))
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(action =>
        this.apiService.UpdateUser(action.user).pipe(
          tap(response => console.log('api, effect called', action.type, response)),
          //map(response => UserActions.updateUserSuccess({ user: action.user })),
          map(response => UserActions.loadUsers()),
          catchError(error => of(UserActions.updateUserFailure({ error }))))
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(action =>
        this.apiService.DeleteUser(action.user).pipe(
          tap(response => console.log('api, effect called', action.type, response)),
          //map(response => UserActions.deleteUserSuccess({ user: action.user })),
          map(response => UserActions.loadUsers()),
          catchError(error => of(UserActions.deleteUserFailure({ error }))))
      )
    );
  });
}
