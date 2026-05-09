import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from '../services/identity.service';

export const accessGuard = () => {
  const identity = inject(IdentityService);
  const router = inject(Router);

  if (identity.user()) {
    return true;
  }

  router.navigate(['/signin']);
  return false;
};
