export type ModestyAttribute =
  | 'opaque'
  | 'needs_layer'
  | 'long_sleeve'
  | 'wudu_friendly'
  | 'nursing_friendly'
  | 'loose_fit'
  | 'maxi_length';

export type StylingType =
  | 'hijab'
  | 'inner_layer'
  | 'cardigan'
  | 'pants'
  | 'accessory';

/**
 * Product domain entity
 *
 * To extend with new attributes:
 * 1. Add the field to this interface
 * 2. Update product-store.service.ts mock data
 * 3. Add filter option in ProductFiltersComponent if needed
 * 4. Update product-details.component.html to display the attribute
 */
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  images: string[];
  category: 'abaya' | 'dress' | 'top' | 'pants' | 'set' | 'hijab' | 'inner';
  colorFamily: string;
  modestyAttributes: ModestyAttribute[];
  description: string;
  sizeGuide: string;
  stylingRecommendations?: {
    type: StylingType;
    productId: number;
  }[];

  // Store relationship
  storeId?: string;           // ID of the store that owns this product

  // Extended attributes for filtering
  sizes?: string[];           // e.g. ['XS', 'S', 'M', 'L', 'XL']
  colors?: string[];           // e.g. ['black', 'navy', 'burgundy']
  patternType?: string;       // 'Solid', 'Plaid', 'Striped', 'Floral', etc.
  material?: string;           // 'Cotton', 'Chiffon', 'Denim', etc.
  occasions?: string[];       // ['Casual', 'Work', 'Evening', 'Party']

  // Extended modesty attributes
  hijabFriendly?: 'yes' | 'maybe' | 'no';
  sleeveLength?: 'sleeveless' | 'short' | 'threeQuarter' | 'long';
  necklineCoverage?: 'high' | 'medium' | 'low';
  lengthCategory?: 'crop' | 'short' | 'midi' | 'maxi';
  fit?: 'slim' | 'regular' | 'loose';
  opacity?: 'opaque' | 'semiSheer';
  slitCoverage?: 'noSlit' | 'smallSideSlit' | 'highSlit';
}

/**
 * Product filters interface for filtering products
 *
 * To add a new filter group:
 * 1. Add the field to this interface
 * 2. Add form control in ProductFiltersComponent
 * 3. Add filter logic in ProductListComponent.onFiltersChange()
 * 4. Add available values computation in ProductListComponent
 */
export interface ProductFilters {
  categories?: string[];
  sizes?: string[];
  colors?: string[];
  minPrice?: number | null;
  maxPrice?: number | null;
  patternTypes?: string[];
  materials?: string[];
  occasions?: string[];
  brands?: string[];
  hijabFriendly?: string[];
  sleeveLengths?: string[];
  necklineCoverage?: string[];
  lengthCategories?: string[];
  fits?: string[];
  opacity?: string[];
  slitCoverage?: string[];
}

