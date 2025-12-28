import { Component, OnInit, signal, effect, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductStore } from '../../../core/state/product-store.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private productStore = inject(ProductStore);
  private route = inject(ActivatedRoute);

  product = this.productStore.selectedProduct;
  recommendations = signal<Product[]>([]);
  selectedSize = signal<string>('M');
  selectedExtras = this.productStore.selectedExtras;
  selectedColor = signal<string>('');
  currentImageIndex = signal(0);

  // Get available colors from all products
  availableColors = computed(() => {
    const products = this.productStore.products();
    const colors = new Set(products.map(p => p.colorFamily));
    return Array.from(colors).sort();
  });

  // Image magnifier signals
  showZoomLens = signal(false);
  lensX = signal(0);
  lensY = signal(0);
  zoomBackgroundPosition = signal('0% 0%');

  constructor() {
    // Effect to update recommendations when product changes
    effect(() => {
      const currentProduct = this.product();
      if (currentProduct) {
        const recs = this.productStore.getStylingRecommendationsFor(currentProduct);
        this.recommendations.set(recs);
      } else {
        this.recommendations.set([]);
      }
    });
  }

  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productStore.selectProduct(+id);
        this.currentImageIndex.set(0); // Reset to first image when product changes
        // Also update recommendations immediately after selecting product
        const selectedProduct = this.productStore.getProductById(+id);
        if (selectedProduct) {
          const recs = this.productStore.getStylingRecommendationsFor(selectedProduct);
          this.recommendations.set(recs);
        }
        // Scroll to top when route changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  nextImage(): void {
    const currentProduct = this.product();
    if (!currentProduct) return;
    const maxIndex = currentProduct.images.length - 1;
    const current = this.currentImageIndex();
    this.currentImageIndex.set(current < maxIndex ? current + 1 : 0);
  }

  previousImage(): void {
    const currentProduct = this.product();
    if (!currentProduct) return;
    const maxIndex = currentProduct.images.length - 1;
    const current = this.currentImageIndex();
    this.currentImageIndex.set(current > 0 ? current - 1 : maxIndex);
  }

  goToImage(index: number): void {
    this.currentImageIndex.set(index);
  }

  toggleExtra(productId: number): void {
    this.productStore.toggleExtra(productId);
  }

  isExtraSelected(productId: number): boolean {
    return this.selectedExtras().includes(productId);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onImageMouseEnter(): void {
    // Ensure zoom is ready when mouse enters
    this.showZoomLens.set(true);
  }

  onCarouselButtonHover(): void {
    // Hide magnifier when hovering over carousel buttons
    this.showZoomLens.set(false);
  }

  onImageMouseMove(event: MouseEvent): void {
    const container = event.currentTarget as HTMLElement;
    const target = event.target as HTMLElement;

    // Check if mouse is over a carousel button or its child elements
    if (target.closest('.carousel-btn')) {
      this.showZoomLens.set(false);
      return;
    }

    const img = container.querySelector('.product-image') as HTMLImageElement;
    if (!img) return;

    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    // Mouse position relative to container (for lens positioning)
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    // Mouse position relative to image (for zoom calculation)
    const imgX = event.clientX - imgRect.left;
    const imgY = event.clientY - imgRect.top;

    // Check if mouse is within image bounds
    if (imgX < 0 || imgX > imgRect.width || imgY < 0 || imgY > imgRect.height) {
      this.showZoomLens.set(false);
      return;
    }

    // Set lens position (centered on cursor via transform: translate(-50%, -50%))
    this.lensX.set(x);
    this.lensY.set(y);
    this.showZoomLens.set(true);

    // Calculate zoom background position (2.5x zoom = 250% background-size)
    // The background position should center the zoomed area under the cursor
    // Formula: position = (cursor position / image size) * 100%
    const zoomX = (imgX / imgRect.width) * 100;
    const zoomY = (imgY / imgRect.height) * 100;
    this.zoomBackgroundPosition.set(`${zoomX}% ${zoomY}%`);
  }

  onImageMouseLeave(): void {
    this.showZoomLens.set(false);
  }

  // Parse size guide and format it
  getFormattedSizeGuide(sizeGuide: string): Array<{size: string, details: string}> {
    if (!sizeGuide) return [];
    return sizeGuide.split(' | ').map(item => {
      const parts = item.split(': ');
      return {
        size: parts[0] || '',
        details: parts[1] || ''
      };
    });
  }

  onColorFilterChange(color: string): void {
    this.selectedColor.set(color);
    // Filter products by color - this would filter the product list
    // For now, we'll just store the selection
  }

  // Map color names to actual CSS colors
  getColorValue(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      'olive': '#808000',
      'black': '#000000',
      'cream': '#FFFDD0',
      'white': '#FFFFFF',
      'beige': '#F5F5DC',
      'brown': '#8B4513',
      'navy': '#000080',
      'gray': '#808080',
      'grey': '#808080',
      'red': '#FF0000',
      'blue': '#0000FF',
      'green': '#008000',
      'pink': '#FFC0CB',
      'purple': '#800080',
      'maroon': '#800000',
      'burgundy': '#800020',
      'tan': '#D2B48C',
      'khaki': '#C3B091'
    };
    return colorMap[colorName.toLowerCase()] || '#CCCCCC';
  }
}

