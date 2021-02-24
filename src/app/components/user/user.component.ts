import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/store/models/user.model';
import { loadUsers } from 'src/app/store/actions/user.actions';
import { selectUsers } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users$: Observable<User[]> = of([]);

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    this.users$ = this.store.select(selectUsers);
  }

}
