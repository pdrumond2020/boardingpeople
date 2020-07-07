import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../../core/header/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-embark',
  templateUrl: './embark.component.html',
  styleUrls: ['./embark.component.css']
})
export class EmbarkComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) { 
    headerService.headerData = {
      title: 'Employee Registration',
      icon: 'directions_boat',
      routeUrl: '/embarks'
    }
  }

  ngOnInit(): void {
  }

  navigateToEmbarkCreate(): void {
    this.router.navigate(['/embark/create'])
  }

}
