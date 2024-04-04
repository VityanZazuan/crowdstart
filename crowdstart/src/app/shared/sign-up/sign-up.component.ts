import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupaBaseService } from '../../core/supa-base.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  loading = false
  formBuilder = inject(FormBuilder)
  supabase = inject(SupaBaseService)
  router = inject(Router)
  signUpForm = this.formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    displayName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword:['', [Validators.required, Validators.minLength(8)]]
  })
  constructor() {
    this.signUpForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((res) => {
      console.log(res);
      if (res.password !== res.confirmPassword) { 
        this.signUpForm.controls.confirmPassword.setErrors({
          notEqual:true
        })
      }
      console.log(this.signUpForm);
      
    })
  }
  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.signUpForm.value.email as string
      const password = this.signUpForm.value.password as string
      const userData = this.signUpForm.getRawValue()
      console.log(userData);
      
      const { data, error } = await this.supabase.supabase.auth.signUp({
        email,
        password
      })
      console.log(data);
      console.log(error);
      
      
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
      this.signUpForm.reset()
      this.loading = false
    }
  }
}
