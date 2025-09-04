import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';
import { Product } from '../../models/product.model';
import { LoadingComponent } from '../loading/loading.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, FormsModule,  LoadingComponent, ProductCardComponent],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    products = signal<Product[]>([]);
    categories = computed(() => this.apiService.categories());
    loading = computed(() => this.apiService.loading());

    selectedCategory = signal<string>('all');
    sortOrder = signal<'asc' | 'desc' | 'none'>('none');
    searchTerm = signal<string>('');

    filteredProducts = computed(() => {
        let filtered = this.products();

        // Filter by category
        if (this.selectedCategory() !== 'all') {
            filtered = filtered.filter(p => p.category === this.selectedCategory());
        }

        // Filter by search term
        const search = this.searchTerm().toLowerCase();
        if (search) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search) ||
                p.category.toLowerCase().includes(search)
            );
        }

        // Sort products
        if (this.sortOrder() !== 'none') {
            filtered = [...filtered].sort((a, b) => {
                const diff = a.price - b.price;
                return this.sortOrder() === 'asc' ? diff : -diff;
            });
        }

        return filtered;
    });

    constructor(private apiService: FakeStoreApiService) { }

    ngOnInit(): void {
        this.loadProducts();
        this.apiService.getAllCategories().subscribe();
    }

    loadProducts(): void {
        if (this.sortOrder() === 'asc' || this.sortOrder() === 'desc') {
            this.apiService.getProductsSorted(this.sortOrder() as 'asc' | 'desc').subscribe(
                products => this.products.set(products)
            );
        } else {
            this.apiService.getAllProducts().subscribe(
                products => this.products.set(products)
            );
        }
    }

    onCategoryChange(category: string): void {
        this.selectedCategory.set(category);
    }

    onSortChange(sort: string): void {
        this.sortOrder.set(sort as 'asc' | 'desc' | 'none');
        this.loadProducts();
    }

    onSearchChange(term: string): void {
        this.searchTerm.set(term);
    }
}
