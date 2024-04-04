import { Injectable, inject, signal } from '@angular/core';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BACKEND_TOKEN_KEY, BACKEND_URL } from '../tokens/superbase-tokens';

@Injectable({
  providedIn: 'root'
})
export class SupaBaseService {
  public supabase: SupabaseClient
  _session: AuthSession | null = null
  private superBaseUrl = inject(BACKEND_URL)
  private superBaseToken = inject(BACKEND_TOKEN_KEY)
  constructor() {
    this.supabase = createClient(this.superBaseUrl, this.superBaseToken)
  }
  isLogged = signal(false)
  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  signInWithPassword(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }

  signOut() {
    this.isLogged.set(false)
    return this.supabase.auth.signOut()
  }

  updateProfile(profile: any) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }
  /**
   * переписать
   * 
   */
  async isLoggedIn():Promise<boolean> { 
    const {data } = await this.supabase.auth.getSession()
    this.isLogged.set(!!data.session)
      return !!data.session
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }
}
