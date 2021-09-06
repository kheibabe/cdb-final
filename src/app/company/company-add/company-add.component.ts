import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../company.model';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss']
})
export class CompanyAddComponent implements OnInit {

  company: Company = {
    name: "",
  };

  submitted = false;

  constructor(private readonly companyService: CompanyService) { }

  ngOnInit(): void {
  }

  saveCompany(): void {
    this.companyService.addCompany(this.company).subscribe(
      response => {
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    )
  }

  newCompany(): void {
    this.submitted = false;
    this.company = {
      name: '',
    }
  }

}

