import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:5000/api/auth';
    private currentUserSubject = new BehaviorSubject<any>(null);
    public currentUser$ = this.currentUserSubject.asObservable();
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.checkToken();
    }

    // Verificar si hay token almacenado y cargar usuario
    private checkToken() {
        const token = localStorage.getItem('access_token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
            this.isAuthenticatedSubject.next(true);
            this.currentUserSubject.next(JSON.parse(userStr));
        }
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
            tap((response: any) => {
                if (response.success && response.data) {
                    this.setSession(response.data);
                }
            })
        );
    }

    private setSession(authResult: any) {
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('refresh_token', authResult.refresh_token);
        if (authResult.user) {
            localStorage.setItem('user', JSON.stringify(authResult.user));
            this.currentUserSubject.next(authResult.user);
        }
        this.isAuthenticatedSubject.next(true);
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    isAdmin(): boolean {
        const user = this.currentUserSubject.value;
        return user && user.es_admin;
    }
}
