export interface DeviceInfo {
    marca: string;
    modelo: string;
    version_android: string;
    serial: string;
}

export interface ScanOptions {
    categorias?: string[];
    rutas?: string[];
}

export interface ExtractOptions {
    categorias?: string[];
    rutas?: string[];
    carpeta_destino?: string;
}

export interface ScanResult {
    total_archivos: number;
    resumen_categorias: { [key: string]: number };
    archivos: string[];
}

export interface ExtractResult {
    archivos_escaneados: number;
    archivos_descargados: number;
    archivos_fallidos: number;
    resumen_categorias: { [key: string]: number };
    carpeta_destino: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface HealthCheck {
    status: string;
    service: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
}
