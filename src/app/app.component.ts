import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, DashboardComponent],
    template: `
    <div class="app-container">
      <app-dashboard></app-dashboard>
    </div>
  `,
    styles: [`
    .app-container {
      min-height: 100vh;
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {
    title = 'Android File Extractor';
}
