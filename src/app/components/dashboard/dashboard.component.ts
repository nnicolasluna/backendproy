import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceInfoComponent } from '../device-info/device-info.component';
import { FileScannerComponent } from '../file-scanner/file-scanner.component';
import { FileExtractorComponent } from '../file-extractor/file-extractor.component';
import { ApiService } from '../../services/api.service';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        DeviceInfoComponent,
        FileScannerComponent,
        FileExtractorComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    serviceStatus = 'checking';
    activeTab = 'scan';

    constructor(
        private apiService: ApiService,
        private stateService: StateService
    ) { }

    ngOnInit() {
        this.checkServiceHealth();
    }

    checkServiceHealth() {
        this.apiService.healthCheck().subscribe({
            next: (response) => {
                this.serviceStatus = 'online';
                this.stateService.setConnectionStatus(true);
            },
            error: (error) => {
                this.serviceStatus = 'offline';
                this.stateService.setConnectionStatus(false);
            }
        });
    }

    setActiveTab(tab: string) {
        this.activeTab = tab;
    }
}
