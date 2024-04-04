import { HttpInterceptorFn } from '@angular/common/http';
import { SupaBaseService } from '../core/supa-base.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let supabase = inject(SupaBaseService)
  console.log(supabase.session?.access_token);
  console.log('test');
  
  const clonedReq = 1
  return next(req);
};
