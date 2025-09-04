import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
    selector: 'app-category-products',
    standalone: true,
    imports: [CommonModule, RouterLink, ProductCardComponent, LoadingComponent],
    templateUrl: './category-products.component.html',
    styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
    products = signal<Product[]>([]);
    categoryName = signal<string>('');
    loading = signal(true);
    sortOrder = signal<'asc' | 'desc' | 'none'>('none');

    sortedProducts = signal<Product[]>([]);

    constructor(
        private route: ActivatedRoute,
        private apiService: FakeStoreApiService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const category = params['name'];
            this.categoryName.set(category);
            this.loadCategoryProducts(category);
        });
    }

    loadCategoryProducts(category: string): void {
        this.loading.set(true);
        this.apiService.getProductsByCategory(category).subscribe({
            next: (products) => {
                this.products.set(products);
                this.sortProducts();
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    onSortChange(sort: string): void {
        this.sortOrder.set(sort as 'asc' | 'desc' | 'none');
        this.sortProducts();
    }

    sortProducts(): void {
        let sorted = [...this.products()];

        if (this.sortOrder() !== 'none') {
            sorted = sorted.sort((a, b) => {
                const diff = a.price - b.price;
                return this.sortOrder() === 'asc' ? diff : -diff;
            });
        }

        this.sortedProducts.set(sorted);
    }

    getCategoryIcon(category: string): string {
        const icons: { [key: string]: string } = {
            'electronics': 'devices',
            'jewelery': 'diamond',
            "men's clothing": 'checkroom',
            "women's clothing": 'checkroom'
        };
        return icons[category] || 'category';
    }
}
