import { Injectable, signal, computed, effect } from '@angular/core';

export type Language = 'en' | 'ar';

export interface Translations {
  [key: string]: string | Translations;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly _currentLanguage = signal<Language>('en');

  readonly currentLanguage = this._currentLanguage.asReadonly();
  readonly isRTL = computed(() => this._currentLanguage() === 'ar');

  private translations: Record<Language, Translations> = {
    en: {
      // Header
      'header.logo': 'ModestBazar',
      'header.products': 'Products',
      'header.login': 'Login',
      'header.logout': 'Logout',
      'header.search.placeholder': 'Search products...',
      'header.language.select': 'Select language',
      'header.store.owner.login': 'Login for store owner',
      'header.store.my': 'My Store',
      'header.store.logout': 'Store Logout',
      'header.greeting': 'Hi, {{name}}',

      // Product List
      'productList.title': 'Curated Modest Pieces',
      'productList.subtitle': 'All items are selected for hijabi-friendly, modest cuts, opacity and length.',
      'productList.results.found': '{{count}} product{{count, plural, =1 {} other {s}}} found',
      'productList.results.none': 'No products found',
      'productList.filters.show': 'Show filters',
      'productList.filters.hide': 'Hide filters',

      // Filters
      'filters.title': 'Filter',
      'filters.clearAll': 'Clear all',
      'filters.category': 'Category',
      'filters.size': 'Size',
      'filters.color': 'Color',
      'filters.price': 'Price',
      'filters.patternType': 'Pattern Type',
      'filters.material': 'Material',
      'filters.occasion': 'Occasion',
      'filters.brand': 'Brand',
      'filters.modesty': 'Modesty Attributes',
      'filters.hijabFriendly': 'Hijab Friendly',
      'filters.sleeveLength': 'Sleeve Length',
      'filters.necklineCoverage': 'Neckline Coverage',
      'filters.lengthCategory': 'Length',
      'filters.fit': 'Fit',
      'filters.opacity': 'Opacity',
      'filters.slitCoverage': 'Slit Coverage',
      'filters.price.min': 'Min',
      'filters.price.max': 'Max',
      'filters.price.range': 'Range: {{min}} - {{max}} EGP',

      // Product Details
      'productDetails.back': '← Back to products',
      'productDetails.modestyAttributes': 'Modesty Attributes',
      'productDetails.sizeLength': 'Size & Length',
      'productDetails.selectSize': 'Select Size:',
      'productDetails.description': 'Description',
      'productDetails.completeLook': 'Complete the modest look',
      'productDetails.similarProducts': 'Similar Products',
      'productDetails.addToOrder': 'Add to my order',
      'productDetails.noRecommendations': 'No styling recommendations available for this product.',
      'productDetails.checkout': 'Continue to WhatsApp checkout',
      'productDetails.notFound': 'Product not found',

      // Store Page
      'storePage.products.found': '{{count}} product{{count, plural, =1 {} other {s}}} found',
      'storePage.products.none': 'No products found',
      'storePage.filters.show': 'Show filters',
      'storePage.filters.hide': 'Hide filters',
      'storePage.edit.banner': 'Edit Banner',
      'storePage.edit.logo': 'Edit Logo',
      'storePage.loading': 'Loading store...',

      // Checkout
      'checkout.title': 'Checkout',
      'checkout.noProduct': 'No product selected yet.',
      'checkout.backToProducts': 'Back to products',
      'checkout.mainProduct': 'Main Product',
      'checkout.stylingItems': 'Styling Items',
      'checkout.whatsapp': 'Contact via WhatsApp',
      'checkout.messenger': 'Contact via Messenger',

      // Auth
      'auth.login.title': 'Login',
      'auth.login.email': 'Email',
      'auth.login.password': 'Password',
      'auth.login.submit': 'Login',
      'auth.login.demo': 'Demo Credentials',
      'auth.signup.title': 'Sign Up',
      'auth.signup.name': 'Name',
      'auth.signup.email': 'Email',
      'auth.signup.password': 'Password',
      'auth.signup.submit': 'Sign Up',
      'auth.signup.demo': 'Demo Credentials',

      // Common
      'common.egp': 'EGP',
      'common.yes': 'Yes',
      'common.no': 'No',
      'common.maybe': 'Maybe',
      'common.opaque': 'Opaque',
      'common.semiSheer': 'Semi-sheer',
      'common.clear': 'Clear all filters',
      'common.loading': 'Loading...',
    },
    ar: {
      // Header
      'header.logo': 'موديست بازار',
      'header.products': 'المنتجات',
      'header.login': 'تسجيل الدخول',
      'header.logout': 'تسجيل الخروج',
      'header.search.placeholder': 'البحث عن المنتجات...',
      'header.language.select': 'اختر اللغة',
      'header.store.owner.login': 'تسجيل دخول صاحب المتجر',
      'header.store.my': 'متجري',
      'header.store.logout': 'تسجيل خروج المتجر',
      'header.greeting': 'مرحباً، {{name}}',

      // Product List
      'productList.title': 'قطع متواضعة مختارة',
      'productList.subtitle': 'جميع العناصر مختارة لتكون مناسبة للمحجبات، مع قطع متواضعة، عتامة وطول مناسب.',
      'productList.results.found': 'تم العثور على {{count}} منتج',
      'productList.results.none': 'لم يتم العثور على منتجات',
      'productList.filters.show': 'إظهار الفلاتر',
      'productList.filters.hide': 'إخفاء الفلاتر',

      // Filters
      'filters.title': 'فلتر',
      'filters.clearAll': 'مسح الكل',
      'filters.category': 'الفئة',
      'filters.size': 'المقاس',
      'filters.color': 'اللون',
      'filters.price': 'السعر',
      'filters.patternType': 'نوع النمط',
      'filters.material': 'المادة',
      'filters.occasion': 'المناسبة',
      'filters.brand': 'العلامة التجارية',
      'filters.modesty': 'خصائص الحياء',
      'filters.hijabFriendly': 'مناسب للحجاب',
      'filters.sleeveLength': 'طول الكم',
      'filters.necklineCoverage': 'تغطية خط العنق',
      'filters.lengthCategory': 'الطول',
      'filters.fit': 'القصة',
      'filters.opacity': 'العتامة',
      'filters.slitCoverage': 'تغطية الشق',
      'filters.price.min': 'الحد الأدنى',
      'filters.price.max': 'الحد الأقصى',
      'filters.price.range': 'النطاق: {{min}} - {{max}} جنيه',

      // Product Details
      'productDetails.back': '← العودة إلى المنتجات',
      'productDetails.modestyAttributes': 'خصائص الحياء',
      'productDetails.sizeLength': 'المقاس والطول',
      'productDetails.selectSize': 'اختر المقاس:',
      'productDetails.description': 'الوصف',
      'productDetails.completeLook': 'أكمل المظهر المتواضع',
      'productDetails.similarProducts': 'منتجات متشابهة',
      'productDetails.addToOrder': 'أضف إلى طلبي',
      'productDetails.noRecommendations': 'لا توجد توصيات تصفيف متاحة لهذا المنتج.',
      'productDetails.checkout': 'المتابعة إلى الدفع عبر واتساب',
      'productDetails.notFound': 'المنتج غير موجود',

      // Store Page
      'storePage.products.found': 'تم العثور على {{count}} منتج',
      'storePage.products.none': 'لم يتم العثور على منتجات',
      'storePage.filters.show': 'إظهار الفلاتر',
      'storePage.filters.hide': 'إخفاء الفلاتر',
      'storePage.edit.banner': 'تعديل البانر',
      'storePage.edit.logo': 'تعديل الشعار',
      'storePage.loading': 'جاري تحميل المتجر...',

      // Checkout
      'checkout.title': 'الدفع',
      'checkout.noProduct': 'لم يتم اختيار منتج بعد.',
      'checkout.backToProducts': 'العودة إلى المنتجات',
      'checkout.mainProduct': 'المنتج الرئيسي',
      'checkout.stylingItems': 'عناصر التصفيف',
      'checkout.whatsapp': 'التواصل عبر واتساب',
      'checkout.messenger': 'التواصل عبر ماسنجر',

      // Auth
      'auth.login.title': 'تسجيل الدخول',
      'auth.login.email': 'البريد الإلكتروني',
      'auth.login.password': 'كلمة المرور',
      'auth.login.submit': 'تسجيل الدخول',
      'auth.login.demo': 'بيانات تجريبية',
      'auth.signup.title': 'إنشاء حساب',
      'auth.signup.name': 'الاسم',
      'auth.signup.email': 'البريد الإلكتروني',
      'auth.signup.password': 'كلمة المرور',
      'auth.signup.submit': 'إنشاء حساب',
      'auth.signup.demo': 'بيانات تجريبية',

      // Common
      'common.egp': 'جنيه',
      'common.yes': 'نعم',
      'common.no': 'لا',
      'common.maybe': 'ربما',
      'common.opaque': 'معتم',
      'common.semiSheer': 'شبه شفاف',
      'common.clear': 'مسح جميع الفلاتر',
      'common.loading': 'جاري التحميل...',
    }
  };

