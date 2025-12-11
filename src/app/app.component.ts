import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <nav class="navbar" *ngIf="isAuthenticated$ | async">
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
          <a routerLink="/usuarios" routerLinkActive="active">
            <i class="fas fa-users"></i> Usuarios
          </a>
          <button class="btn-logout" (click)="logout()">
            <i class="fas fa-sign-out-alt"></i> Salir
          </button>
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
      color: #3b82f6;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
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
      background: rgba(59, 130, 246, 0.2);
      color: #60a5fa;
    }

    .btn-logout {
      background: rgba(239, 68, 68, 0.1);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .btn-logout:hover {
      background: rgba(239, 68, 68, 0.2);
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
export class AppComponent implements OnInit {
  title = 'Android File Extractor';
  isAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  logout() {
    this.authService.logout();
  }
}
