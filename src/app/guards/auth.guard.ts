import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { SupaBaseService } from "../core/supa-base.service";

export const authGuard = () => {
    const router = inject(Router)
    const SUPABASE = inject(SupaBaseService)
    if (SUPABASE.isLogged()) return true;
    router.navigateByUrl('login');
    return false;
      
  }