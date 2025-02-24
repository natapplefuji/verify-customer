import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user-profile.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userProfile: UserProfile = new UserProfile();
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.userProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
