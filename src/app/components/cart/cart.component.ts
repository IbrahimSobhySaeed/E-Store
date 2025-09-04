import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';
import { CartItem } from '../../models/product.model';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    cartItems = computed(() => this.apiService.cartItems());
    cartTotal = computed(() => this.apiService.cartTotal());
    cartItemsCount = computed(() => this.apiService.cartItemsCount());

    constructor(private apiService: FakeStoreApiService) { }

    updateQuantity(productId: number, quantity: number): void {
        this.apiService.updateCartItemQuantity(productId, quantity);
    }

    removeItem(productId: number): void {
        this.apiService.removeFromCart(productId);
    }

    clearCart(): void {
    
        this.apiService.clearCart();
    }

    getItemTotal(item: CartItem): number {
        return item.product.price * item.quantity;
    }

    checkout(): void {
    }
}