  constructor() {
    // Load language from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      this._currentLanguage.set(savedLang);
    }

    // Save language to localStorage on change
    effect(() => {
      const lang = this._currentLanguage();
      localStorage.setItem('language', lang);
      this.updateDocumentDirection(lang);
    });

    // Set initial direction
    this.updateDocumentDirection(this._currentLanguage());
  }

  setLanguage(language: Language): void {
    this._currentLanguage.set(language);
  }

  translate(key: string, params?: Record<string, any>): string {
    const currentLang = this._currentLanguage();
    let value: any = this.translations[currentLang]?.[key];

    // Fallback to English if translation not found in current language
    if (value === undefined || typeof value !== 'string') {
      value = this.translations['en']?.[key];
    }

    // If still not found, return the key
    if (value === undefined || typeof value !== 'string') {
      return key;
    }

    // Replace parameters
    if (params) {
      value = value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match;
      });

      // Handle simple pluralization: {{count, plural, =1 {} other {s}}}
      value = value.replace(/\{\{(\w+),\s*plural,\s*=1\s*\{\}\s*other\s*\{([^}]+)\}\}\}/g, (match: string, paramKey: string, pluralSuffix: string) => {
        const count = params[paramKey];
        if (count !== undefined) {
          return Number(count) === 1 ? '' : pluralSuffix;
        }
        return match;
      });
    }

    return value;
  }

  private updateDocumentDirection(language: Language): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', language);
    }
  }
}

