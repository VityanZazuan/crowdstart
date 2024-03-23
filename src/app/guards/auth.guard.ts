import { inject } from "@angular/core";
import { SupaBaseService } from "../core/supa-base.service";

export const authGuard = () => {
    return !inject(SupaBaseService).isLogged();
      
  }