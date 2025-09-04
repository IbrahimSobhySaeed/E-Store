import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <article class="product-card">
      <a [routerLink]="['/products', product.id]" class="product-link">
        <div class="product-image">
          <img [src]="product.image" [alt]="product.title" loading="lazy">
          <span class="category-badge">{{ product.category }}</span>
        </div>
        
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          
          <div class="product-rating">
            <div class="stars">
              <span class="material-icons" *ngFor="let star of getStars()">
                {{ star }}
              </span>
            </div>
            <span class="rating-text">{{ product.rating.rate }} ({{ product.rating.count }})</span>
          </div>
          
          <p class="product-price">{{ product.price | currency }}</p>
        </div>
      </a>
      
      <button class="add-to-cart-btn btn btn-primary" (click)="addToCart($event)">
        <span class="material-icons">add_shopping_cart</span>
        Add to Cart
      </button>
    </article>
  `,
    styles: [`
    .product-card {
      background-color: var(--background);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 0 2px 8px var(--shadow);
      transition: all var(--transition-base);
      display: flex;
      flex-direction: column;
      height: 100%;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px var(--shadow);
      }
    }

    .product-link {
      flex: 1;
      display: flex;
      flex-direction: column;
      color: inherit;
    }

    .product-image {
      position: relative;
      width: 100%;
      height: 250px;
      overflow: hidden;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-lg);

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: transform var(--transition-base);
      }

      &:hover img {
        transform: scale(1.05);
      }

      .category-badge {
        position: absolute;
        top: var(--spacing-md);
        right: var(--spacing-md);
        padding: var(--spacing-xs) var(--spacing-sm);
        background-color: var(--primary-color);
        color: white;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
      }
    }

    .product-info {
      padding: var(--spacing-lg);
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .product-title {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.4;
      color: var(--text-primary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: auto;
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-top: auto;

      .stars {
        display: flex;
        gap: 2px;

        .material-icons {
          font-size: 1rem;
          color: var(--accent-color);
        }
      }

      .rating-text {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 0;
    }

    .add-to-cart-btn {
      margin: 0 var(--spacing-lg) var(--spacing-lg);
      width: calc(100% - var(--spacing-lg) * 2);
    }
  `]
})
export class ProductCardComponent {
    @Input({ required: true }) product!: Product;

    constructor(private apiService: FakeStoreApiService) { }

    getStars(): string[] {
        const rating = Math.round(this.product.rating.rate);
        return Array(5).fill('star').map((_, index) =>
            index < rating ? 'star' : 'star_outline'
        );
    }

    addToCart(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.apiService.addToCart(this.product);
    }
}
