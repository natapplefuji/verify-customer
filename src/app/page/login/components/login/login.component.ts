import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';
import { EncryptionService } from 'src/app/service/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loadingMessage = '';
  errorMessage = '';
  signInForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$')
    ]]
  });

  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private fb:FormBuilder,
    private authService: AuthService,
    private encryptionService: EncryptionService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.errorMessage = ""
    if (this.signInForm.invalid) {
      this.errorMessage = "กรอกฟอร์มไม่ถูกต้อง"
      return;
    }

    const encryptedUsername = this.encryptionService.encrypt(this.signInForm.value.username!);
    const encryptedPassword = this.encryptionService.encrypt(this.signInForm.value.password!);
    this.spinner.show();
    this.loadingMessage = "กำลังเรียกไปที่ API";
    setTimeout(() => {
      this.authService.authenticate(encryptedUsername, encryptedPassword).subscribe(token => {
        if(!token) {
          this.loadingMessage = "ไม่สามารถเข้าสู่ระบบได้";
          this.errorMessage = "รหัสผ่านไม่ถูกต้อง"
          this.spinner.hide();
          return
        }
        this.loadingMessage = "ได้รับ Token";
        setTimeout(() => {
          this.loadingMessage = "กำลังเปลี่ยนไปหน้า info";
          setTimeout(() => {
            this.loadingMessage = ""
            this.spinner.hide();
            this.router.navigate(['/info']);
          }, 3000);
        }, 3000);
      });
    }, 3000);
  }

}
