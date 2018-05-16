import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of';

@Injectable()
/* class used to store and validate data of the account creation and sign in process */
export class LocalStorageService {

  private localDatabase = [];

  activeUser = new User();

  constructor() {     
  }

  getActiveUser() : Observable<User>{
    return of(this.activeUser);
  }

  postUser(user : User) : void {
    this.localDatabase.push(user);
  }

  dbHasUsers() : Observable<boolean> {
    return of(this.localDatabase.length > 0 ? true : false);
  }

  checkDB() : void {
    console.log(this.localDatabase);
  }

  authentificate(user : User) : Observable<boolean> {
    var result = this.localDatabase.find(u => user.username === u.username && user.password === u.password);
    if (result === undefined) {
      return of(false);
    }
    this.activeUser = result;
    return of(true);
  }

  emergencyUser() : Observable<User>{
    return of(this.localDatabase[0]);
  }

}
