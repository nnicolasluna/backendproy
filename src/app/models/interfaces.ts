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

export interface ScanFile {
    ruta: string;
    nombre: string;
    tamano: number;
    fecha: string;
    tipo: string;
}

export interface ScanResult {
    total_archivos: number;
    resumen_categorias: { [key: string]: number };
    archivos: ScanFile[];
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

export interface Archivo {
    id: number;
    nombre: string;
    tipo: string;
    tamano: number;
    metadata: any;
    fecha_subida: string;
    ruta: string;
}

export interface Llamada {
    id: number;
    numero: string;
    nombre_contacto: string | null;
    fecha: string;
    duracion_segundos: number;
    tipo: string;
    metadata_llamada: any;
}

export interface Evaluacion {
    id: number;
    fecha_creacion: string;
    dispositivo: DeviceInfo;
    metadata: any;
    cantidad_archivos: number;
    archivos?: Archivo[];
    llamadas?: Llamada[];
}

export interface ExtractCallsResult {
    evaluacion: Evaluacion;
    llamadas_extraidas: number;
    llamadas: Llamada[];
}

export interface WhatsAppBackup {
    ruta: string;
    nombre: string;
    tamano: number;
    fecha: string;
    tipo_backup: string;
    app_origen: string;
    ruta_local?: string;
}

export interface ExtractWhatsAppBackupsResult {
    evaluacion: Evaluacion;
    backups: {
        backups_encontrados: WhatsAppBackup[];
        backups_descargados: number;
        backups_fallidos: number;
        carpeta_destino: string | null;
    };
    archivos_procesados: number;
}
