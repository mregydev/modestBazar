import { Component, signal, HostListener, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { AuthStore } from '../../core/state/auth-store.service';
import { StoreOwnerAuthService } from '../../core/state/store-owner-auth.service';
import { StoreStore } from '../../core/state/store-store.service';

export type Language = 'ar' | 'en';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchQuery = signal('');
  currentLanguage = signal<Language>('en');
  showLanguageDropdown = signal(false);
  currentUrl = signal('');

  languages = [
    { code: 'ar' as Language, name: 'العربية', flag: '🇪🇬', flagClass: 'flag-egypt' },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧', flagClass: 'flag-uk' }
  ];

  isProductDetailsPage = computed(() => {
    const url = this.currentUrl();
    return url.startsWith('/products/') && url.split('/').length > 2;
  });

  shouldHideSearchBar = computed(() => {
    const url = this.currentUrl();
    return this.isProductDetailsPage() || url === '/login' || url === '/signup';
  });

  constructor(
    public authStore: AuthStore,
    public storeOwnerAuth: StoreOwnerAuthService,
    private storeStore: StoreStore,
    private router: Router
  ) {
    // Update current URL on navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl.set(event.url);
      });

    // Set initial URL
    this.currentUrl.set(this.router.url);
  }

  onSearch(): void {
    const query = this.searchQuery().trim();
    if (query) {
      // TODO: Implement search functionality
      // For now, navigate to products page
      this.router.navigate(['/']);
    }
  }

  selectLanguage(language: Language): void {
    this.currentLanguage.set(language);
    this.showLanguageDropdown.set(false);
    // TODO: Implement language change logic (i18n)
  }

  getCurrentLanguageFlagClass(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage());
    return lang?.flagClass || 'flag-uk';
  }

  toggleLanguageDropdown(): void {
    this.showLanguageDropdown.set(!this.showLanguageDropdown());
  }

  closeLanguageDropdown(): void {
    this.showLanguageDropdown.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.showLanguageDropdown.set(false);
    }
  }

  getMyStoreSlug(): string | null {
    const owner = this.storeOwnerAuth.currentOwner();
    if (!owner) return null;
    const store = this.storeStore.getStoreById(owner.storeId);
    return store?.slug || null;
  }

  onStoreOwnerLogout(): void {
    this.storeOwnerAuth.logout();
    this.router.navigate(['/']);
  }
}

