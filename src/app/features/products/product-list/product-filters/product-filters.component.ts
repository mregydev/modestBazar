import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ProductFilters } from '../../../../core/models/product.model';

/**
 * ProductFiltersComponent
 *
 * Displays a collapsible filters sidebar for filtering products.
 * Uses Reactive Forms with debounced value changes.
 *
 * To add a new filter group:
 * 1. Add the field to ProductFilters interface
 * 2. Add form control in buildForm()
 * 3. Add UI section in template
 * 4. Add available values to AvailableFilters interface
 */
@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.css'
})
export class ProductFiltersComponent implements OnInit, OnDestroy {
  @Input() availableFilters!: AvailableFilters;
  @Input() currentFilters?: ProductFilters;
  @Input() enabledGroups?: string[]; // e.g. ['category', 'size', 'color', 'price', 'modesty']
  @Output() filtersChange = new EventEmitter<ProductFilters>();

  filterForm!: FormGroup;
  private destroy$ = new Subject<void>();

  // Collapsible sections state
  expandedSections: { [key: string]: boolean } = {
    category: true,
    size: true,
    color: true,
    price: true,
    patternType: false,
    material: false,
    occasion: false,
    brand: false,
    modesty: false
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.setupFormListeners();

    // Initialize from currentFilters if provided
    if (this.currentFilters) {
      this.filterForm.patchValue(this.currentFilters, { emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm(): void {
    this.filterForm = this.fb.group({
      categories: [[]],
      sizes: [[]],
      colors: [[]],
      minPrice: [null],
      maxPrice: [null],
      patternTypes: [[]],
      materials: [[]],
      occasions: [[]],
      brands: [[]],
      hijabFriendly: [[]],
      sleeveLengths: [[]],
      necklineCoverage: [[]],
      lengthCategories: [[]],
      fits: [[]],
      opacity: [[]],
      slitCoverage: [[]]
    });
  }

  private setupFormListeners(): void {
    // Debounce form value changes by 200ms before emitting
    this.filterForm.valueChanges
      .pipe(
        debounceTime(200),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.filtersChange.emit(value);
      });
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  isSectionExpanded(section: string): boolean {
    return this.expandedSections[section] ?? false;
  }

  /**
   * Check if a filter group should be displayed
   * If enabledGroups is not provided, show all groups
   */
  isGroupEnabled(groupName: string): boolean {
    if (!this.enabledGroups || this.enabledGroups.length === 0) {
      return true; // Show all if not specified
    }
    return this.enabledGroups.includes(groupName);
  }

  onCheckboxChange(controlName: string, value: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const currentValue = this.filterForm.get(controlName)?.value || [];

    if (checkbox.checked) {
      this.filterForm.patchValue({
        [controlName]: [...currentValue, value]
      }, { emitEvent: true });
    } else {
      this.filterForm.patchValue({
        [controlName]: currentValue.filter((v: string) => v !== value)
      }, { emitEvent: true });
    }
  }

  isChecked(controlName: string, value: string): boolean {
    const currentValue = this.filterForm.get(controlName)?.value || [];
    return currentValue.includes(value);
  }

  clearAllFilters(): void {
    this.filterForm.reset({
      categories: [],
      sizes: [],
      colors: [],
      minPrice: null,
      maxPrice: null,
      patternTypes: [],
      materials: [],
      occasions: [],
      brands: [],
      hijabFriendly: [],
      sleeveLengths: [],
      necklineCoverage: [],
      lengthCategories: [],
      fits: [],
      opacity: [],
      slitCoverage: []
    });
  }

  getColorValue(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      'black': '#000000',
      'white': '#FFFFFF',
      'navy': '#000080',
      'burgundy': '#800020',
      'beige': '#F5F5DC',
      'olive': '#808000',
      'cream': '#FFFDD0',
      'brown': '#8B4513',
      'gray': '#808080',
      'grey': '#808080',
      'red': '#FF0000',
      'blue': '#0000FF',
      'green': '#008000',
      'pink': '#FFC0CB',
      'purple': '#800080',
      'maroon': '#800000',
      'tan': '#D2B48C',
      'khaki': '#C3B091'
    };
    return colorMap[colorName.toLowerCase()] || '#CCCCCC';
  }

  getCategoryLabel(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'abaya': 'Women Abayas',
      'dress': 'Women Dresses',
      'top': 'Women Tops, Blouses & Tee',
      'pants': 'Women Bottoms',
      'set': 'Women Sets',
      'hijab': 'Hijabs',
      'inner': 'Inner Layers'
    };
    return categoryMap[category] || category;
  }

  getSleeveLengthLabel(value: string): string {
    const labelMap: { [key: string]: string } = {
      'sleeveless': 'Sleeveless',
      'short': 'Short',
      'threeQuarter': '3/4',
      'long': 'Long'
    };
    return labelMap[value] || value;
  }

  getSlitCoverageLabel(value: string): string {
    const labelMap: { [key: string]: string } = {
      'noSlit': 'No slit',
      'smallSideSlit': 'Small side slit',
      'highSlit': 'High slit'
    };
    return labelMap[value] || value;
  }
}

/**
 * Available filters computed from all products
 */
export interface AvailableFilters {
  categories: string[];
  sizes: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  patternTypes: string[];
  materials: string[];
  occasions: string[];
  brands: string[];
  hijabFriendly: string[];
  sleeveLengths: string[];
  necklineCoverage: string[];
  lengthCategories: string[];
  fits: string[];
  opacity: string[];
  slitCoverage: string[];
}

