import { Injectable, computed, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly _user = signal<User | null>(null);

  // Public signals
  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => this._user() !== null);

  // Methods
  login(email: string, password: string): void {
    // Dummy login - no backend validation
    this._user.set({
      id: 1,
      name: 'Demo User',
      email: email
    });
  }

  signup(name: string, email: string, password: string): void {
    // Dummy signup - no backend validation
    this._user.set({
      id: 1,
      name: name,
      email: email
    });
  }

  logout(): void {
    this._user.set(null);
  }
}

