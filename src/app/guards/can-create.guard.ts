import { inject } from '@angular/core';
import { SupaBaseService } from '../core/supa-base.service';
import { Router } from '@angular/router';

export const canCreateGuard = async () => {
  const router = inject(Router);
  const { data } = await inject(SupaBaseService).supabase.auth.getSession();
  if (data.session?.access_token) return true;
  router.navigateByUrl('login');
  return false;
};
