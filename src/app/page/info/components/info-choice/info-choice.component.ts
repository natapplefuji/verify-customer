import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-choice',
  templateUrl: './info-choice.component.html',
  styleUrls: ['./info-choice.component.scss']
})
export class InfoChoiceComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
