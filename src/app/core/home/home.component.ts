import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  removable = false;
  searchword = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeCompanyPage(){
    this.router.navigateByUrl('/companies')
  }
  
  routeComputerPage(){
    this.router.navigateByUrl('/computers')
  }

}
