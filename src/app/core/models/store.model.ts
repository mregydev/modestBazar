/**
 * Store domain entity
 *
 * Represents a store/shop in the ModestBazar marketplace.
 *
 * To extend with new fields:
 * 1. Add the field to this interface
 * 2. Update store-store.service.ts mock data
 * 3. Update StorePageComponent to display/edit the field
 * 4. When connecting to a real backend, map the field in the API service
 *
 * Future extensions could include:
 * - socialLinks: { instagram?: string, facebook?: string }
 * - location: { address: string, city: string, country: string }
 * - contactInfo: { phone?: string, email?: string }
 * - storeHours: { [day: string]: { open: string, close: string } }
 * - featuredProducts: string[] (product IDs)
 * - storeCategories: string[] (specialized categories)
 */
export interface Store {
  id: string;
  slug: string;        // for URL, e.g. "modest-boutique"
  name: string;
  description?: string;

  bannerImageUrl: string;
  logoImageUrl: string;

  ownerId: string;     // reference to store owner user
  productIds: string[]; // products belonging to this store

  visibleFilters?: string[];
  // e.g. ['category','size','color','price','modesty'] - which filter groups to show on store page
}

/**
 * Store Owner domain entity
 *
 * Represents a store owner who can manage their store.
 *
 * To extend with new fields:
 * 1. Add the field to this interface
 * 2. Update store-owner-auth.service.ts mock data
 * 3. Update StoreOwnerLoginComponent if needed
 * 4. When connecting to a real backend, implement proper authentication
 *
 * Future extensions could include:
 * - profileImage?: string
 * - phoneNumber?: string
 * - createdAt: Date
 * - lastLoginAt: Date
 * - permissions: string[] (for role-based access)
 */
export interface StoreOwner {
  id: string;
  email: string;
  passwordHash?: string; // for now can be mocked
  storeId: string;
  name?: string; // optional display name
}

