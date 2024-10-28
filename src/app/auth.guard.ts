import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getCookie } from './utils/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const expirationTimestamp = getCookie('expirationTime');

    if (expirationTimestamp) {
      const expirationTime = parseInt(expirationTimestamp, 10);
      const currentTime = Date.now();

      if (currentTime < expirationTime) {
        console.log('Token is valid, access granted.');
        return true;
      }
    }

    console.log('Token expired or not found, redirecting to login.');
    this.router.navigate(['/login']);
    return false;
  }
}
