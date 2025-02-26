import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubmitRequest } from '../models/info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'https://api.example.com';
  constructor(private http: HttpClient) { }

  readCard(): Observable<any> {
    return this.http.get(this.apiUrl +'/read-card');
  }

  readText(extractText:string): Observable<any> {
    return this.http.post(this.apiUrl +'/read-text', {extractText: extractText});
  }

  submitCard(data: SubmitRequest): Observable<any> {
    console.log('Submit Card:', data);
    return this.http.post(this.apiUrl +'/submit-form', data);
  }
}
