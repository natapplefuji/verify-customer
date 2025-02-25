import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubmitRequest } from '../models/info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // private apiUrl = 'https://backend.example.com';
  constructor(private http: HttpClient) { }

  readCard(): Observable<any> {
    return this.http.get('/read-card');
  }

  readText(extractText:string): Observable<any> {
    return this.http.post('/read-text', {extractText: extractText});
  }

  submitCard(data: SubmitRequest): Observable<any> {
    return this.http.post('/submit-form', data);
  }
}
