import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IdentityService } from '../../services/identity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  standalone: false
})
export class SignInComponent {
  private fb = inject(FormBuilder);
  private identity = inject(IdentityService);
  private router = inject(Router);

  error = signal<string | null>(null);
  loading = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    this.identity.signIn(this.form.getRawValue() as any).subscribe({
      next: () => this.router.navigate(['/feed']),
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
}
