import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../../model/company.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})



export class CompanyDetailComponent implements OnInit {


  company: Company | null = null;
  constructor(private readonly companyService: CompanyService,
    private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.getCompany(id);
  }

  getCompany(id: number): void {
    this.companyService.getCompany(id).subscribe(
      (result: Company) => {
        this.company = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}





