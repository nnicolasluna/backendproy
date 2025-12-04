import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Evaluacion } from '../../models/interfaces';

@Component({
    selector: 'app-evaluation-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './evaluation-list.component.html',
    styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnInit {
    evaluations: Evaluacion[] = [];
    loading = true;
    error: string | null = null;

    // Pagination
    currentPage = 1;
    itemsPerPage = 10;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loadEvaluations();
    }

    loadEvaluations() {
        this.loading = true;
        this.apiService.getEvaluations().subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.evaluations = response.data;
                    this.currentPage = 1; // Reset to first page on reload
                } else {
                    this.error = response.error || 'Error al cargar evaluaciones';
                }
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error de conexión';
                this.loading = false;
                console.error(err);
            }
        });
    }

    get paginatedEvaluations(): Evaluacion[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.evaluations.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get totalPages(): number {
        return Math.ceil(this.evaluations.length / this.itemsPerPage);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    viewPdf(id: number) {
        this.apiService.getEvaluationPdf(id).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank');
            },
            error: (err) => {
                console.error('Error downloading PDF:', err);
                alert('Error al descargar el PDF');
            }
        });
    }
}
