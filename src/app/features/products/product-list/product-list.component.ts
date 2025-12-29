import { Component, inject, computed, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductStore } from '../../../core/state/product-store.service';
import { StoreStore } from '../../../core/state/store-store.service';
import { Product, ProductFilters } from '../../../core/models/product.model';
import { ProductFiltersComponent, AvailableFilters } from './product-filters/product-filters.component';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

/**
 * ProductListComponent
 *
 * Displays a filtered list of products with a filters sidebar.
 *
 * To add a new filter:
 * 1. Add the field to ProductFilters interface
 * 2. Add computation in computeAvailableFilters()
 * 3. Add filter logic in applyFilters()
 * 4. Update ProductFiltersComponent template
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductFiltersComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productStore = inject(ProductStore);
  private storeStore = inject(StoreStore);
  private platformId = inject(PLATFORM_ID);
  private destroy$ = new Subject<void>();

  // All products from store
  allProducts = this.productStore.products;

  // Current filters
  currentFilters = signal<ProductFilters>({});

  // Mobile detection
  isMobile = signal(false);
  isFiltersOpen = signal(false);

  // Available filter options computed from all products
  availableFilters = computed<AvailableFilters>(() => {
    const products = this.allProducts();
    return this.computeAvailableFilters(products);
  });

  // Filtered products based on current filters
  products = computed<Product[]>(() => {
    const all = this.allProducts();
    const filters = this.currentFilters();
    return this.applyFilters(all, filters);
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkMobile(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile.set(window.innerWidth <= 768);
      if (!this.isMobile()) {
        this.isFiltersOpen.set(false);
      }
    }
  }

  toggleFilters(): void {
    this.isFiltersOpen.set(!this.isFiltersOpen());
  }

  /**
   * Get store logo URL for a product (by brand name)
   */
  getStoreLogoUrl(product: Product): string | null {
    if (!product.brand) return null;
    const store = this.storeStore.getStoreByName(product.brand);
    return store?.logoImageUrl || null;
  }

  /**
   * Get store name for a product (brand is the store name)
   */
  getStoreName(product: Product): string | null {
    return product.brand || null;
  }

  /**
   * Get store slug for a product (for routing, by brand name)
   */
  getStoreSlug(product: Product): string | null {
    if (!product.brand) return null;
    const store = this.storeStore.getStoreByName(product.brand);
    return store?.slug || null;
  }

  /**
   * Compute available filter options from all products
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
      // Categories
      if (product.category) categories.add(product.category);

      // Sizes
      if (product.sizes) {
        product.sizes.forEach(size => sizes.add(size));
      }

      // Colors
      if (product.colors) {
        product.colors.forEach(color => colors.add(color));
      } else if (product.colorFamily) {
        colors.add(product.colorFamily);
      }

      // Pattern types
      if (product.patternType) patternTypes.add(product.patternType);

      // Materials
      if (product.material) materials.add(product.material);

      // Occasions
      if (product.occasions) {
        product.occasions.forEach(occasion => occasions.add(occasion));
      }

      // Brands
      if (product.brand) brands.add(product.brand);

      // Modesty attributes
      if (product.hijabFriendly) hijabFriendly.add(product.hijabFriendly);
      if (product.sleeveLength) sleeveLengths.add(product.sleeveLength);
      if (product.necklineCoverage) necklineCoverage.add(product.necklineCoverage);
      if (product.lengthCategory) lengthCategories.add(product.lengthCategory);
      if (product.fit) fits.add(product.fit);
      if (product.opacity) opacity.add(product.opacity);
      if (product.slitCoverage) slitCoverage.add(product.slitCoverage);

      // Price range
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
   * Apply filters to products using AND logic
   */
  private applyFilters(products: Product[], filters: ProductFilters): Product[] {
    return products.filter(product => {
      // Category filter
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) return false;
      }

      // Size filter (intersection)
      if (filters.sizes && filters.sizes.length > 0) {
        if (!product.sizes || !product.sizes.some(size => filters.sizes!.includes(size))) {
          return false;
        }
      }

      // Color filter (intersection)
      if (filters.colors && filters.colors.length > 0) {
        const productColors = product.colors || (product.colorFamily ? [product.colorFamily] : []);
        if (!productColors.some(color => filters.colors!.includes(color))) {
          return false;
        }
      }

      // Price range filter
      if (filters.minPrice !== null && filters.minPrice !== undefined) {
        if (product.price < filters.minPrice) return false;
      }
      if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
        if (product.price > filters.maxPrice) return false;
      }

      // Pattern type filter
      if (filters.patternTypes && filters.patternTypes.length > 0) {
        if (!product.patternType || !filters.patternTypes.includes(product.patternType)) {
          return false;
        }
      }

      // Material filter
      if (filters.materials && filters.materials.length > 0) {
        if (!product.material || !filters.materials.includes(product.material)) {
          return false;
        }
      }

      // Occasion filter (intersection)
      if (filters.occasions && filters.occasions.length > 0) {
        if (!product.occasions || !product.occasions.some(occasion => filters.occasions!.includes(occasion))) {
          return false;
        }
      }

      // Brand filter
      if (filters.brands && filters.brands.length > 0) {
        if (!product.brand || !filters.brands.includes(product.brand)) {
          return false;
        }
      }

      // Modesty attribute filters
      if (filters.hijabFriendly && filters.hijabFriendly.length > 0) {
        if (!product.hijabFriendly || !filters.hijabFriendly.includes(product.hijabFriendly)) {
          return false;
        }
      }

      if (filters.sleeveLengths && filters.sleeveLengths.length > 0) {
        if (!product.sleeveLength || !filters.sleeveLengths.includes(product.sleeveLength)) {
          return false;
        }
      }

      if (filters.necklineCoverage && filters.necklineCoverage.length > 0) {
        if (!product.necklineCoverage || !filters.necklineCoverage.includes(product.necklineCoverage)) {
          return false;
        }
      }

      if (filters.lengthCategories && filters.lengthCategories.length > 0) {
        if (!product.lengthCategory || !filters.lengthCategories.includes(product.lengthCategory)) {
          return false;
        }
      }

      if (filters.fits && filters.fits.length > 0) {
        if (!product.fit || !filters.fits.includes(product.fit)) {
          return false;
        }
      }

      if (filters.opacity && filters.opacity.length > 0) {
        if (!product.opacity || !filters.opacity.includes(product.opacity)) {
          return false;
        }
      }

      if (filters.slitCoverage && filters.slitCoverage.length > 0) {
        if (!product.slitCoverage || !filters.slitCoverage.includes(product.slitCoverage)) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Handle filter changes from ProductFiltersComponent
   */
  onFiltersChange(filters: ProductFilters): void {
    this.currentFilters.set(filters);
  }
}

