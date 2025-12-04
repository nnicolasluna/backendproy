import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Llamada } from '../../models/interfaces';

@Component({
    selector: 'app-call-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './call-list.component.html',
    styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {
    evaluacionId: number = 0;
    llamadas: Llamada[] = [];
    loading = true;
    error: string | null = null;

    // Pagination
    currentPage = 1;
    itemsPerPage = 15;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.evaluacionId = +params['id'];
            this.loadCalls();
        });
    }

    loadCalls() {
        this.loading = true;
        this.apiService.getEvaluation(this.evaluacionId).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.llamadas = response.data.llamadas || [];
                    this.currentPage = 1;
                } else {
                    this.error = response.error || 'Error al cargar llamadas';
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

    get paginatedCalls(): Llamada[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.llamadas.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get totalPages(): number {
        return Math.ceil(this.llamadas.length / this.itemsPerPage);
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

    goBack() {
        this.router.navigate(['/evaluaciones']);
    }

    formatDuration(seconds: number): string {
        if (!seconds) return '0s';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (mins > 0) {
            return `${mins}m ${secs}s`;
        }
        return `${secs}s`;
    }

    getCallTypeIcon(tipo: string): string {
        switch (tipo) {
            case 'entrante': return 'call_received';
            case 'saliente': return 'call_made';
            case 'perdida': return 'call_missed';
            case 'rechazada': return 'call_end';
            case 'bloqueada': return 'block';
            default: return 'phone';
        }
    }

    getCallTypeColor(tipo: string): string {
        switch (tipo) {
            case 'entrante': return '#10b981';
            case 'saliente': return '#3b82f6';
            case 'perdida': return '#ef4444';
            case 'rechazada': return '#f59e0b';
            case 'bloqueada': return '#6b7280';
            default: return '#8b5cf6';
        }
    }

    getCallTypeLabel(tipo: string): string {
        switch (tipo) {
            case 'entrante': return 'Entrante';
            case 'saliente': return 'Saliente';
            case 'perdida': return 'Perdida';
            case 'rechazada': return 'Rechazada';
            case 'bloqueada': return 'Bloqueada';
            default: return 'Desconocido';
        }
    }

    getCallSummary(): { entrantes: number; salientes: number; perdidas: number; duracionTotal: number } {
        const summary = { entrantes: 0, salientes: 0, perdidas: 0, duracionTotal: 0 };
        for (const llamada of this.llamadas) {
            if (llamada.tipo === 'entrante') summary.entrantes++;
            else if (llamada.tipo === 'saliente') summary.salientes++;
            else if (llamada.tipo === 'perdida') summary.perdidas++;
            summary.duracionTotal += llamada.duracion_segundos || 0;
        }
        return summary;
    }
}
