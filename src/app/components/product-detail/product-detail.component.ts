import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';
import { Product } from '../../models/product.model';
import { LoadingComponent } from '../loading/loading.component';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, LoadingComponent],
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    product = signal<Product | null>(null);
    loading = signal(true);
    quantity = signal(1);
    relatedProducts = signal<Product[]>([]);

    constructor(
        private route: ActivatedRoute,
        private apiService: FakeStoreApiService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.loadProduct(id);
        });
    }

    loadProduct(id: number): void {
        this.loading.set(true);
        this.apiService.getProduct(id).subscribe({
            next: (product) => {
                this.product.set(product);
                this.loadRelatedProducts(product.category);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    loadRelatedProducts(category: string): void {
        this.apiService.getProductsByCategory(category).subscribe(products => {
            const currentProduct = this.product();
            if (currentProduct) {
                this.relatedProducts.set(
                    products.filter(p => p.id !== currentProduct.id).slice(0, 4)
                );
            }
        });
    }

    increaseQuantity(): void {
        this.quantity.update(q => q + 1);
    }

    decreaseQuantity(): void {
        if (this.quantity() > 1) {
            this.quantity.update(q => q - 1);
        }
    }

    addToCart(): void {
        const product = this.product();
        if (product) {
            this.apiService.addToCart(product, this.quantity());
            this.quantity.set(1);
        }
    }

    getStars(): string[] {
        const product = this.product();
        if (!product) return [];

        const rating = Math.round(product.rating.rate);
        return Array(5).fill('star').map((_, index) =>
            index < rating ? 'star' : 'star_outline'
        );
    }
}
