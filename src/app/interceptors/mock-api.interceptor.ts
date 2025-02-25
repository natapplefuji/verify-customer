import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('MockApiInterceptor Request:', req);
    if(req.url.includes('/read-card')) {
      const mockResponse = new HttpResponse({
        status: 200,
        body: {
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
        }
      });
      // const mockErrorResponse = new HttpErrorResponse({
      //   status: 500,
      //   statusText: "Internal Server Error",
      //   error: { message: "Something went wrong" }
      // });
      // return throwError(mockErrorResponse).pipe(delay(3000));
      return of(mockResponse).pipe(delay(3000));
    }
    if(req.url.includes('/verify-id-card')) {
      const mockResponse = new HttpResponse({
        status: 200,
        body: {
          status: "success",
          message: "ID card verified successfully",
          data: {
            id_number: "1234567890123",
            first_name: 'Nat',
            last_name: 'Jane',
            birth_date: '1995-08-19',
            address: "Bangkok, Thailand",
            image_url: "assets/images/profile.jpg"
          }
        }
      });
      return of(mockResponse).pipe(delay(3000));
    }
    if (req.url.includes('/submit-form')) {
  
      const mockResponse = new HttpResponse({
        status: 200,
        body: {
          status: "success",
          message: "ยืนยันบัตรประชาชนสำเร็จ",
          data: {
            id_number: req.body.id_number,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_date: req.body.birth_date,
            address: "Bangkok, Thailand",
            image_url: "assets/images/profile.jpg"
          }
        }
      });
      return of(mockResponse).pipe(delay(3000));
    }
    if (req.url.includes('/read-text')) {
      const mockResponse = new HttpResponse({
        status: 200,
        body: {
          status: "success",
          message: "Text extracted successfully",
          data: {
            id_number: "1234567890123",
            first_name: 'Nat123',
            last_name: 'Jane456',
            birth_date: '1995-08-19',
            address: "Bangkok, Thailand",
            image_url: "assets/images/profile.jpg"
          }
        }
      });
      return of(mockResponse).pipe(delay(3000));
    }

    return next.handle(req);
  }
}
