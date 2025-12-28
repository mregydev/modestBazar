import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../core/state/auth-store.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name = signal('');
  email = signal('');
  password = signal('');
  error = signal('');
  isSubmitting = signal(false);

  constructor(
    private authStore: AuthStore,
    private router: Router
  ) {}

  onSubmit(): void {
    const nameValue = this.name();
    const emailValue = this.email();
    const passwordValue = this.password();

    if (!nameValue || !emailValue || !passwordValue) {
      this.error.set('Please fill in all fields');
      return;
    }

    this.error.set('');
    this.isSubmitting.set(true);

    // Simulate delay
    setTimeout(() => {
      this.authStore.signup(nameValue, emailValue, passwordValue);
      this.isSubmitting.set(false);
      this.router.navigate(['/']);
    }, 500);
  }

  signupWithGoogle(): void {
    // TODO: Implement Google OAuth integration
    // For now, simulate signup
    this.authStore.signup('Google User', 'google.user@example.com', 'google');
    this.router.navigate(['/']);
  }

  signupWithFacebook(): void {
    // TODO: Implement Facebook OAuth integration
    // For now, simulate signup
    this.authStore.signup('Facebook User', 'facebook.user@example.com', 'facebook');
    this.router.navigate(['/']);
  }
}

