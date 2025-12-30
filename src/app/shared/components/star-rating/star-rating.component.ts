import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() showReviewCount: boolean = false;
  @Input() reviewCount: number = 0;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get fullStars(): number {
    return Math.floor(this.rating);
  }

  get hasPartialStar(): boolean {
    const decimal = this.rating % 1;
    return decimal > 0 && decimal < 1;
  }

  get partialStarFill(): number {
    const decimal = this.rating % 1;
    return decimal * 100; // Return as percentage
  }

  get emptyStars(): number {
    return 5 - this.fullStars - (this.hasPartialStar ? 1 : 0);
  }

  get stars(): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  getStarClass(starIndex: number): string {
    const starNum = starIndex + 1;
    const fullStars = this.fullStars;
    const hasPartial = this.hasPartialStar;
    
    if (starNum <= fullStars) {
      return 'full';
    } else if (starNum === fullStars + 1 && hasPartial) {
      return 'partial';
    } else {
      return 'empty';
    }
  }
}

