import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { AuthenticatedUser, SignInDetails, SignUpDetails, Account } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class IdentityService {
  private readonly storageKey = 'blog_user_session';
  private readonly api = 'http://localhost:3000/users';
  private readonly http = inject(HttpClient);

  readonly user = signal<AuthenticatedUser | null>(this.getStoredUser());

  signIn(details: SignInDetails): Observable<AuthenticatedUser> {
    const email = details.email.trim().toLowerCase();
    
    return this.http.get<Account[]>(this.api, {
      params: { email, password: details.password }
    }).pipe(
      map(accounts => {
        const account = accounts[0];
        if (!account) throw new Error('Invalid email or password');
        
        const activeUser: AuthenticatedUser = { id: account.id, name: account.name, email: account.email };
        this.persistUser(activeUser);
        return activeUser;
      }),
      catchError(err => this.processError(err, 'Sign in failed'))
    );
  }

  signUp(details: SignUpDetails): Observable<AuthenticatedUser> {
    const email = details.email.trim().toLowerCase();

    return this.http.get<Account[]>(this.api, { params: { email } }).pipe(
      switchMap(accounts => {
        if (accounts.length > 0) return throwError(() => new Error('Email already in use'));

        const newAccount: Account = {
          id: this.generateUid(),
          name: details.name.trim(),
          email,
          password: details.password
        };

        return this.http.post<Account>(this.api, newAccount);
      }),
      map(account => {
        const activeUser: AuthenticatedUser = { id: account.id, name: account.name, email: account.email };
        this.persistUser(activeUser);
        return activeUser;
      }),
      catchError(err => this.processError(err, 'Sign up failed'))
    );
  }

  logout(): void {
    this.user.set(null);
    localStorage.removeItem(this.storageKey);
  }

  private getStoredUser(): AuthenticatedUser | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  private persistUser(user: AuthenticatedUser): void {
    this.user.set(user);
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  private processError(error: any, fallback: string): Observable<never> {
    const message = error instanceof Error ? error.message : fallback;
    return throwError(() => new Error(message));
  }

  private generateUid(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}
