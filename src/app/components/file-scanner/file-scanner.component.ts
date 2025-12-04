import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { StateService } from '../../services/state.service';
import { Category, ScanResult, ScanFile } from '../../models/interfaces';

@Component({
    selector: 'app-file-scanner',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './file-scanner.component.html',
    styleUrls: ['./file-scanner.component.css']
})
export class FileScannerComponent {
    categories: Category[] = [
        { id: 'imagenes', name: 'Imágenes', icon: 'image', color: '#ec4899' },
        { id: 'videos', name: 'Videos', icon: 'videocam', color: '#8b5cf6' },
        { id: 'audio', name: 'Audio', icon: 'audiotrack', color: '#06b6d4' },
        { id: 'documentos', name: 'Documentos', icon: 'description', color: '#10b981' },
        { id: 'otros', name: 'Otros', icon: 'folder', color: '#f59e0b' }
    ];

    selectedCategories: string[] = [];
    customPath = '';
    loading = false;
    scanResult: ScanResult | null = null;
    error: string | null = null;
    showFileList = false;

    constructor(
        private apiService: ApiService,
        private stateService: StateService
    ) { }

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

    scan() {
        if (!this.selectedCategories.length && !this.customPath) {
            return;
        }

        this.loading = true;
        this.error = null;
        this.scanResult = null;

        const options: any = {};
        if (this.selectedCategories.length > 0) {
            options.categorias = this.selectedCategories;
        }
        if (this.customPath) {
            options.rutas = [this.customPath];
        }

        this.apiService.scanFiles(options).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.scanResult = response.data;
                    this.stateService.setLastScanResult(response.data);
                }
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Error al escanear archivos. Verifica la conexión con el dispositivo.';
                this.loading = false;
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

    toggleFileList() {
        this.showFileList = !this.showFileList;
    }

    getResultEntries(): { category: string; count: number; color: string; icon: string }[] {
        if (!this.scanResult) return [];

        return Object.entries(this.scanResult.resumen_categorias).map(([cat, count]) => ({
            category: cat,
            count: count as number,
            color: this.getCategoryColor(cat),
            icon: this.getCategoryIcon(cat)
        }));
    }

    // Pagination
    currentPage = 1;
    itemsPerPage = 10;

    get paginatedFiles(): ScanFile[] {
        if (!this.scanResult || !this.scanResult.archivos) return [];
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.scanResult.archivos.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get totalPages(): number {
        if (!this.scanResult || !this.scanResult.archivos) return 0;
        return Math.ceil(this.scanResult.archivos.length / this.itemsPerPage);
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

    formatSize(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
