import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Evaluacion, Archivo } from '../../models/interfaces';

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

    // Modal state
    isModalOpen = false;
    selectedFile: Archivo | null = null;

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private authService: AuthService
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

    // Modal methods
    openPreview(file: Archivo) {
        this.selectedFile = file;
        this.isModalOpen = true;
    }

    closePreview() {
        this.isModalOpen = false;
        this.selectedFile = null;
    }

    getFileUrl(fileId: number): string {
        const url = this.apiService.getFileUrl(fileId);
        const token = this.authService.getToken();
        return token ? `${url}?jwt=${token}` : url;
    }

    getFileType(file: Archivo): 'image' | 'audio' | 'video' | 'document' | 'other' {
        const tipo = (file.tipo || '').toLowerCase();

        if (tipo.startsWith('image/')) return 'image';
        if (tipo.startsWith('audio/')) return 'audio';
        if (tipo.startsWith('video/')) return 'video';
        if (tipo === 'application/pdf') return 'document';

        // Check by extension if mime type not available
        const nombre = (file.nombre || '').toLowerCase();
        if (/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/.test(nombre)) return 'image';
        if (/\.(mp3|wav|ogg|flac|aac|m4a)$/.test(nombre)) return 'audio';
        if (/\.(mp4|webm|mkv|avi|mov)$/.test(nombre)) return 'video';
        if (/\.pdf$/.test(nombre)) return 'document';

        return 'other';
    }

    getFileIcon(file: Archivo): string {
        const type = this.getFileType(file);
        switch (type) {
            case 'image': return 'fa-image';
            case 'audio': return 'fa-music';
            case 'video': return 'fa-video';
            case 'document': return 'fa-file-pdf';
            default: return 'fa-file';
        }
    }

    onModalBackdropClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('preview-modal')) {
            this.closePreview();
        }
    }
}
