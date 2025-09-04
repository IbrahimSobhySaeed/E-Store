import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { Product, Cart, CartItem } from '../models/product.model';
import { User, LoginCredentials, LoginResponse } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class FakeStoreApiService {
    private readonly API_URL = 'https://fakestoreapi.com';

    // Signals for state management
    products = signal<Product[]>([]);
    categories = signal<string[]>([]);
    currentUser = signal<User | null>(null);
    cartItems = signal<CartItem[]>([]);
    loading = signal<boolean>(false);

    // Computed signals
    cartTotal = computed(() => {
        return this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
    });

    cartItemsCount = computed(() => {
        return this.cartItems().reduce((count, item) => count + item.quantity, 0);
    });

    constructor(private http: HttpClient) {
        // Load cart from localStorage on init
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cartItems.set(JSON.parse(savedCart));
        }
    }

    // Product endpoints
    getAllProducts(): Observable<Product[]> {
        this.loading.set(true);
        return this.http.get<Product[]>(`${this.API_URL}/products`).pipe(
            tap(products => {
                this.products.set(products);
                this.loading.set(false);
            })
        );
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.API_URL}/products/${id}`);
    }

    getProductsByLimit(limit: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.API_URL}/products?limit=${limit}`);
    }

    getProductsSorted(sort: 'asc' | 'desc'): Observable<Product[]> {
        this.loading.set(true);
        return this.http.get<Product[]>(`${this.API_URL}/products?sort=${sort}`).pipe(
            tap(products => {
                this.products.set(products);
                this.loading.set(false);
            })
        );
    }

    // Category endpoints
    getAllCategories(): Observable<string[]> {
        return this.http.get<string[]>(`${this.API_URL}/products/categories`).pipe(
            tap(categories => this.categories.set(categories))
        );
    }

    getProductsByCategory(category: string): Observable<Product[]> {
        this.loading.set(true);
        return this.http.get<Product[]>(`${this.API_URL}/products/category/${category}`).pipe(
            tap(() => this.loading.set(false))
        );
    }

    // Cart endpoints
    getAllCarts(): Observable<Cart[]> {
        return this.http.get<Cart[]>(`${this.API_URL}/carts`);
    }

    getCart(id: number): Observable<Cart> {
        return this.http.get<Cart>(`${this.API_URL}/carts/${id}`);
    }

    getUserCarts(userId: number): Observable<Cart[]> {
        return this.http.get<Cart[]>(`${this.API_URL}/carts/user/${userId}`);
    }

    getCartsByDateRange(startDate: string, endDate: string): Observable<Cart[]> {
        return this.http.get<Cart[]>(`${this.API_URL}/carts?startdate=${startDate}&enddate=${endDate}`);
    }

    // User endpoints
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.API_URL}/users`);
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/users/${id}`);
    }

    getUsersByLimit(limit: number): Observable<User[]> {
        return this.http.get<User[]>(`${this.API_URL}/users?limit=${limit}`);
    }

    getUsersSorted(sort: 'asc' | 'desc'): Observable<User[]> {
        return this.http.get<User[]>(`${this.API_URL}/users?sort=${sort}`);
    }

    // Authentication
    login(credentials: LoginCredentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                // Mock getting user data after login
                this.getUser(1).subscribe(user => this.currentUser.set(user));
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUser.set(null);
    }

    // Local cart management with signals
    addToCart(product: Product, quantity: number = 1): void {
        const currentCart = this.cartItems();
        const existingItemIndex = currentCart.findIndex(item => item.product.id === product.id);

        if (existingItemIndex > -1) {
            const updatedCart = [...currentCart];
            updatedCart[existingItemIndex].quantity += quantity;
            this.cartItems.set(updatedCart);
        } else {
            this.cartItems.set([...currentCart, { product, quantity }]);
        }

        this.saveCartToLocalStorage();
    }

    removeFromCart(productId: number): void {
        const updatedCart = this.cartItems().filter(item => item.product.id !== productId);
        this.cartItems.set(updatedCart);
        this.saveCartToLocalStorage();
    }

    updateCartItemQuantity(productId: number, quantity: number): void {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const currentCart = this.cartItems();
        const updatedCart = currentCart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        );
        this.cartItems.set(updatedCart);
        this.saveCartToLocalStorage();
    }

    clearCart(): void {
        this.cartItems.set([]);
        localStorage.removeItem('cart');
    }

    private saveCartToLocalStorage(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }

    // CRUD operations (these won't actually modify the fake API)
    createProduct(product: Omit<Product, 'id'>): Observable<Product> {
        return this.http.post<Product>(`${this.API_URL}/products`, product);
    }

    updateProduct(id: number, product: Partial<Product>): Observable<Product> {
        return this.http.put<Product>(`${this.API_URL}/products/${id}`, product);
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/products/${id}`);
    }

    createUser(user: Omit<User, 'id'>): Observable<User> {
        return this.http.post<User>(`${this.API_URL}/users`, user);
    }

    updateUser(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.API_URL}/users/${id}`, user);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/users/${id}`);
    }

    createCart(cart: Omit<Cart, 'id'>): Observable<Cart> {
        return this.http.post<Cart>(`${this.API_URL}/carts`, cart);
    }

    updateCart(id: number, cart: Partial<Cart>): Observable<Cart> {
        return this.http.put<Cart>(`${this.API_URL}/carts/${id}`, cart);
    }

    deleteCart(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/carts/${id}`);
    }
}
