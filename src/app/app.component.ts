import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="logo">
          <i class="fas fa-mobile-alt"></i> Android Extractor
        </div>
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <i class="fas fa-home"></i> Dashboard
          </a>
          <a routerLink="/evaluaciones" routerLinkActive="active">
            <i class="fas fa-list"></i> Evaluaciones
          </a>
        </div>
      </nav>
      
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .navbar {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.2rem;
      font-weight: 600;
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo i {
      color: #4CAF50;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
    }

    .nav-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .nav-links a:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    .nav-links a.active {
      color: white;
      background: rgba(33, 150, 243, 0.2);
      color: #2196F3;
    }

    .content {
      flex: 1;
      position: relative;
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'Android File Extractor';
}
