import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../../model/company.model';

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

  constructor(private readonly companyService: CompanyService, public dialogRef: MatDialogRef<CompanyAddComponent>, @Inject(MAT_DIALOG_DATA) public data: Company, private router: Router) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }




saveCompany(): void {
  const data = {
    name: this.company.name,
  };
  
  if (!data.name) {
    alert('Please add a name');
    return;
  }

  this.companyService.addCompany(this.company).subscribe(
    response => {
      this.submitted = true;
      
    },
    error => {
      console.log("il y a un souci dans le post");
    }
  )
  
}

redirect(): void {
  console.log("il se passe un truc");
  this.router.navigateByUrl('/companies');
}

}