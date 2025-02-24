import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubmitRequest } from '../models/info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'https://backend.example.com';
  constructor(private http: HttpClient) { }

  readCard(): Observable<any> {

    this.http.get(this.apiUrl + '/read-card');
    return new Observable(observer => {
      observer.next({
        status: "success",
        message: "Read Card successfully",
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

  submitCard(data: SubmitRequest): Observable<any> {

    this.http.post(this.apiUrl + '/submit-form', data);
    return new Observable(observer => {
      observer.next({
        status: "verified",
        message: "ยืนยันบัตรประชาชนสำเร็จ",
        data: {
          id_number: data.id_number,
          first_name: data.first_name,
          last_name: data.last_name,
          birth_date: data.birth_date,
          address: "Bangkok, Thailand",
          image_url: "assets/images/profile.jpg"
        }
      });
      observer.complete();
    }
    );
  }
}
