import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class LoginGuardService implements CanActivate{

  constructor(private localStorage : LocalStorageService, private router : Router, public snackBar: MatSnackBar) { }

  canActivate(): boolean {
    this.localStorage.dbHasUsers().subscribe(result => {
      if (!result) {
        this.snackBar.open('Unauthorized acces! Please login first!', '', {
          duration: 3000
        });
        this.router.navigate(['signin']);
        return false;
      }
    })
    return true;
  }
}

