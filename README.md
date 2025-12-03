# Android File Extractor - Frontend Angular

Frontend moderno y elegante para el microservicio de extracción de archivos Android.

## ✨ Características

- 🎨 **Diseño Moderno**: Dark theme con glassmorphism y gradientes vibrantes
- 📱 **Completamente Responsivo**: Funciona perfectamente en todos los dispositivos
- 🚀 **Animaciones Fluidas**: Transiciones suaves y micro-animaciones
- 📊 **Visualización en Tiempo Real**: Estadísticas y progreso de extracción
- 🎯 **Filtrado por Categorías**: Organización intuitiva de archivos multimedia

## 🛠️ Tecnologías

- **Angular 17+**: Framework con componentes standalone
- **TypeScript**: Tipado fuerte para mayor seguridad
- **RxJS**: Programación reactiva
- **CSS Custom Properties**: Estilos dinámicos y tema personalizable
- **Material Icons**: Iconografía moderna

## 📦 Instalación

Las dependencias ya están instaladas. Si necesitas reinstalar:

```bash
npm install
```

## 🚀 Ejecución

### Modo Desarrollo

```bash
npm start
```

El servidor de desarrollo se ejecutará en `http://localhost:4200`

### Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/          # Vista principal
│   │   │   ├── device-info/        # Info del dispositivo
│   │   │   ├── file-scanner/       # Escaneo de archivos
│   │   │   └── file-extractor/     # Extracción de archivos
│   │   ├── services/
│   │   │   ├── api.service.ts      # Comunicación con backend
│   │   │   └── state.service.ts    # Estado de la aplicación
│   │   ├── models/
│   │   │   └── interfaces.ts       # Tipos TypeScript
│   │   └── app.component.ts        # Componente raíz
│   ├── styles.css                  # Estilos globales
│   └── index.html
├── package.json
└── angular.json
```

## 🎨 Componentes

### Dashboard
- Header con indicador de estado del servicio
- Navegación por pestañas
- Integración de todos los componentes

### Device Info
- Muestra información del dispositivo Android conectado
- Marca, modelo, versión de Android y serial
- Botón de actualización

### File Scanner
- Selección de categorías mediante chips interactivos
- Ruta personalizada opcional
- Resultados con estadísticas detalladas
- Lista expandible de archivos encontrados

### File Extractor
- Selección de categorías a extraer
- Configuración de carpeta destino
- Barra de progreso animada
- Tasa de éxito con indicador circular
- Desglose detallado por categoría

## 🔌 Conexión con Backend

El frontend se conecta al backend Flask en `http://localhost:5000/api`

### Asegúrate de que el backend esté ejecutándose:

```bash
# En el directorio raíz del proyecto
python app.py
```

### Endpoints utilizados:

- `GET /api/health` - Verificar estado del servicio
- `GET /api/device-info` - Obtener info del dispositivo
- `POST /api/scan` - Escanear archivos
- `POST /api/extract` - Extraer archivos

## 🎯 Uso

1. **Inicia el backend Flask**: `python app.py`
2. **Inicia el frontend**: `npm start` (en la carpeta frontend)
3. **Abre el navegador**: `http://localhost:4200`
4. **Conecta tu dispositivo Android** con depuración USB
5. **Interactúa con la interfaz**:
   - Verifica la información del dispositivo
   - Escanea archivos seleccionando categorías
   - Extrae los archivos deseados

## 🎨 Personalización

### Colores

Los colores se definen en `styles.css` usando CSS custom properties:

```css
:root {
  --primary: #8b5cf6;
  --secondary: #ec4899;
  --accent: #06b6d4;
  --success: #10b981;
  /* ... */
}
```

### Categorías

Para agregar nuevas categorías, edita el array `categories` en:
- `file-scanner.component.ts`
- `file-extractor.component.ts`

## 📱 Responsive Design

La aplicación se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Layout de múltiples columnas
- **Tablet**: Layout adaptado
- **Mobile**: Layout de una sola columna

## 🚨 Troubleshooting

### El servicio aparece desconectado
- Verifica que el backend Flask esté ejecutándose
- Confirma que el puerto 5000 esté disponible
- Revisa la configuración CORS en el backend

### No se detecta el dispositivo
- Verifica que la depuración USB esté habilitada
- Confirma que ADB esté funcionando: `adb devices`
- Reconecta el dispositivo USB

### Errores de compilación
- Elimina `node_modules` y ejecuta `npm install` nuevamente
- Verifica la versión de Node.js (recomendada: LTS)

## 📝 Próximas Mejoras

- [ ] Soporte para múltiples dispositivos simultáneos
- [ ] Descarga directa desde el navegador
- [ ] Vista previa de imágenes
- [ ] Filtros avanzados de búsqueda
- [ ] Modo claro/oscuro toggle
- [ ] Internacionalización (i18n)

## 📄 Licencia

Este proyecto es parte del sistema de extracción de archivos Android.
