import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../../model/company.model';
import { MOCK_COMPANY } from '../mock/company.mock';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit, OnChanges {

  companyList: Company[] = [];
  displayedColumns: string[] = ['id', 'name', 'add'];
  
  
  @Input()
  company!: Company;
  
  
  
  constructor(private readonly companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
  }
  
  
  ngOnChanges(): void {
  console.log(this.company);
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

  deleteCompanies(id: number): void {
    this.companyService.deleteCompany(id).subscribe(
      response => {
        this.getCompanies();
      },
      error => {
        console.log("je suis nulle");
      }
    )
  }
  

}






