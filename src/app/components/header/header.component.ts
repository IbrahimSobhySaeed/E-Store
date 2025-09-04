import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    cartItemsCount = computed(() => this.apiService.cartItemsCount());
    currentUser = computed(() => this.apiService.currentUser());
    mobileMenuOpen = false;

    constructor(private apiService: FakeStoreApiService) { }

    toggleMobileMenu(): void {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }

    closeMobileMenu(): void {
        this.mobileMenuOpen = false;
    }
}
