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
}

