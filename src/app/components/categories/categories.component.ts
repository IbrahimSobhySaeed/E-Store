import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';
import { Product } from '../../models/product.model';
import { LoadingComponent } from '../loading/loading.component';

interface CategoryData {
    name: string;
    productCount: number;
    averagePrice: number;
    icon: string;
    color: string;
}

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CommonModule, RouterLink, LoadingComponent],
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    categories = signal<CategoryData[]>([]);
    loading = signal(true);

    constructor(private apiService: FakeStoreApiService) { }

    ngOnInit(): void {
        this.loadCategoriesData();
    }

    loadCategoriesData(): void {
        // First load all categories
        this.apiService.getAllCategories().subscribe(categoryNames => {
            // Then load all products to get statistics
            this.apiService.getAllProducts().subscribe(products => {
                const categoriesData = categoryNames.map(categoryName => {
                    const categoryProducts = products.filter(p => p.category === categoryName);
                    const totalPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0);

                    return {
                        name: categoryName,
                        productCount: categoryProducts.length,
                        averagePrice: categoryProducts.length > 0 ? totalPrice / categoryProducts.length : 0,
                        icon: this.getCategoryIcon(categoryName),
                        color: this.getCategoryColor(categoryName)
                    };
                });

                this.categories.set(categoriesData);
                this.loading.set(false);
            });
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

    getCategoryColor(category: string): string {
        const colors: { [key: string]: string } = {
            'electronics': '#2563eb',
            'jewelery': '#f59e0b',
            "men's clothing": '#10b981',
            "women's clothing": '#ec4899'
        };
        return colors[category] || '#6b7280';
    }
}
