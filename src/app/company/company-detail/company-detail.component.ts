import { Component, Inject, Input, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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


  @Input() childCompany : Company | undefined;
  anyP : any;
  company!: Company;
  message = '';
  id! : number;
  
  constructor(public dialogRef : MatDialogRef<CompanyDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: Company, private readonly companyService: CompanyService,
    private route: ActivatedRoute,  public dialog: MatDialog) {
      this.anyP = {...data}
      this.company = this.anyP.company;
      console.log(this.company)

  }

  ngOnInit(): void {
    console.log("mon id : "+this.company.id)
    this.id = this.company.id != undefined ? this.company.id : 0,
    this.getCompany(this.id);
    this.message = '';
  }

  getCompany(id: number): void {
    this.companyService.getCompany(id).subscribe(
      (result: Company) => {
        this.company = {
          id,
          name: result.name,
        };
        this.company = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

 
  onClickCancel(){
    this.dialogRef.close(false);
}

onClickEdit(){
    this.dialogRef.close(this.company);
}

}





