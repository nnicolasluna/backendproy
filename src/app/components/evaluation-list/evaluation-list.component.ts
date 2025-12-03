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
