import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as UserActions from '../actions/user.actions';
import { User } from '../models/user.model';


@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      tap(() => console.log('effect called', UserActions.loadUsers.type)),
      concatMap(() =>
        of([{ id: 1, name: 'Tim' } as User] as User[]).pipe(
          map(response => UserActions.loadUsersSuccess({ users: response })),
          catchError(error => of(UserActions.loadUsersFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
