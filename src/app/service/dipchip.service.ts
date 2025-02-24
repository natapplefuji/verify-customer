import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { SubmitRequest, VerifyRequest } from '../models/info.model';

@Injectable({
  providedIn: 'root'
})
export class DipchipService {

  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  verifyIDCard(data: VerifyRequest): Observable<any> {

    this.http.post(this.apiUrl + '/verify-id-card', data);
    return new Observable(observer => {
      observer.next({
        status: "verified",
        message: "ID card verified successfully",
        data: {
          id_number: "1234567890123",
          first_name: 'Nat',
          last_name: 'Jane',
          birth_date: '1995-08-19',
          address: "Bangkok, Thailand",
          image_url: "assets/images/profile.jpg"
        }
      });
      observer.complete();
    }
    );
  }
}
