import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  nameCompany = "";
  company! : Company;
  submitted = false;

  constructor(private readonly companyService: CompanyService, public dialogRef: MatDialogRef<EditCompanyComponent>, @Inject(MAT_DIALOG_DATA) public data: Company, private router: Router, private route: ActivatedRoute) { }

  companyEdit! : Company

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.companyService.getCompany(id).subscribe(
      (result: Company) => {
        this.nameCompany = this.companyEdit.name;
        console.log(this.companyEdit.name)
      },
      (error) => {
        console.log("putain encore loupé")
      }
    )
  }





  onNoClick(): void {
    this.dialogRef.close();
  }

 



editCompany() {
  this.company = {
    name : this.nameCompany,
  }
  
  this.companyService.updateCompany(this.company)
    .subscribe(
      response => {
        this.submitted = true;
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
