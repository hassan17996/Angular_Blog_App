import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  standalone: false
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  private identity = inject(IdentityService);
  private router = inject(Router);

  error = signal<string | null>(null);
  loading = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    this.identity.signUp(this.form.getRawValue() as any).subscribe({
      next: () => this.router.navigate(['/feed']),
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
}
