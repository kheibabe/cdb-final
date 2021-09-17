import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComputerService } from 'src/app/services/computer.service';
import { CompanyService } from 'src/app/services/company.service'
import { Computer } from 'src/app/model/computer.model';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms'
import { Company } from 'src/app/model/company.model';
import { CDBDate } from 'src/app/model/date.enum';
import { MatDialog } from '@angular/material/dialog';
import { ValidationEditDialogContent } from './validation-edit-dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent implements OnInit {

  isLinear = true;
  isOptional = true;
  firstFormGroup!: FormGroup;
  idComputer: number = 0;
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

  constructor(private translate : TranslateService, private router: Router, public dialog: MatDialog, private _formBuilder: FormBuilder, private route: ActivatedRoute, private computerService: ComputerService, private companyService: CompanyService) { }

  computerEdit!: Computer;
  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.computerService.getComputerById(id).subscribe(
      (result: Computer) => {
        //console.log("J'ai reçu les computers suivantes ", result);
        this.computerEdit = result;
        this.idComputer = this.computerEdit.id?.valueOf() == undefined ? 0 : this.computerEdit.id.valueOf();
        this.nameComputer = this.computerEdit.name;
        this.dateIntroduced = this.computerEdit.introduced != null ? this.setNewDate(this.computerEdit.introduced.toString()) : this.initDate;
        this.dateDiscontinued = this.computerEdit.discontinued != null ? this.setNewDate(this.computerEdit.discontinued.toString()) : this.initDate;
        this.companySelect = this.computerEdit.company.name;
        this.companyName = this.computerEdit.company.name;

      },
      (error) => {
        console.log("Il y a eu une erreur lors du chargement des données")
      }
    );

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

        this.companyList = result;
      },
      (error) => {
        console.log("Il y a eu une erreur lors du chargement des données de companyList")
      }
    )

  }

  setNewDate(date: String): Date {
    console.log(date)
    date = date + '-'
    let dateTmp = new Date();
    let tmp = ''
    let count = 0;
    let year = '';
    let month = '';
    let day = '';
    for (let j = 0; j < date.length; j++) {

      if (date[j] == '-') {
        if (count == 0) {
          year = tmp;
        }
        if (count == 1) {
          month = tmp;
        }
        if (count == 2) {
          day = tmp;
        }
        tmp = '';
        count++;
      }
      else {
        tmp = tmp + date[j];
      }

    }
    console.log('day : '+day+', month : '+month+', year : '+year)
    
    dateTmp.setFullYear(parseInt(year))
    dateTmp.setMonth(parseInt(month)-1)
    dateTmp.setDate(parseInt(day))
    console.log(dateTmp)
    return dateTmp;

  }

  newDate(date: Date, type: string): string {
    if (type == 'introduced') {
      this.isIntroducedDate = false;
    } else {
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

  editComputer() {
    const dialogRef = this.dialog.open(ValidationEditDialogContent, {
      width: '250px',
      data: { value: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.dateIntroduced.setDate(this.dateIntroduced.getDate() + 1);
        this.dateDiscontinued.setDate(this.dateDiscontinued.getDate() + 1);
        this.computerAdd = {
          id: this.idComputer,
          name: this.nameComputer,
          introduced: this.dateIntroduced.toISOString().split("T")[0],
          discontinued: this.dateDiscontinued.toISOString().split("T")[0],
          company: {
            id: this.companyId,
            name: this.companyName
          }

        }
        if (this.isIntroducedDate) {
          this.computerAdd.introduced = "";
        }
        if (this.isDiscontinuedDate) {
          this.computerAdd.discontinued = "";
        }
        console.log(this.computerAdd);
        this.computerService.editComputer(this.computerAdd).subscribe();
        this.router.navigateByUrl('/computers');
      }
    });

  }

  removeDate(cdbDate: CDBDate) {

    switch (cdbDate) {
      case CDBDate.INTRODUCED:
        this.dateIntroduced.setDate(this.initDate.getDate());
        this.dateIntroduced.setMonth(this.initDate.getMonth())
        this.dateIntroduced.setFullYear(this.initDate.getFullYear())
        this.isIntroducedDate = true;
        this.dateDiscontinued.setDate(this.initDate.getDate());
        this.dateDiscontinued.setMonth(this.initDate.getMonth())
        this.dateDiscontinued.setFullYear(this.initDate.getFullYear())
        this.isDiscontinuedDate = true;
        break;
      case CDBDate.DISCONTINUED:
        this.dateDiscontinued.setDate(this.initDate.getDate());
        this.dateDiscontinued.setMonth(this.initDate.getMonth())
        this.dateDiscontinued.setFullYear(this.initDate.getFullYear())
        this.isDiscontinuedDate = true;
        break;

    }

  }

  redirect(){
    this.router.navigateByUrl('/computers')
  }

}
