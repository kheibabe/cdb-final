import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  company: Company = {
    name: "",
  };

  submitted = false;

  constructor(private readonly companyService: CompanyService, public dialogRef: MatDialogRef<EditCompanyComponent>, @Inject(MAT_DIALOG_DATA) public data: Company, private router: Router) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }






editCompany(): void {
  //this.message = '';

  this.companyService.updateCompany(this.company.id, this.company)
    .subscribe(
      response => {
        console.log(response);
        //this.message = response.message ? response.message : 'This tutorial was updated successfully!';
      },
      error => {
        console.log(error);
      });
}

redirect(): void {
  console.log("il se passe un truc");
  this.router.navigateByUrl('/companies');
}
}
