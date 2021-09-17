import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComputerService } from 'src/app/services/computer.service';
import { CompanyService } from 'src/app/services/company.service'
import { Computer } from 'src/app/model/computer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Company } from 'src/app/model/company.model';
import { CDBDate } from 'src/app/model/date.enum';
import { MatDialog } from '@angular/material/dialog';
import { ValidationAddDialogContent } from './validation-add-dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-computer-component',
  templateUrl: './new-computer.component.html',
  styleUrls: ['./new-computer.component.scss']
})
export class NewComputerComponent implements OnInit {

  isLinear = true;
  isOptional = true;
  firstFormGroup!: FormGroup;
  nameComputer = '';
  secondFormGroup!: FormGroup;
  dateIntroduced = new Date();
  thirdFormGroup!: FormGroup;
  dateDiscontinued = new Date();
  fourthFormGroup!: FormGroup;
  companySelect!: any;
  companyName = '';

  companyList: Company[] = []
  computerAdd!: Computer;
  companyId!: number;
  initDate = new Date();
  todayDate: Date = new Date();
  firstDate: Date = new Date();


  isDiscontinuedDate = true;
  isIntroducedDate = true;

  public get cdbDate(): typeof CDBDate {
    return CDBDate;
  }

  constructor(private translate: TranslateService, private router: Router,public dialog: MatDialog, private _formBuilder: FormBuilder, private route: ActivatedRoute, private computerService: ComputerService, private companyService: CompanyService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

    this.firstDate.setDate(7);
    this.firstDate.setMonth(7);
    this.firstDate.setFullYear(1944);
    this.dateIntroduced.setDate(this.dateIntroduced.getDate() + 1);
    this.dateDiscontinued.setDate(this.dateDiscontinued.getDate() + 1);
    this.initDate.setDate(this.initDate.getDate() + 1);

    this.companyService.getCompaniesAll().subscribe(
      (result: Company[]) => {
        //console.log(this.companyList)
        this.companyList = result;
      },
      (error) => {
        console.log("Il y a eu une erreur lors du chargement des données de companyList")
      }
    )

  }

  newDate(date: Date, type : string) : string{
    if(type == 'introduced'){
      this.isIntroducedDate = false;
    } else{
      this.isDiscontinuedDate = false
    }
    return this.getAllDate(date);
  }

  getAllDate(date: Date): string {
    return date.getDate() + ' ' + this.getMonth(date.getMonth()) + ' ' + date.getFullYear();
  }

  getMonth(month: number): String {
    var monthsfr = new Array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
    var monthsen = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
    if(this.translate.currentLang == 'fr'){
      return monthsfr[month];
    } else {
      return monthsen[month];
    }
    
  }



  onChange() {
    let id = this.companySelect;
    for (let i = 0; i < this.companyList.length; i++) {
      if (this.companyList[i].id == id) {
        this.companySelect = this.companyList[i];
        this.companyName = this.companyList[i].name;
        this.companyId = id;
      }
    }

  }

  addComputer() {
    const dialogRef = this.dialog.open(ValidationAddDialogContent, {
     
      data :{value: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.dateIntroduced.setDate(this.dateIntroduced.getDate() + 1);
        this.dateDiscontinued.setDate(this.dateDiscontinued.getDate() + 1);
        this.computerAdd = {
          name: this.nameComputer,
          introduced: this.dateIntroduced.toISOString().split("T")[0],
          discontinued: this.dateDiscontinued.toISOString().split("T")[0],
          company: {
            id: this.companyId,
            name: this.companyName
          }
    
        }
        if (this.isIntroducedDate)
        {
          this.computerAdd.introduced = "";
        }
        if (this.isDiscontinuedDate)
        {
          this.computerAdd.discontinued = "";
        }
        console.log(this.computerAdd);
        this.computerService.addComputer(this.computerAdd).subscribe();
        this.router.navigateByUrl('/computers');
    }
    });

    

  } 

    removeDate(cdbDate : CDBDate){

    switch(cdbDate){
      case CDBDate.INTRODUCED:
        this.dateIntroduced.setDate(this.initDate.getDate());
        this.isIntroducedDate = true;
        this.dateDiscontinued.setDate(this.initDate.getDate());
        this.isDiscontinuedDate = true;
        break;
      case CDBDate.DISCONTINUED :
        this.dateDiscontinued.setDate(this.initDate.getDate());
        this.isDiscontinuedDate = true;
        break;

    }

  }

  redirect(){
    this.router.navigateByUrl('/computers')
  }
}