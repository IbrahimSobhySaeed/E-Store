import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeStoreApiService } from '../../services/fakestoreapi.service';
import { LoginCredentials } from '../../models/user.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    credentials: LoginCredentials = {
        username: '',
        password: ''
    };

    loading = signal(false);
    error = signal<string | null>(null);
    showPassword = signal(false);

    // Demo credentials
    demoCredentials = [
        { username: 'mor_2314', password: '83r5^_' },
        { username: 'johnd', password: 'm38rmF$' }
    ];

    constructor(
        private apiService: FakeStoreApiService,
        private router: Router
    ) { }

    onSubmit(): void {
        if (!this.credentials.username || !this.credentials.password) {
            this.error.set('Please enter both username and password');
            return;
        }

        this.loading.set(true);
        this.error.set(null);

        this.apiService.login(this.credentials).subscribe({
            next: (response) => {
                this.loading.set(false);
                this.router.navigate(['/profile']);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set('Invalid username or password');
            }
        });
    }

    fillDemoCredentials(index: number): void {
        this.credentials = { ...this.demoCredentials[index] };
        this.error.set(null);
    }

    togglePasswordVisibility(): void {
        this.showPassword.update(value => !value);
    }
}
