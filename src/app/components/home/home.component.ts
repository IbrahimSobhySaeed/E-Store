import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink, ProductCardComponent, LoadingComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    featuredProducts = signal<Product[]>([]);
    categories = signal<string[]>([]);
    loading = signal(true);

    constructor(private apiService: FakeStoreApiService) { }

    ngOnInit(): void {
        this.loadFeaturedProducts();
        this.loadCategories();
    }

    loadFeaturedProducts(): void {
        this.apiService.getProductsByLimit(8).subscribe({
            next: (products) => {
                this.featuredProducts.set(products);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    loadCategories(): void {
        this.apiService.getAllCategories().subscribe({
            next: (categories) => {
                this.categories.set(categories);
            }
        });
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
