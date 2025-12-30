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
      storeId: 'store-1',
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
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['olive'],
      patternType: 'Solid',
      material: 'Polyester',
      occasions: ['Casual', 'Everyday', 'Work'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.5,
      reviewCount: 128
    },
    {
      id: 2,
      name: 'Black Wide-Leg Pants',
      brand: 'Hijabi',
      price: 450,
      storeId: 'store-1',
      images: ['https://static.vecteezy.com/system/resources/previews/035/783/758/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'],
      category: 'pants',
      colorFamily: 'black',
      modestyAttributes: ['opaque', 'loose_fit', 'maxi_length'],
      description: 'Comfortable wide-leg pants in classic black. Perfect for pairing with abayas or long tops.',
      sizeGuide: 'S: Waist 70cm, Length 100cm | M: Waist 75cm, Length 102cm | L: Waist 80cm, Length 104cm | XL: Waist 85cm, Length 106cm',
      stylingRecommendations: [
        { type: 'inner_layer', productId: 4 },
        { type: 'hijab', productId: 3 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black'],
      patternType: 'Solid',
      material: 'Cotton',
      occasions: ['Casual', 'Work', 'Everyday'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.2,
      reviewCount: 95
    },
    {
      id: 3,
      name: 'Olive Chiffon Hijab',
      brand: 'Andalusya',
      price: 180,
      storeId: 'store-1',
      images: ['https://png.pngtree.com/png-clipart/20250123/original/pngtree-colorful-of-syrian-abaya-type-cloak-png-image_19726347.png'],
      category: 'hijab',
      colorFamily: 'olive',
      modestyAttributes: ['opaque', 'wudu_friendly'],
      description: 'Elegant chiffon hijab in matching olive color. Lightweight and breathable, perfect for all-day wear.',
      sizeGuide: 'One size fits all: 180cm x 70cm',
      stylingRecommendations: [
        { type: 'inner_layer', productId: 4 },
        { type: 'pants', productId: 2 }
      ],
      sizes: ['One Size'],
      colors: ['olive'],
      patternType: 'Solid',
      material: 'Chiffon',
      occasions: ['Casual', 'Everyday', 'Work'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'regular',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.8,
      reviewCount: 203
    },
    {
      id: 4,
      name: 'Cream Inner Dress',
      brand: 'Tasneem',
      price: 320,
      storeId: 'store-2',
      images: ['https://static.vecteezy.com/system/resources/previews/015/943/189/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'],
      category: 'inner',
      colorFamily: 'cream',
      modestyAttributes: ['opaque', 'long_sleeve', 'loose_fit'],
      description: 'Versatile inner dress in soft cream color. Perfect as a base layer under abayas or as a standalone piece.',
      sizeGuide: 'S: Chest 88cm, Length 140cm | M: Chest 93cm, Length 145cm | L: Chest 98cm, Length 150cm | XL: Chest 103cm, Length 155cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 3 },
        { type: 'pants', productId: 2 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['cream', 'beige'],
      patternType: 'Solid',
      material: 'Cotton',
      occasions: ['Casual', 'Everyday', 'Work'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'midi',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.6,
      reviewCount: 156
    },
    {
      id: 5,
      name: 'Black Classic Abaya',
      brand: 'Abbaya',
      price: 920,
      storeId: 'store-1',
      images: [
        'https://www.shutterstock.com/image-photo/arab-women-traditional-designer-abaya-600nw-2521433873.jpg',
        'https://png.pngtree.com/png-clipart/20240907/original/pngtree-a-woman-hijab-suit-vector-no-face-for-photo-editing-png-image_15958548.png'
      ],
      category: 'abaya',
      colorFamily: 'black',
      modestyAttributes: ['opaque', 'long_sleeve', 'maxi_length', 'loose_fit'],
      description: 'Timeless black abaya with elegant design. Perfect for formal occasions and everyday elegance.',
      sizeGuide: 'S: Chest 92cm, Length 152cm | M: Chest 97cm, Length 157cm | L: Chest 102cm, Length 162cm | XL: Chest 107cm, Length 167cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 6 },
        { type: 'inner_layer', productId: 4 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black'],
      patternType: 'Solid',
      material: 'Polyester',
      occasions: ['Formal', 'Work', 'Everyday'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.7,
      reviewCount: 189
    },
    {
      id: 6,
      name: 'Black Chiffon Hijab',
      brand: 'Andalusya',
      price: 195,
      storeId: 'store-1',
      images: ['https://png.pngtree.com/png-clipart/20250123/original/pngtree-colorful-of-syrian-abaya-type-cloak-png-image_19726347.png'],
      category: 'hijab',
      colorFamily: 'black',
      modestyAttributes: ['opaque', 'wudu_friendly'],
      description: 'Classic black chiffon hijab. Versatile and elegant, matches with any outfit.',
      sizeGuide: 'One size fits all: 180cm x 70cm',
      stylingRecommendations: [
        { type: 'inner_layer', productId: 4 },
        { type: 'pants', productId: 2 }
      ],
      sizes: ['One Size'],
      colors: ['black'],
      patternType: 'Solid',
      material: 'Chiffon',
      occasions: ['Casual', 'Formal', 'Work'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'regular',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.9,
      reviewCount: 267
    },
    {
      id: 7,
      name: 'Navy Blue Abaya',
      brand: 'Hijabi',
      price: 880,
      storeId: 'store-1',
      images: [
        'https://smyh.wordpress.com/wp-content/uploads/2014/01/cc175o1.jpg',
        'https://static.vecteezy.com/system/resources/previews/035/783/758/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'
      ],
      category: 'abaya',
      colorFamily: 'navy',
      modestyAttributes: ['opaque', 'long_sleeve', 'maxi_length', 'loose_fit'],
      description: 'Elegant navy blue abaya with modern cut. Comfortable and stylish for any occasion.',
      sizeGuide: 'S: Chest 91cm, Length 151cm | M: Chest 96cm, Length 156cm | L: Chest 101cm, Length 161cm | XL: Chest 106cm, Length 166cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 8 },
        { type: 'inner_layer', productId: 9 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['navy', 'blue'],
      patternType: 'Solid',
      material: 'Polyester',
      occasions: ['Casual', 'Work', 'Formal'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.4,
      reviewCount: 142
    },
    {
      id: 8,
      name: 'Navy Blue Hijab',
      brand: 'Andalusya',
      price: 175,
      storeId: 'store-1',
      images: ['https://png.pngtree.com/png-clipart/20250123/original/pngtree-colorful-of-syrian-abaya-type-cloak-png-image_19726347.png'],
      category: 'hijab',
      colorFamily: 'navy',
      modestyAttributes: ['opaque', 'wudu_friendly'],
      description: 'Beautiful navy blue hijab in premium chiffon. Perfect complement to navy abayas.',
      sizeGuide: 'One size fits all: 180cm x 70cm',
      stylingRecommendations: [
        { type: 'inner_layer', productId: 9 },
        { type: 'pants', productId: 10 }
      ],
      sizes: ['One Size'],
      colors: ['navy', 'blue'],
      patternType: 'Solid',
      material: 'Chiffon',
      occasions: ['Casual', 'Work', 'Formal'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'regular',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.6,
      reviewCount: 178
    },
    {
      id: 9,
      name: 'Beige Inner Dress',
      brand: 'Tasneem',
      price: 340,
      storeId: 'store-2',
      images: ['https://static.vecteezy.com/system/resources/previews/015/943/189/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'],
      category: 'inner',
      colorFamily: 'cream',
      modestyAttributes: ['opaque', 'long_sleeve', 'loose_fit'],
      description: 'Comfortable beige inner dress. Soft fabric perfect for layering under abayas.',
      sizeGuide: 'S: Chest 89cm, Length 141cm | M: Chest 94cm, Length 146cm | L: Chest 99cm, Length 151cm | XL: Chest 104cm, Length 156cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 6 },
        { type: 'pants', productId: 2 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['beige', 'cream'],
      patternType: 'Solid',
      material: 'Cotton',
      occasions: ['Casual', 'Everyday', 'Work'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'midi',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.5,
      reviewCount: 134
    },
    {
      id: 10,
      name: 'Navy Wide-Leg Pants',
      brand: 'Hijabi',
      price: 480,
      storeId: 'store-1',
      images: ['https://static.vecteezy.com/system/resources/previews/035/783/758/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'],
      category: 'pants',
      colorFamily: 'navy',
      modestyAttributes: ['opaque', 'loose_fit', 'maxi_length'],
      description: 'Stylish navy wide-leg pants. Comfortable fit perfect for modest styling.',
      sizeGuide: 'S: Waist 71cm, Length 101cm | M: Waist 76cm, Length 103cm | L: Waist 81cm, Length 105cm | XL: Waist 86cm, Length 107cm',
      stylingRecommendations: [
        { type: 'inner_layer', productId: 9 },
        { type: 'hijab', productId: 8 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['navy', 'blue'],
      patternType: 'Solid',
      material: 'Cotton',
      occasions: ['Casual', 'Work', 'Formal'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.3,
      reviewCount: 112
    },
    {
      id: 11,
      name: 'Burgundy Elegant Abaya',
      brand: 'Abbaya',
      price: 950,
      storeId: 'store-1',
      images: [
        'https://www.shutterstock.com/image-photo/arab-women-traditional-designer-abaya-600nw-2521433873.jpg',
        'https://png.pngtree.com/png-clipart/20240907/original/pngtree-a-woman-hijab-suit-vector-no-face-for-photo-editing-png-image_15958548.png'
      ],
      category: 'abaya',
      colorFamily: 'burgundy',
      modestyAttributes: ['opaque', 'long_sleeve', 'maxi_length', 'loose_fit'],
      description: 'Stunning burgundy abaya with elegant details. Perfect for special occasions.',
      sizeGuide: 'S: Chest 90cm, Length 150cm | M: Chest 95cm, Length 155cm | L: Chest 100cm, Length 160cm | XL: Chest 105cm, Length 165cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 12 },
        { type: 'inner_layer', productId: 4 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['burgundy', 'maroon'],
      patternType: 'Solid',
      material: 'Polyester',
      occasions: ['Formal', 'Special Occasions'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.8,
      reviewCount: 201
    },
    {
      id: 12,
      name: 'Burgundy Chiffon Hijab',
      brand: 'Andalusya',
      price: 190,
      storeId: 'store-1',
      images: ['https://png.pngtree.com/png-clipart/20250123/original/pngtree-colorful-of-syrian-abaya-type-cloak-png-image_19726347.png'],
      category: 'hijab',
      colorFamily: 'burgundy',
      modestyAttributes: ['opaque', 'wudu_friendly'],
      description: 'Rich burgundy hijab in premium chiffon. Adds elegance to any outfit.',
      sizeGuide: 'One size fits all: 180cm x 70cm',
      stylingRecommendations: [
        { type: 'inner_layer', productId: 4 },
        { type: 'pants', productId: 2 }
      ],
      sizes: ['One Size'],
      colors: ['burgundy', 'maroon'],
      patternType: 'Solid',
      material: 'Chiffon',
      occasions: ['Formal', 'Special Occasions'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'regular',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.7,
      reviewCount: 189
    },
    {
      id: 13,
      name: 'Grey Modest Dress',
      brand: 'Tasneem',
      price: 680,
      storeId: 'store-2',
      images: ['https://static.vecteezy.com/system/resources/previews/015/943/189/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'],
      category: 'dress',
      colorFamily: 'grey',
      modestyAttributes: ['opaque', 'long_sleeve', 'maxi_length', 'loose_fit'],
      description: 'Elegant grey modest dress. Versatile piece perfect for work and casual occasions.',
      sizeGuide: 'S: Chest 90cm, Length 145cm | M: Chest 95cm, Length 150cm | L: Chest 100cm, Length 155cm | XL: Chest 105cm, Length 160cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 14 },
        { type: 'pants', productId: 2 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['grey', 'gray'],
      patternType: 'Solid',
      material: 'Polyester',
      occasions: ['Work', 'Casual', 'Everyday'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.5,
      reviewCount: 167
    },
    {
      id: 14,
      name: 'Grey Chiffon Hijab',
      brand: 'Andalusya',
      price: 185,
      storeId: 'store-1',
      images: ['https://png.pngtree.com/png-clipart/20250123/original/pngtree-colorful-of-syrian-abaya-type-cloak-png-image_19726347.png'],
      category: 'hijab',
      colorFamily: 'grey',
      modestyAttributes: ['opaque', 'wudu_friendly'],
      description: 'Sophisticated grey hijab. Neutral color that pairs with everything.',
      sizeGuide: 'One size fits all: 180cm x 70cm',
      stylingRecommendations: [
        { type: 'inner_layer', productId: 4 },
        { type: 'pants', productId: 2 }
      ],
      sizes: ['One Size'],
      colors: ['grey', 'gray'],
      patternType: 'Solid',
      material: 'Chiffon',
      occasions: ['Casual', 'Work', 'Everyday'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'maxi',
      fit: 'regular',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.6,
      reviewCount: 198
    },
    {
      id: 15,
      name: 'White Long Sleeve Top',
      brand: 'Hijabi',
      price: 380,
      storeId: 'store-1',
      images: ['https://static.vecteezy.com/system/resources/previews/035/783/758/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'],
      category: 'top',
      colorFamily: 'white',
      modestyAttributes: ['opaque', 'long_sleeve', 'loose_fit'],
      description: 'Classic white long sleeve top. Perfect for layering or wearing alone.',
      sizeGuide: 'S: Chest 88cm, Length 70cm | M: Chest 93cm, Length 72cm | L: Chest 98cm, Length 74cm | XL: Chest 103cm, Length 76cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 6 },
        { type: 'pants', productId: 2 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['white'],
      patternType: 'Solid',
      material: 'Cotton',
      occasions: ['Casual', 'Work', 'Everyday'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'short',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.4,
      reviewCount: 145
    },
    {
      id: 16,
      name: 'Beige Long Sleeve Top',
      brand: 'Tasneem',
      price: 360,
      storeId: 'store-2',
      images: ['https://static.vecteezy.com/system/resources/previews/015/943/189/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg'],
      category: 'top',
      colorFamily: 'cream',
      modestyAttributes: ['opaque', 'long_sleeve', 'loose_fit'],
      description: 'Comfortable beige top. Versatile piece for everyday wear.',
      sizeGuide: 'S: Chest 87cm, Length 69cm | M: Chest 92cm, Length 71cm | L: Chest 97cm, Length 73cm | XL: Chest 102cm, Length 75cm',
      stylingRecommendations: [
        { type: 'hijab', productId: 3 },
        { type: 'pants', productId: 10 }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['beige', 'cream'],
      patternType: 'Solid',
      material: 'Cotton',
      occasions: ['Casual', 'Everyday'],
      hijabFriendly: 'yes',
      sleeveLength: 'long',
      necklineCoverage: 'high',
      lengthCategory: 'short',
      fit: 'loose',
      opacity: 'opaque',
      slitCoverage: 'noSlit',
      rating: 4.3,
      reviewCount: 98
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

  /**
   * Get similar products for a given product
   * Similar products are those in the same category, excluding the current product
   * If no products in the same category, returns products with similar attributes
   */
  getSimilarProducts(product: Product, limit: number = 10): Product[] {
    // First, try to get products in the same category
    const sameCategory = this._products().filter(p =>
      p.id !== product.id &&
      p.category === product.category
    );

    if (sameCategory.length > 0) {

      return sameCategory.slice(0, limit);
    }

    // Fallback: products with similar color family or modesty attributes
    const similar = this._products().filter(p =>
      p.id !== product.id &&
      (p.colorFamily === product.colorFamily ||
       p.modestyAttributes.some(attr => product.modestyAttributes.includes(attr)))
    );

    return similar.slice(0, limit);
  }
}

