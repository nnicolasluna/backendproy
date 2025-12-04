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
    Llamada
} from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

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

