import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    ApiResponse,
    DeviceInfo,
    ScanOptions,
    ExtractOptions,
    ScanResult,
    ExtractResult,
    HealthCheck,
    Evaluacion,
    ExtractCallsResult,
    ExtractWhatsAppBackupsResult,
    Llamada
} from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

    // User Management
    getUsers(): Observable<ApiResponse<any[]>> {
        return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/users`);
    }

    getUser(id: number): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.baseUrl}/users/${id}`);
    }

    createUser(userData: any): Observable<ApiResponse<any>> {
        return this.http.post<ApiResponse<any>>(`${this.baseUrl}/users`, userData);
    }

    updateUser(id: number, userData: any): Observable<ApiResponse<any>> {
        return this.http.put<ApiResponse<any>>(`${this.baseUrl}/users/${id}`, userData);
    }

    deleteUser(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/users/${id}`);
    }

    healthCheck(): Observable<HealthCheck> {
        return this.http.get<HealthCheck>(`${this.baseUrl}/health`);
    }

    getDeviceInfo(): Observable<ApiResponse<DeviceInfo>> {
        return this.http.get<ApiResponse<DeviceInfo>>(`${this.baseUrl}/device-info`);
    }

    scanFiles(options: ScanOptions = {}): Observable<ApiResponse<ScanResult>> {
        return this.http.post<ApiResponse<ScanResult>>(`${this.baseUrl}/scan`, options);
    }

    extractFiles(options: ExtractOptions = {}): Observable<ApiResponse<ExtractResult>> {
        return this.http.post<ApiResponse<ExtractResult>>(`${this.baseUrl}/extract`, options);
    }

    extractCalls(metadata: any = {}): Observable<ApiResponse<ExtractCallsResult>> {
        return this.http.post<ApiResponse<ExtractCallsResult>>(`${this.baseUrl}/extract-calls`, { metadata });
    }

    extractWhatsAppBackups(metadata: any = {}): Observable<ApiResponse<ExtractWhatsAppBackupsResult>> {
        return this.http.post<ApiResponse<ExtractWhatsAppBackupsResult>>(`${this.baseUrl}/extract-whatsapp-backups`, { metadata });
    }

    getEvaluations(): Observable<ApiResponse<Evaluacion[]>> {
        return this.http.get<ApiResponse<Evaluacion[]>>(`${this.baseUrl}/evaluaciones`);
    }

    getEvaluation(id: number): Observable<ApiResponse<Evaluacion>> {
        return this.http.get<ApiResponse<Evaluacion>>(`${this.baseUrl}/evaluaciones/${id}`);
    }

    getEvaluationPdf(id: number): Observable<Blob> {
        return this.http.get(`${this.baseUrl}/evaluaciones/${id}/pdf`, { responseType: 'blob' });
    }

    getFileUrl(fileId: number): string {
        return `${this.baseUrl}/files/${fileId}`;
    }
}

