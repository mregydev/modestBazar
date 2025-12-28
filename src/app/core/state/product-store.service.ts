import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
  // Static product data
  // NOTE: Replace image URLs with actual Islamic abaya product images showing models wearing abayas
  // Recommended sources for abaya images:
  // - Pexels: https://www.pexels.com/search/islamic%20abaya/ or https://www.pexels.com/search/muslim%20woman/
  // - Pixabay: https://pixabay.com/images/search/arabic%20abaya%20design/
  // - Unsplash: Search for "abaya", "hijab", "modest fashion"
  // - Or upload your own product photos to a CDN (recommended for production)
  // Images should show abayas being worn by models in a modest, professional style
  private readonly _products = signal<Product[]>([
    {
      id: 1,
      name: 'Olive Loose Abaya',
      brand: 'Abbaya',
      price: 850,
      images: [
        'https://smyh.wordpress.com/wp-content/uploads/2014/01/cc175o1.jpg',
        'https://png.pngtree.com/png-clipart/20240907/original/pngtree-a-woman-hijab-suit-vector-no-face-for-photo-editing-png-image_15958548.png'
      ],
      category: 'abaya',
      colorFamily: 'olive',
      modestyAttributes: ['opaque', 'long_sleeve', 'maxi_length', 'loose_fit'],
      description: 'A beautifully crafted loose-fitting abaya in a rich olive color. Perfect for everyday wear with its modest design and comfortable fit.',
      sizeGuide: 'S: Chest 90cm, Length 150cm | M: Chest 95cm, Length 155cm | L: Chest 100cm, Length 160cm | XL: Chest 105cm, Length 165cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 3 },
        { type: 'inner_layer', productId: 4 }
      ]
    },
    {
      id: 2,
      name: 'Black Wide-Leg Pants',
      brand: 'Hijabi',
      price: 450,
      images: ['https://static.vecteezy.com/system/resources/previews/035/783/758/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'],
      category: 'pants',
      colorFamily: 'black',
      modestyAttributes: ['opaque', 'loose_fit', 'maxi_length'],
      description: 'Comfortable wide-leg pants in classic black. Perfect for pairing with abayas or long tops.',
      sizeGuide: 'S: Waist 70cm, Length 100cm | M: Waist 75cm, Length 102cm | L: Waist 80cm, Length 104cm | XL: Waist 85cm, Length 106cm',
      stylingRecommendations: [
        { type: 'inner_layer', productId: 4 },
        { type: 'hijab', productId: 3 }
      ]
    },
    {
      id: 3,
      name: 'Olive Chiffon Hijab',
      brand: 'Andalusya',
      price: 180,
      images: ['https://png.pngtree.com/png-clipart/20250123/original/pngtree-colorful-of-syrian-abaya-type-cloak-png-image_19726347.png'],
      category: 'hijab',
      colorFamily: 'olive',
      modestyAttributes: ['opaque', 'wudu_friendly'],
      description: 'Elegant chiffon hijab in matching olive color. Lightweight and breathable, perfect for all-day wear.',
      sizeGuide: 'One size fits all: 180cm x 70cm',
      stylingRecommendations: [
        { type: 'inner_layer', productId: 4 },
        { type: 'pants', productId: 2 }
      ]
    },
    {
      id: 4,
      name: 'Cream Inner Dress',
      brand: 'Tasneem',
      price: 320,
      images: ['https://static.vecteezy.com/system/resources/previews/015/943/189/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'],
      category: 'inner',
      colorFamily: 'cream',
      modestyAttributes: ['opaque', 'long_sleeve', 'loose_fit'],
      description: 'Versatile inner dress in soft cream color. Perfect as a base layer under abayas or as a standalone piece.',
      sizeGuide: 'S: Chest 88cm, Length 140cm | M: Chest 93cm, Length 145cm | L: Chest 98cm, Length 150cm | XL: Chest 103cm, Length 155cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 3 },
        { type: 'pants', productId: 2 }
      ]
    }
  ]);

  private readonly _selectedProductId = signal<number | null>(null);
  private readonly _selectedExtras = signal<number[]>([]);

  // Public signals
  readonly products = this._products.asReadonly();
  readonly selectedProductId = this._selectedProductId.asReadonly();
  readonly selectedExtras = this._selectedExtras.asReadonly();

  // Computed signals
  readonly selectedProduct = computed(() => {
    const id = this._selectedProductId();
    if (!id) return undefined;
    return this._products().find(p => p.id === id);
  });

  readonly selectedExtrasProducts = computed(() => {
    const extraIds = this._selectedExtras();
    return this._products().filter(p => extraIds.includes(p.id));
  });

  // Methods
  selectProduct(id: number): void {
    this._selectedProductId.set(id);
    this._selectedExtras.set([]);
  }

  toggleExtra(productId: number): void {
    const current = this._selectedExtras();
    if (current.includes(productId)) {
      this._selectedExtras.set(current.filter(id => id !== productId));
    } else {
      this._selectedExtras.set([...current, productId]);
    }
  }

  getProductById(id: number): Product | undefined {
    return this._products().find(p => p.id === id);
  }

  getStylingRecommendationsFor(product: Product): Product[] {
    if (product.stylingRecommendations && product.stylingRecommendations.length > 0) {
      return product.stylingRecommendations
        .map(rec => this.getProductById(rec.productId))
        .filter((p): p is Product => p !== undefined);
    }

    // Fallback: same colorFamily, category in ['hijab', 'inner']
    return this._products().filter(p =>
      p.id !== product.id &&
      p.colorFamily === product.colorFamily &&
      (p.category === 'hijab' || p.category === 'inner')
    );
  }
}

