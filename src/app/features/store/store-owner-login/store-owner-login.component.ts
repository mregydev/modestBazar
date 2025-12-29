import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StoreOwnerAuthService } from '../../../core/state/store-owner-auth.service';
import { StoreStore } from '../../../core/state/store-store.service';

@Component({
  selector: 'app-store-owner-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './store-owner-login.component.html',
  styleUrl: './store-owner-login.component.css'
})
export class StoreOwnerLoginComponent {
  private storeOwnerAuth = inject(StoreOwnerAuthService);
  private storeStore = inject(StoreStore);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal('');
  isSubmitting = signal(false);

  onLogin(): void {
    const email = this.email();
    const password = this.password();

    if (!email || !password) {
      this.error.set('Please enter both email and password');
      return;
    }

    this.isSubmitting.set(true);
    this.error.set('');

    // Simulate API delay
    setTimeout(() => {
      const success = this.storeOwnerAuth.login(email, password);
      
      if (success) {
        const owner = this.storeOwnerAuth.currentOwner();
        if (owner) {
          const store = this.storeStore.getStoreById(owner.storeId);
          if (store) {
            this.router.navigate(['/stores', store.slug]);
          } else {
            this.router.navigate(['/']);
          }
        }
      } else {
        this.error.set('Invalid email or password');
        this.isSubmitting.set(false);
      }
    }, 500);
  }
}

