import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;
    isEditMode = false;
    userId: number | null = null;
    loading = false;
    error = '';
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.userForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            nombre_completo: ['', Validators.required],
            password: [''], // Validación condicional
            es_admin: [false],
            activo: [true]
        });
    }

    ngOnInit() {
        this.userId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.userId) {
            this.isEditMode = true;
            this.loadUser(this.userId);
        } else {
            // Si es creación, password es requerido
            this.userForm.get('password')?.addValidators([Validators.required, Validators.minLength(6)]);
        }
    }

    loadUser(id: number) {
        this.loading = true;
        this.apiService.getUser(id).subscribe({
            next: (response) => {
                if (response.success) {
                    this.userForm.patchValue({
                        username: response.data.username,
                        email: response.data.email,
                        nombre_completo: response.data.nombre_completo,
                        es_admin: response.data.es_admin,
                        activo: response.data.activo
                    });
                }
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error al cargar usuario';
                this.loading = false;
            }
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        const userData = this.userForm.value;
        // Si estamos editando y el password está vacío, lo eliminamos para no sobreescribirlo
        if (this.isEditMode && !userData.password) {
            delete userData.password;
        }

        const request = this.isEditMode
            ? this.apiService.updateUser(this.userId!, userData)
            : this.apiService.createUser(userData);

        request.subscribe({
            next: (response) => {
                if (response.success) {
                    this.router.navigate(['/usuarios']);
                } else {
                    this.error = response.error || 'Error al guardar usuario';
                }
                this.loading = false;
            },
            error: (err) => {
                this.error = err.error?.message || 'Error al procesar la solicitud';
                this.loading = false;
                console.error(err);
            }
        });
    }
}
