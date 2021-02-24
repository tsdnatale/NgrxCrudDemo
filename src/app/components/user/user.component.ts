import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/store/models/user.model';
import { addUser, deleteUser, initUpdate, loadUsers, updateUser } from 'src/app/store/actions/user.actions';
import { selectUIDisabled, selectUsers } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users$: Observable<User[]> = of([]);
  uiDisabled$: Observable<boolean> = of(false);

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    this.users$ = this.store.select(selectUsers);
    this.uiDisabled$ = this.store.select(selectUIDisabled);
  }

  add(): void {
    const newUser = prompt('new user name:');
    if(newUser){
      this.store.dispatch(addUser({ name: newUser }));
    }
  }

  edit(user: User): void {
    let newName = prompt('edit user name', user.name);
    if(newName){
      const _user = { id: user.id, name: newName } as User
      this.store.dispatch(initUpdate({
        disable: true,
        action: updateUser({ user: _user })
      }));
    }
  }

  delete(user: User): void {
    //this.store.dispatch(deleteUser({ user }));

    this.store.dispatch(initUpdate({
      disable: true,
      action: deleteUser({ user })
    }));
  }
}
