import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { SupaBaseService } from '../../core/supa-base.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
  loading = false
  supabase = inject(SupaBaseService)
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  })
  
  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.loginForm.value.email as string
      const password = this.loginForm.value.password as string
      
      const { data, error } = await this.supabase.signInWithPassword(email, password)
      if (error) return;
      this.supabase.isLogged.set(true)
      // localStorage.setItem('access_token', data.session?.access_token ?? '')
      // localStorage.setItem('refresh_token', data.session?.refresh_token ?? '')
      this.supabase.isLoggedIn();
      this.router.navigateByUrl('feed')
      if (error) throw error
      
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loginForm.reset()
      this.loading = false
    }
  }
}