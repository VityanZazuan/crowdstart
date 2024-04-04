import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUser(): Observable<any> {
    return of({
      name: 'Zazik',
    });
  }
  getUsers(): Observable<any> {
    return of([{}, {}]);
  }
  zazilk = new BehaviorSubject<any>(null);
}