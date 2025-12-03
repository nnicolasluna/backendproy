import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Evaluacion } from '../../models/interfaces';

@Component({
    selector: 'app-evaluation-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './evaluation-detail.component.html',
    styleUrls: ['./evaluation-detail.component.css']
})
export class EvaluationDetailComponent implements OnInit {
    evaluation: Evaluacion | null = null;
    loading = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadEvaluation(+id);
        } else {
            this.error = 'ID de evaluación no válido';
            this.loading = false;
        }
    }

    loadEvaluation(id: number) {
        this.loading = true;
        this.apiService.getEvaluation(id).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.evaluation = response.data;
                } else {
                    this.error = response.error || 'Error al cargar evaluación';
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

    formatBytes(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
