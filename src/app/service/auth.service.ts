import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';
import { UserProfile } from '../models/user-profile.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userProfileSubject = new BehaviorSubject<UserProfile>(sessionStorage.getItem('userProfile') ?
    JSON.parse(sessionStorage.getItem('userProfile') as any) :
    new UserProfile()
  );
  userProfile$ = this.userProfileSubject.asObservable();
  constructor(private encryptionService: EncryptionService) { }
  private tokenKey = 'auth_token';
  authenticate(username: string, password: string): Observable<string> {
    console.log('Encrypted username:', username);
    console.log('Encrypted password:', password);
    const rightUsername = this.encryptionService.decrypt(username);
    const rightPassword = this.encryptionService.decrypt(password);
    if (rightUsername === 'nat@example.com' && rightPassword === 'Password@123') {
      const fakeToken = 'mocked-jwt-token';
      return new Observable(observer => {
        sessionStorage.setItem(this.tokenKey, fakeToken);
        let userProfileResult: UserProfile = new UserProfile({
          userName: rightUsername,
          imageUrl: 'https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp'
        });
        this.userProfileSubject.next(userProfileResult);
        sessionStorage.setItem('userProfile', JSON.stringify(userProfileResult));
        observer.next(fakeToken);
        observer.complete();

      });
    } else {
      return new Observable(observer => {
        sessionStorage.removeItem(this.tokenKey);
        observer.next('');
        observer.complete();
      });
    }


  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('userProfile');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
