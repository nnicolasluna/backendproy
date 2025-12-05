import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Category, ExtractResult, ExtractCallsResult, ExtractWhatsAppBackupsResult } from '../../models/interfaces';

@Component({
    selector: 'app-file-extractor',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './file-extractor.component.html',
    styleUrls: ['./file-extractor.component.css']
})
export class FileExtractorComponent {
    categories: Category[] = [
        { id: 'imagenes', name: 'Imágenes', icon: 'image', color: '#ec4899' },
        { id: 'videos', name: 'Videos', icon: 'videocam', color: '#8b5cf6' },
        { id: 'audio', name: 'Audio', icon: 'audiotrack', color: '#06b6d4' },
        { id: 'documentos', name: 'Documentos', icon: 'description', color: '#10b981' },
        { id: 'otros', name: 'Otros', icon: 'folder', color: '#f59e0b' }
    ];

    selectedCategories: string[] = [];
    destinationFolder = 'archivos_descargados';
    customPath = '';
    loading = false;
    extractResult: ExtractResult | null = null;
    extractCallsResult: ExtractCallsResult | null = null;
    extractWhatsAppResult: ExtractWhatsAppBackupsResult | null = null;
    error: string | null = null;
    progress = 0;

    // Opciones de extracción especial
    extractOnlyCalls = false;
    extractWhatsAppBackups = false;

    constructor(private apiService: ApiService) { }

    toggleCategory(categoryId: string) {
        const index = this.selectedCategories.indexOf(categoryId);
        if (index > -1) {
            this.selectedCategories.splice(index, 1);
        } else {
            this.selectedCategories.push(categoryId);
        }
    }

    isCategorySelected(categoryId: string): boolean {
        return this.selectedCategories.includes(categoryId);
    }

    toggleExtractOnlyCalls() {
        this.extractOnlyCalls = !this.extractOnlyCalls;
        if (this.extractOnlyCalls) {
            // Limpiar otras selecciones
            this.selectedCategories = [];
            this.extractWhatsAppBackups = false;
        }
    }

    toggleExtractWhatsAppBackups() {
        this.extractWhatsAppBackups = !this.extractWhatsAppBackups;
        if (this.extractWhatsAppBackups) {
            // Limpiar otras selecciones
            this.selectedCategories = [];
            this.extractOnlyCalls = false;
        }
    }

    extract() {
        // Si es solo llamadas, ejecutar extracción de llamadas
        if (this.extractOnlyCalls) {
            this.extractCalls();
            return;
        }

        // Si es backups de WhatsApp, ejecutar esa extracción
        if (this.extractWhatsAppBackups) {
            this.extractWhatsApp();
            return;
        }

        if (!this.selectedCategories.length && !this.customPath) {
            return;
        }

        this.loading = true;
        this.error = null;
        this.extractResult = null;
        this.extractCallsResult = null;
        this.extractWhatsAppResult = null;
        this.progress = 0;

        // Simulate progress (real progress would require WebSocket from backend)
        const progressInterval = setInterval(() => {
            if (this.progress < 90) {
                this.progress += 10;
            }
        }, 500);

        const options: any = {};
        if (this.selectedCategories.length > 0) {
            options.categorias = this.selectedCategories;
        }
        if (this.customPath) {
            options.rutas = [this.customPath];
        }
        if (this.destinationFolder) {
            options.carpeta_destino = this.destinationFolder;
        }

        this.apiService.extractFiles(options).subscribe({
            next: (response) => {
                clearInterval(progressInterval);
                this.progress = 100;

                if (response.success && response.data) {
                    this.extractResult = response.data;
                }

                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
            error: (error) => {
                clearInterval(progressInterval);
                this.error = 'Error al extraer archivos. Verifica la conexión con el dispositivo.';
                this.loading = false;
                this.progress = 0;
            }
        });
    }

    extractCalls() {
        this.loading = true;
        this.error = null;
        this.extractResult = null;
        this.extractCallsResult = null;
        this.extractWhatsAppResult = null;
        this.progress = 0;

        const progressInterval = setInterval(() => {
            if (this.progress < 90) {
                this.progress += 15;
            }
        }, 300);

        this.apiService.extractCalls().subscribe({
            next: (response) => {
                clearInterval(progressInterval);
                this.progress = 100;

                if (response.success && response.data) {
                    this.extractCallsResult = response.data;
                }

                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
            error: (error) => {
                clearInterval(progressInterval);
                this.error = 'Error al extraer llamadas. Verifica la conexión con el dispositivo.';
                this.loading = false;
                this.progress = 0;
            }
        });
    }

    extractWhatsApp() {
        this.loading = true;
        this.error = null;
        this.extractResult = null;
        this.extractCallsResult = null;
        this.extractWhatsAppResult = null;
        this.progress = 0;

        const progressInterval = setInterval(() => {
            if (this.progress < 90) {
                this.progress += 10;
            }
        }, 400);

        this.apiService.extractWhatsAppBackups().subscribe({
            next: (response) => {
                clearInterval(progressInterval);
                this.progress = 100;

                if (response.success && response.data) {
                    this.extractWhatsAppResult = response.data;
                }

                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
            error: (error) => {
                clearInterval(progressInterval);
                this.error = 'Error al extraer backups de WhatsApp. Verifica la conexión con el dispositivo.';
                this.loading = false;
                this.progress = 0;
            }
        });
    }

    getCategoryColor(categoryId: string): string {
        const category = this.categories.find(c => c.id === categoryId);
        return category ? category.color : '#8b5cf6';
    }

    getCategoryIcon(categoryId: string): string {
        const category = this.categories.find(c => c.id === categoryId);
        return category ? category.icon : 'folder';
    }

    getResultEntries(): { category: string; count: number; color: string; icon: string }[] {
        if (!this.extractResult) return [];

        return Object.entries(this.extractResult.resumen_categorias).map(([cat, count]) => ({
            category: cat,
            count: count as number,
            color: this.getCategoryColor(cat),
            icon: this.getCategoryIcon(cat)
        }));
    }

    getSuccessRate(): number {
        if (!this.extractResult || this.extractResult.archivos_escaneados === 0) return 0;
        return Math.round((this.extractResult.archivos_descargados / this.extractResult.archivos_escaneados) * 100);
    }

    getWhatsAppSuccessRate(): number {
        if (!this.extractWhatsAppResult || !this.extractWhatsAppResult.backups) return 0;
        const backups = this.extractWhatsAppResult.backups;
        const total = backups.backups_encontrados.length;
        if (total === 0) return 0;
        return Math.round((backups.backups_descargados / total) * 100);
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    canExtract(): boolean {
        if (this.extractOnlyCalls) return true;
        if (this.extractWhatsAppBackups) return true;
        return this.selectedCategories.length > 0 || !!this.customPath;
    }

    getExtractButtonText(): string {
        if (this.loading) {
            if (this.extractOnlyCalls) return 'Extrayendo Llamadas...';
            if (this.extractWhatsAppBackups) return 'Extrayendo Backups WhatsApp...';
            return 'Extrayendo...';
        }
        if (this.extractOnlyCalls) return 'Extraer Llamadas';
        if (this.extractWhatsAppBackups) return 'Extraer Backups WhatsApp';
        return 'Iniciar Extracción';
    }

    getExtractButtonIcon(): string {
        if (this.loading) return 'downloading';
        if (this.extractOnlyCalls) return 'phone';
        if (this.extractWhatsAppBackups) return 'chat';
        return 'download';
    }
}


