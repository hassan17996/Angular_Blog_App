import { Component, inject } from '@angular/core';
import { IdentityService } from './services/identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class App {
  private identity = inject(IdentityService);
  private router = inject(Router);

  user = this.identity.user;

  logout() {
    this.identity.logout();
    this.router.navigate(['/signin']);
  }
}
