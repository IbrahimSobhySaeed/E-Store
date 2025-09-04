import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>About E-Store</h3>
            <p>Your trusted online shopping destination for quality products at great prices.</p>
          </div>
          
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Connect With Us</h3>
            <div class="social-links">
              <a href="#" aria-label="Facebook"><span class="material-icons">facebook</span></a>
              <a href="#" aria-label="whatsapp"><span class="material-icons">whatsapp</span></a>
              <a href="#" aria-label="Instagram"><span class="material-icons">instagram</span></a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--text-primary);
      color: white;
      padding: var(--spacing-2xl) 0 var(--spacing-lg);
      margin-top: auto;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-2xl);
      margin-bottom: var(--spacing-2xl);
    }

    .footer-section {
      h3 {
        font-size: 1.125rem;
        margin-bottom: var(--spacing-md);
        color: white;
      }

      p {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
      }

      ul {
        list-style: none;

        li {
          margin-bottom: var(--spacing-sm);

          a {
            color: rgba(255, 255, 255, 0.8);
            transition: color var(--transition-fast);

            &:hover {
              color: white;
            }
          }
        }
      }
    }

    .social-links {
      display: flex;
      gap: var(--spacing-md);

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-md);
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        transition: all var(--transition-fast);

        &:hover {
          background-color: var(--primary-color);
          transform: translateY(-2px);
        }
      }
    }

    .footer-bottom {
      padding-top: var(--spacing-lg);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent { }
