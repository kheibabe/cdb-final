import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Company } from '../company.model';
import { MOCK_COMPANY } from '../mock/company.mock';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit, OnChanges {

  companyList: Company[] = MOCK_COMPANY;

  @Input()
  company!: Company;

  @Output()
  delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.company);
  }

  deleteCompany(): void {
    this.delete.emit(this.company.id);
  }

}






