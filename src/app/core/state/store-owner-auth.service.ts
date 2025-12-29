import { Injectable, signal, computed } from '@angular/core';
import { StoreOwner } from '../models/store.model';

/**
 * Store Owner Authentication Service
 * 
 * Manages store owner authentication state.
 * 
 * To connect to a real backend:
 * 1. Inject HttpClient
 * 2. Replace mock login with API call to /api/store-owner/login
 * 3. Store JWT token in localStorage or httpOnly cookie
 * 4. Add token refresh logic
 * 5. Add proper error handling
 * 6. Implement password hashing on backend
 */
@Injectable({
  providedIn: 'root'
})
export class StoreOwnerAuthService {
  // Mock store owners for development
  private readonly mockStoreOwners: StoreOwner[] = [
    {
      id: 'owner-1',
      email: 'owner1@modestbazar.com',
      passwordHash: 'password1', // In real app, this would be hashed
      storeId: 'store-1',
      name: 'Sarah Ahmed'
    },
    {
      id: 'owner-2',
      email: 'owner2@modestbazar.com',
      passwordHash: 'password2',
      storeId: 'store-2',
      name: 'Fatima Ali'
    },
    {
      id: 'owner-3',
      email: 'owner3@modestbazar.com',
      passwordHash: 'password3',
      storeId: 'store-3',
      name: 'Amina Hassan'
    },
    {
      id: 'owner-4',
      email: 'owner4@modestbazar.com',
      passwordHash: 'password4',
      storeId: 'store-4',
      name: 'Zainab Mohamed'
    }
  ];

  private readonly _currentOwner = signal<StoreOwner | null>(null);

  // Public signals
  readonly currentOwner = computed(() => this._currentOwner());
  readonly isLoggedIn = computed(() => this._currentOwner() !== null);
  readonly currentStoreId = computed(() => this._currentOwner()?.storeId || null);

  constructor() {
    // Check localStorage for persisted session
    const savedOwner = localStorage.getItem('storeOwner');
    if (savedOwner) {
      try {
        this._currentOwner.set(JSON.parse(savedOwner));
      } catch (e) {
        localStorage.removeItem('storeOwner');
      }
    }
  }

  /**
   * Login store owner
   * In a real app, this would make an API call
   */
  login(email: string, password: string): boolean {
    const owner = this.mockStoreOwners.find(
      o => o.email === email && o.passwordHash === password
    );

    if (owner) {
      // Remove passwordHash before storing
      const { passwordHash, ...ownerWithoutPassword } = owner;
      this._currentOwner.set(ownerWithoutPassword as StoreOwner);
      localStorage.setItem('storeOwner', JSON.stringify(ownerWithoutPassword));
      return true;
    }

    return false;
  }

  /**
   * Logout store owner
   */
  logout(): void {
    this._currentOwner.set(null);
    localStorage.removeItem('storeOwner');
  }

  /**
   * Check if current owner owns a specific store
   */
  ownsStore(storeId: string): boolean {
    return this._currentOwner()?.storeId === storeId;
  }
}

