import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductStore } from '../../../core/state/product-store.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private productStore = inject(ProductStore);

  product = this.productStore.selectedProduct;
  extras = this.productStore.selectedExtrasProducts;

  total = computed(() => {
    const currentProduct = this.product();
    if (!currentProduct) return 0;
    const extrasTotal = this.extras().reduce((sum, e) => sum + e.price, 0);
    return currentProduct.price + extrasTotal;
  });

  buildWhatsAppUrl(): string {
    const phoneNumber = '201234567890'; // Placeholder - replace with actual number
    const baseUrl = `https://wa.me/${phoneNumber}`;

    if (!this.product()) {
      return baseUrl;
    }

    const mainProduct = this.product()!;
    const extras = this.extras();

    let text = `Hello, I'd like to order from ModestBazar:\n\n`;
    text += `- Main product: ${mainProduct.name} (ID: ${mainProduct.id})\n`;

    if (extras.length > 0) {
      text += `- Styling items:\n`;
      extras.forEach(extra => {
        text += `  • ${extra.name} (ID: ${extra.id})\n`;
      });
    }

    const encodedText = encodeURIComponent(text);
    return `${baseUrl}?text=${encodedText}`;
  }

  buildMessengerUrl(): string {
    // Placeholder - replace with actual page ID or username
    return 'https://m.me/ModestBazar';
  }
}

