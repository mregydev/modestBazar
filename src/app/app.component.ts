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

    /* Full width for product list page */
    .app-main:has(.product-list) {
      max-width: 100%;
      padding: 0;
      margin: 0;
      margin-top: 80px;
    }

    /* Full width for store page */
    .app-main:has(.store-page) {
      max-width: 100%;
      padding: 0;
      margin: 0;
      margin-top: 80px;
    }

    @media (max-width: 768px) {
      .app-main {
        padding: 1.5rem 1rem 3rem;
        margin-top: 0;
        padding-top: 0;
      }

      .app-main:has(.login-container),
      .app-main:has(.signup-container) {
        padding-top: 1rem;
        margin-top: 80px;
      }

      .app-main:has(.product-list) {
        padding: 0;
        margin-top: 0;
      }
    }

    /* Product details page - allow scrolling to show carousels */
    .app-main:has(.product-details) {
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0;
      height: calc(100vh - 80px);
      margin-top: 80px;
      max-width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    /* Allow scrolling on mobile */
    @media (max-width: 968px) {
      .app-main:has(.product-details) {
        overflow: visible;
        height: auto;
        min-height: calc(100vh - 80px);
        padding: 1.5rem 1rem 3rem;
        margin-top: 0;
      }
    }
  `]
})
export class AppComponent {
}
