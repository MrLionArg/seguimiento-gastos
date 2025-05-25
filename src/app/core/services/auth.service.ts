import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Credencial {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  // Lista de usuarios válidos (hardcodeado fuerte, porque no sé otra forma XD)
  private validUsers: Credencial[] = [
    { username: 'admin', password: 'password' },
  ];

  /* Me simula una llamada de autenticación para el login, y pasa si (username,password) coincide con alguno de validUsers. */
  login(username: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      const match = this.validUsers.find(
        u => u.username === username && u.password === password
      );

      if (match) {
        localStorage.setItem('token', 'dummy-token');
        this.loggedIn$.next(true);
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn$.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn$.value;
  }
}