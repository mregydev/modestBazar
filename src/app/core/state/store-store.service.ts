import { Injectable, signal, computed } from '@angular/core';
import { Store } from '../models/store.model';

/**
 * Store Store Service
 *
 * Manages store data and state using signals.
 *
 * To connect to a real backend:
 * 1. Inject HttpClient
 * 2. Replace mock data with API calls
 * 3. Add error handling
 * 4. Add loading states
 * 5. Implement caching if needed
 */
@Injectable({
  providedIn: 'root'
})
export class StoreStore {
  private readonly _stores = signal<Store[]>([
    {
      id: 'store-1',
      slug: 'abbaya',
      name: 'Abbaya',
      description: 'Your one-stop shop for elegant and modest fashion. We curate the finest abayas, dresses, and accessories.',
      bannerImageUrl: 'https://www.shutterstock.com/image-photo/banner-young-muslim-woman-holding-260nw-2565436853.jpg',
      logoImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVQxiIEZL7IdQMTtnnzRomseToZvJtoerEhA&s',
      ownerId: 'owner-1',
      productIds: ['1', '2', '3'],
      visibleFilters: ['category', 'size', 'color', 'price', 'modesty']
    },
    {
      id: 'store-2',
      slug: 'hijabi',
      name: 'Hijabi',
      description: 'Premium modest wear for the modern Muslim woman. Quality fabrics, elegant designs.',
      bannerImageUrl: 'https://www.shutterstock.com/image-photo/banner-young-muslim-woman-holding-260nw-2565436853.jpg',
      logoImageUrl: 'https://t4.ftcdn.net/jpg/05/01/43/47/360_F_501434733_S0OxxWfqztfkeT1QMmAow0qWXDC6LAWh.jpg',
      ownerId: 'owner-2',
      productIds: ['4'],
      visibleFilters: ['category', 'size', 'color', 'price']
    },
    {
      id: 'store-3',
      slug: 'andalusya',
      name: 'Andalusya',
      description: 'Luxury abayas and modest fashion pieces. Handcrafted with attention to detail.',
      bannerImageUrl: 'https://www.shutterstock.com/image-photo/banner-young-muslim-woman-holding-260nw-2565436853.jpg',
      logoImageUrl: 'https://marketplace.canva.com/EAGTpHJevAg/1/0/1600w/canva-brown-minimalistic-abstract-fashion-brand-logo-ABoOPrHi6D8.jpg',
      ownerId: 'owner-3',
      productIds: ['1', '3'],
      visibleFilters: ['category', 'size', 'color', 'price', 'modesty', 'material']
    },
    {
      id: 'store-4',
      slug: 'tasneem',
      name: 'Tasneem',
      description: 'Elegant and sophisticated modest fashion for the modern woman.',
      bannerImageUrl: 'https://www.shutterstock.com/image-photo/banner-young-muslim-woman-holding-260nw-2565436853.jpg',
      logoImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVQxiIEZL7IdQMTtnnzRomseToZvJtoerEhA&s',
      ownerId: 'owner-4',
      productIds: [],
      visibleFilters: ['category', 'size', 'color', 'price', 'modesty']
    }
  ]);

  readonly stores = computed(() => this._stores());

  /**
   * Get store by ID
   */
  getStoreById(id: string): Store | undefined {
    return this._stores().find(store => store.id === id);
  }

  /**
   * Get store by slug
   */
  getStoreBySlug(slug: string): Store | undefined {
    return this._stores().find(store => store.slug === slug);
  }

  /**
   * Get store by owner ID
   */
  getStoreByOwnerId(ownerId: string): Store | undefined {
    return this._stores().find(store => store.ownerId === ownerId);
  }

  /**
   * Get store by name (brand name)
   */
  getStoreByName(name: string): Store | undefined {
    return this._stores().find(store => store.name === name);
  }

  /**
   * Update store (for store owner editing)
   * In a real app, this would make an API call
   */
  updateStore(storeId: string, updates: Partial<Store>): void {
    const stores = this._stores();
    const index = stores.findIndex(s => s.id === storeId);
    if (index !== -1) {
      const updated = { ...stores[index], ...updates };
      const newStores = [...stores];
      newStores[index] = updated;
      this._stores.set(newStores);
    }
  }
}

