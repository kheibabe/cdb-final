import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../../model/company.model';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})



export class CompanyDetailComponent implements OnInit {



  company: Company = {
    name: '',
  };
  message = '';
  
  constructor(private readonly companyService: CompanyService,
    private route: ActivatedRoute,  public dialog: MatDialog) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.getCompany(id);
    this.message = '';
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

 

  openDialog() {
    const dialogRef = this.dialog.open(EditCompanyComponent, { width: '250px', data: {company: {id: this.company.id, name: this.company.name}}     });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }


   

}





