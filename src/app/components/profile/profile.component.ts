import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    currentUser = computed(() => this.apiService.currentUser());
    cartItemsCount = computed(() => this.apiService.cartItemsCount());

    constructor(
        private apiService: FakeStoreApiService,
        private router: Router
    ) {
        // Redirect to login if not authenticated
        if (!this.currentUser()) {
            this.router.navigate(['/login']);
        }
    }

    logout(): void {
        this.apiService.logout();
        this.router.navigate(['/']);
    }

    getInitials(): string {
        const user = this.currentUser();
        if (!user) return '';
        return `${user.name.firstname.charAt(0)}${user.name.lastname.charAt(0)}`.toUpperCase();
    }
}
