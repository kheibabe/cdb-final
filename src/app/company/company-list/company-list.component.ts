import { Component, Injectable, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../../model/company.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})

@Injectable()

export class CompanyListComponent implements OnInit {

  companyList: Company[] = [];

  constructor(private readonly companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
        this.companyList = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCompany(id: number): void {
    this.companyService.deleteCompany(id).subscribe(
      response => {
        this.getCompanies();
      },
      error => {
        console.log(error);
      }
    )
  }

}


