import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceInfo, ScanResult, ExtractResult } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private connectionStatusSubject = new BehaviorSubject<boolean>(false);
    private deviceInfoSubject = new BehaviorSubject<DeviceInfo | null>(null);
    private lastScanResultSubject = new BehaviorSubject<ScanResult | null>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    connectionStatus$ = this.connectionStatusSubject.asObservable();
    deviceInfo$ = this.deviceInfoSubject.asObservable();
    lastScanResult$ = this.lastScanResultSubject.asObservable();
    loading$ = this.loadingSubject.asObservable();

    setConnectionStatus(status: boolean) {
        this.connectionStatusSubject.next(status);
    }

    setDeviceInfo(info: DeviceInfo | null) {
        this.deviceInfoSubject.next(info);
    }

    setLastScanResult(result: ScanResult | null) {
        this.lastScanResultSubject.next(result);
    }

    setLoading(loading: boolean) {
        this.loadingSubject.next(loading);
    }

    getConnectionStatus(): boolean {
        return this.connectionStatusSubject.value;
    }

    getDeviceInfo(): DeviceInfo | null {
        return this.deviceInfoSubject.value;
    }
}
