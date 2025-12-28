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
    }

    /* Prevent outer scroll on product details page only */
    .app-main:has(.product-details) {
      overflow: hidden;
      padding: 0 1rem;
      height: calc(100vh - 80px);
      margin-top: 80px;
    }
  `]
})
export class AppComponent {
}
