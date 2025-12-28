import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="app-shell">
      <app-header></app-header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #faf7f4;
    }
    .app-main {
      flex: 1;
      max-width: 1024px;
      margin: 0 auto;
      padding: 1.5rem 1rem 3rem;
      width: 100%;
      margin-top: 80px;
      min-height: calc(100vh - 80px);
    }

    @media (max-width: 768px) {
      .app-main {
        padding: 1.5rem 1rem 3rem;
        margin-top: 80px;
        padding-top: 2rem;
      }

      .app-main:has(.login-container),
      .app-main:has(.signup-container) {
        padding-top: 1rem;
      }
    }

    /* Prevent outer scroll on product details page only (desktop) */
    .app-main:has(.product-details) {
      overflow: hidden;
      padding: 0 1rem;
      height: calc(100vh - 80px);
      margin-top: 80px;
    }

    /* Allow scrolling on mobile */
    @media (max-width: 968px) {
      .app-main:has(.product-details) {
        overflow: visible;
        height: auto;
        min-height: calc(100vh - 80px);
        padding: 1.5rem 1rem 3rem;
      }
    }
  `]
})
export class AppComponent {
}
