import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { StateService } from '../../services/state.service';
import { DeviceInfo } from '../../models/interfaces';

@Component({
    selector: 'app-device-info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './device-info.component.html',
    styleUrls: ['./device-info.component.css']
})
export class DeviceInfoComponent implements OnInit {
    deviceInfo: DeviceInfo | null = null;
    loading = false;
    error: string | null = null;

    constructor(
        private apiService: ApiService,
        private stateService: StateService
    ) { }

    ngOnInit() {
        this.loadDeviceInfo();
    }

    loadDeviceInfo() {
        this.loading = true;
        this.error = null;

        this.apiService.getDeviceInfo().subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.deviceInfo = response.data;
                    this.stateService.setDeviceInfo(response.data);
                }
                this.loading = false;
            },
            error: (error) => {
                this.error = 'No se pudo conectar con el dispositivo. Verifica que esté conectado y ADB habilitado.';
                this.loading = false;
                this.stateService.setDeviceInfo(null);
            }
        });
    }

    refresh() {
        this.loadDeviceInfo();
    }
}
