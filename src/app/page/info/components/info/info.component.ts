import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit,OnDestroy {

  constructor() { }

  ngOnInit(): void {
    console.log('info')
    window.onbeforeunload = () => {
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('userProfile');
    };
  }
  ngOnDestroy(): void {
    window.onbeforeunload = null;
  }

}
