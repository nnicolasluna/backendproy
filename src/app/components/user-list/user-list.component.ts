import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    users: any[] = [];
    loading = true;
    error = '';
    currentUser: any;

    constructor(
        private apiService: ApiService,
        public authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });
        this.loadUsers();
    }

    loadUsers() {
        this.loading = true;
        this.apiService.getUsers().subscribe({
            next: (response) => {
                if (response.success) {
                    this.users = response.data || [];
                } else {
                    this.error = 'Error al cargar usuarios';
                }
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error de conexión al cargar usuarios';
                this.loading = false;
                console.error(err);
            }
        });
    }

    deleteUser(user: any) {
        if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.username}?`)) {
            this.apiService.deleteUser(user.id).subscribe({
                next: () => {
                    this.loadUsers();
                },
                error: (err) => {
                    alert('Error al eliminar usuario');
                    console.error(err);
                }
            });
        }
    }
}
