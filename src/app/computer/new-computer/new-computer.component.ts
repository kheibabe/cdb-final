import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/services/computer.service';
import { CompanyService } from 'src/app/services/company.service'
import { Computer } from '../model/computer.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Company } from 'src/app/company/company.model';

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
  computer!: Computer;
  companyList : Company[] = []
  computerAdd!: Computer;
  companyId!: number;
  initDate = new Date();
  todayDate:Date = new Date();
  firstDate: Date = new Date();

  constructor(private _formBuilder: FormBuilder, private route : ActivatedRoute, private computerService : ComputerService, private companyService : CompanyService) {}
  
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
    this.dateIntroduced.setDate(this.dateIntroduced.getDate()+1);
    this.dateDiscontinued.setDate(this.dateDiscontinued.getDate()+1);
    this.initDate.setDate(this.initDate.getDate()+1);

    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
        
        this.companyList = result;
      }, 
      (error) => {
        console.log("Il y a eu une erreur lors du chragement des données de companyList")
    }
    )

  } 

  getDate(date: Date) : String{
    return date.getDate() + ' ' + this.getMonth(date.getMonth()) + ' ' + date.getFullYear() ;
  } 

  getMonth(month : number) : String{
    var months  = new Array ('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
    return months[month];
  }
   


  onChange(){
    let id =  this.companySelect;
    for(let i = 0; i<this.companyList.length; i++){
      if( this.companyList[i].id == id){
        this.companySelect = this.companyList[i];
        this.companyId = id;
      }
    }

  }

  addComputer(){
    this.computerAdd = {
      name : this.nameComputer,
      introduced : this.dateIntroduced,
      discontinued : this.dateDiscontinued,
      company : {
        id : this.companyId,
        name : this.companySelect
      }

    }
    console.log(this.computerAdd);
    //this.computerService.addComputer(this.computerAdd).subscribe(
//demander à Kheira pour comment s'en servir
    //);

  }

}
