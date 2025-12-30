import { Component, inject, computed, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StoreStore } from '../../../core/state/store-store.service';
import { ProductStore } from '../../../core/state/product-store.service';
import { StoreOwnerAuthService } from '../../../core/state/store-owner-auth.service';
import { TranslationService } from '../../../core/services/translation.service';
import { Product, ProductFilters } from '../../../core/models/product.model';
import { Store } from '../../../core/models/store.model';
import { ProductFiltersComponent, AvailableFilters } from '../../products/product-list/product-filters/product-filters.component';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductFiltersComponent],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})
export class StorePageComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private storeStore = inject(StoreStore);
  private productStore = inject(ProductStore);
  private storeOwnerAuth = inject(StoreOwnerAuthService);
  private platformId = inject(PLATFORM_ID);
  private destroy$ = new Subject<void>();
  public translationService = inject(TranslationService);

  store = signal<Store | null>(null);
  storeProducts = signal<Product[]>([]);
  currentFilters = signal<ProductFilters>({});
  isOwnerView = signal(false);
  isFiltersOpen = signal(false); // Collapsed by default on mobile
  isMobile = signal(false);

  // Available filter options computed from store products
  availableFilters = computed<AvailableFilters>(() => {
    const products = this.storeProducts();
    return this.computeAvailableFilters(products);
  });

  // Filtered products based on current filters
  filteredProducts = computed<Product[]>(() => {
    const products = this.storeProducts();
    const filters = this.currentFilters();
    return this.applyFilters(products, filters);
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(100),
          takeUntil(this.destroy$)
        )
        .subscribe(() => this.checkMobile());
    }

    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.router.navigate(['/']);
      return;
    }

    const foundStore = this.storeStore.getStoreBySlug(slug);
    if (!foundStore) {
      this.router.navigate(['/']);
      return;
    }

    this.store.set(foundStore);

    // Check if current user is the store owner
    const isOwner = this.storeOwnerAuth.ownsStore(foundStore.id);
    this.isOwnerView.set(isOwner);

    // Load products for this store
    this.loadStoreProducts(foundStore);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkMobile(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile.set(window.innerWidth <= 968);
      // On desktop, always keep filters open
      if (!this.isMobile()) {
        this.isFiltersOpen.set(true);
      }
    }
  }

  private loadStoreProducts(store: Store): void {
    const allProducts = this.productStore.products();
    // Filter products by brand matching store name
    const products = allProducts.filter(p => p.brand === store.name);
    this.storeProducts.set(products);
  }

  onFiltersChange(filters: ProductFilters): void {
    this.currentFilters.set(filters);
  }

  toggleFilters(): void {
    this.isFiltersOpen.set(!this.isFiltersOpen());
  }

  translate(key: string, params?: Record<string, any>): string {
    return this.translationService.translate(key, params);
  }

  /**
   * Compute available filter options from store products
   */
  private computeAvailableFilters(products: Product[]): AvailableFilters {
    const categories = new Set<string>();
    const sizes = new Set<string>();
    const colors = new Set<string>();
    const patternTypes = new Set<string>();
    const materials = new Set<string>();
    const occasions = new Set<string>();
    const brands = new Set<string>();
    const hijabFriendly = new Set<string>();
    const sleeveLengths = new Set<string>();
    const necklineCoverage = new Set<string>();
    const lengthCategories = new Set<string>();
    const fits = new Set<string>();
    const opacity = new Set<string>();
    const slitCoverage = new Set<string>();
    
    let minPrice = Infinity;
    let maxPrice = 0;

    products.forEach(product => {
      if (product.category) categories.add(product.category);
      if (product.sizes) product.sizes.forEach(size => sizes.add(size));
      if (product.colors) product.colors.forEach(color => colors.add(color));
      if (product.patternType) patternTypes.add(product.patternType);
      if (product.material) materials.add(product.material);
      if (product.occasions) product.occasions.forEach(occasion => occasions.add(occasion));
      if (product.brand) brands.add(product.brand);
      if (product.hijabFriendly) hijabFriendly.add(product.hijabFriendly);
      if (product.sleeveLength) sleeveLengths.add(product.sleeveLength);
      if (product.necklineCoverage) necklineCoverage.add(product.necklineCoverage);
      if (product.lengthCategory) lengthCategories.add(product.lengthCategory);
      if (product.fit) fits.add(product.fit);
      if (product.opacity) opacity.add(product.opacity);
      if (product.slitCoverage) slitCoverage.add(product.slitCoverage);
      if (product.price < minPrice) minPrice = product.price;
      if (product.price > maxPrice) maxPrice = product.price;
    });

    return {
      categories: Array.from(categories).sort(),
      sizes: Array.from(sizes).sort(),
      colors: Array.from(colors).sort(),
      minPrice: minPrice === Infinity ? 0 : minPrice,
      maxPrice: maxPrice,
      patternTypes: Array.from(patternTypes).sort(),
      materials: Array.from(materials).sort(),
      occasions: Array.from(occasions).sort(),
      brands: Array.from(brands).sort(),
      hijabFriendly: Array.from(hijabFriendly).sort(),
      sleeveLengths: Array.from(sleeveLengths).sort(),
      necklineCoverage: Array.from(necklineCoverage).sort(),
      lengthCategories: Array.from(lengthCategories).sort(),
      fits: Array.from(fits).sort(),
      opacity: Array.from(opacity).sort(),
      slitCoverage: Array.from(slitCoverage).sort()
    };
  }

  /**
   * Apply filters to products
   */
  private applyFilters(products: Product[], filters: ProductFilters): Product[] {
    return products.filter(product => {
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) return false;
      }
      if (filters.sizes && filters.sizes.length > 0) {
        if (!product.sizes || !product.sizes.some(size => filters.sizes!.includes(size))) {
          return false;
        }
      }
      if (filters.colors && filters.colors.length > 0) {
        const productColors = product.colors || [];
        if (!productColors.some(color => filters.colors!.includes(color))) {
          return false;
        }
      }
      if (filters.minPrice !== null && filters.minPrice !== undefined) {
        if (product.price < filters.minPrice) return false;
      }
      if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
        if (product.price > filters.maxPrice) return false;
      }
      if (filters.patternTypes && filters.patternTypes.length > 0) {
        if (!product.patternType || !filters.patternTypes.includes(product.patternType)) {
          return false;
        }
      }
      if (filters.materials && filters.materials.length > 0) {
        if (!product.material || !filters.materials.includes(product.material)) {
          return false;
        }
      }
      if (filters.occasions && filters.occasions.length > 0) {
        if (!product.occasions || !product.occasions.some(occasion => filters.occasions!.includes(occasion))) {
          return false;
        }
      }
      if (filters.brands && filters.brands.length > 0) {
        if (!product.brand || !filters.brands.includes(product.brand)) {
          return false;
        }
      }
      // Add other modesty filters as needed
      return true;
    });
  }

  // Store owner editing methods
  updateBannerImage(url: string): void {
    const store = this.store();
    if (store && this.isOwnerView()) {
      this.storeStore.updateStore(store.id, { bannerImageUrl: url });
      this.store.set({ ...store, bannerImageUrl: url });
    }
  }

  updateLogoImage(url: string): void {
    const store = this.store();
    if (store && this.isOwnerView()) {
      this.storeStore.updateStore(store.id, { logoImageUrl: url });
      this.store.set({ ...store, logoImageUrl: url });
    }
  }

  updateVisibleFilters(filters: string[]): void {
    const store = this.store();
    if (store && this.isOwnerView()) {
      this.storeStore.updateStore(store.id, { visibleFilters: filters });
      this.store.set({ ...store, visibleFilters: filters });
    }
  }

  editBanner(): void {
    const url = prompt('Enter banner image URL:');
    if (url) {
      this.updateBannerImage(url);
    }
  }

  editLogo(): void {
    const url = prompt('Enter logo image URL:');
    if (url) {
      this.updateLogoImage(url);
    }
  }
}

