import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../store/models/user.model';
import { catchError, map, mergeMap, reduce, switchMap, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ApiService {
  private readonly baseApiUrl = 'http://localhost:4201/api/'
  private readonly usersUrl = this.baseApiUrl + 'users';
  private readonly headers = { 'Content-Type': 'application/json'};

  constructor(private httpClient: HttpClient) {

  }

  public GetUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl);
  }

  public AddUser(name: string): Observable<any> {
    return this.httpClient.get<User[]>(this.usersUrl).pipe(
      map(users => users.map(user => user.id).reduce((acc, c) => c > acc ? c : acc, 0)),
      mergeMap(id => this.httpClient.post<User>(
        this.usersUrl,
        { id: id + 1, name: name },
        { headers: this.headers }
      )),
    );
  }

  public UpdateUser(user: User): Observable<any> {
    const body = { id: user.id, name: user.name } as User;

    return this.httpClient.request(
        'put',
        this.usersUrl + '/' + user.id,
        { headers: this.headers, body: body }
    );
  }

  public DeleteUser(user: User): Observable<any> {
    return this.httpClient.request(
        'delete',
        this.usersUrl + '/' + user.id,
        { headers: this.headers }
    );
  }
}
