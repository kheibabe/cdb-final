import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/services/computer.service';
import { CompanyService } from 'src/app/services/company.service'
import { Computer } from '../model/computer.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Company } from 'src/app/company/company.model';

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent implements OnInit {

  isLinear = true;
  isOptional = true;
  firstFormGroup!: FormGroup;
  nameComputer = '';
  secondFormGroup!: FormGroup;
  dateIntroduced = new Date();
  thirdFormGroup!: FormGroup;
  dateDiscontinued = new Date();
  fourthFormGroup!: FormGroup;
  computer!: Computer;
  companyList : Company[] = []
  computerAdd!: Computer;

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


    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
        
        this.companyList = result;
      }, 
      (error) => {
        console.log("Il y a eu une erreur lors du chragement des données de companyList")
    }
    )

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.computerService.getComputerById(id).subscribe(
      (result: Computer) => {
        console.log("J'ai reçu les recettes suivantes ", result);
          this.computer = result;
      },
      (error) => {
          console.log("Il y a eu une erreur lors du chragement des données")
      }
    );
  }

  updateComputerAdd(){
    console.log("update");
    this.computerAdd = { id: 0,
      name: this.nameComputer,
      introduced: this.dateIntroduced,
      discontinued: this.dateDiscontinued,
      company: {
        name: this.fourthFormGroup.value,
      }
    }
  }
  addComputer(){
    
    console.log(this.computerAdd+" "+this.computerAdd.company.name);
    /*this.computerService.addComputer(this.computerAdd).subscribe(

    );*/

  }

}
