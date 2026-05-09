import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { IdentityService } from '../../services/identity.service';
import { Entry } from '../../models/entry.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  standalone: false
})
export class FeedComponent implements OnInit {
  private content = inject(ContentService);
  private identity = inject(IdentityService);

  entries = signal<Entry[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  
  user = this.identity.user;

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.content.fetchAll().subscribe({
      next: (data) => {
        this.entries.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  onDelete(id: string) {
    const user = this.user();
    if (!user || !confirm('Permanently remove this entry?')) return;

    this.content.remove(id, user).subscribe({
      next: () => this.load(),
      error: (err) => alert(err.message)
    });
  }
}
