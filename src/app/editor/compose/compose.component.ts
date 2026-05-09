import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.css',
  standalone: false
})
export class ComposeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contentSvc = inject(ContentService);
  private identity = inject(IdentityService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = signal<string | null>(null);
  loading = signal(false);
  saving = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    content: ['', [Validators.required, Validators.minLength(20)]]
  });

  ngOnInit() {
    const entryId = this.route.snapshot.paramMap.get('id');
    if (entryId) {
      this.id.set(entryId);
      this.load(entryId);
    }
  }

  load(entryId: string) {
    this.loading.set(true);
    this.contentSvc.fetchOne(entryId).subscribe({
      next: (entry) => {
        if (entry) {
          this.form.patchValue({ title: entry.title, content: entry.content });
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const user = this.identity.user();
    if (!user) return;

    this.saving.set(true);
    this.contentSvc.persist(this.form.getRawValue() as any, user, this.id() || undefined).subscribe({
      next: () => this.router.navigate(['/feed']),
      error: (err) => {
        this.error.set(err.message);
        this.saving.set(false);
      }
    });
  }
}
