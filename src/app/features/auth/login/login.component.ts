import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../core/state/auth-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  error = signal('');
  isSubmitting = signal(false);

  constructor(
    private authStore: AuthStore,
    private router: Router
  ) {}

  onSubmit(): void {
    const emailValue = this.email();
    const passwordValue = this.password();

    if (!emailValue || !passwordValue) {
      this.error.set('Please fill in all fields');
      return;
    }

    this.error.set('');
    this.isSubmitting.set(true);

    // Simulate delay
    setTimeout(() => {
      this.authStore.login(emailValue, passwordValue);
      this.isSubmitting.set(false);
      this.router.navigate(['/']);
    }, 500);
  }

  loginWithGoogle(): void {
    // TODO: Implement Google OAuth integration
    // For now, simulate login
    this.authStore.login('google.user@example.com', 'google');
    this.router.navigate(['/']);
  }

  loginWithFacebook(): void {
    // TODO: Implement Facebook OAuth integration
    // For now, simulate login
    this.authStore.login('facebook.user@example.com', 'facebook');
    this.router.navigate(['/']);
  }
}

