import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DipchipService } from './dipchip.service';

describe('DipchipService', () => {
  let service: DipchipService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DipchipService],
    });
    service = TestBed.inject(DipchipService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); // Ensures no pending requests remain
  });

  it('should be verify', () => {
    const idCardData = {
      id_number: '1234567890123',
      first_name: 'John',
      last_name: 'Doe',
      birth_date: '1990-01-01',
      image_url: 'assets/images/profile.jpg'
    };
    const mockResponse = {
      status: "verified",
      message: "ID card verified successfully",
      data: {
        id_number: "1234567890123",
        first_name: 'John',
        last_name: 'Doe',
        address: "Bangkok, Thailand"
      }
    }
    service.verifyIDCard(idCardData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('https://api.example.com/verify-id-card');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(idCardData);

    req.flush(mockResponse);
  });
});
