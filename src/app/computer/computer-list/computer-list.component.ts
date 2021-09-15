import { Output, EventEmitter, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ComputerService } from 'src/app/services/computer.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Computer } from '../../model/computer.model';
import { Router } from '@angular/router';
import { AuthInfos } from 'src/app/shared/auth-infos.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogContent } from './dialog-content';


@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  adminRights = false;
  setAdminRights(){
    let info = this.authInfo.user?.authority;
    if( info != undefined){
      if(info == 'ADMIN'){
        this.adminRights = true;
      } else { 
        this.adminRights = false;
      }
      //console.log(info)
    } else {
      //console.log('undefined rights')
    }
    
  }

  removable = false;
  selectAllCheckbox = false;


  listIdPage : Number[] =[];
  deleteListId : Number[]= [];

  testInitList(){
    if(this.searchword != '' || this.pageEvent?.previousPageIndex != this.pageEvent?.pageIndex || this.listIdPage.length != this.computerList.length ){
      this.deleteListId = [];
      this.intialisationListCheckbox(this.computerList.length)
    }
  }

  intialisationListCheckbox(size: number){
    //console.log("initialisarion list");
    for(let j = 0; j< size; j++){
      this.listIdPage[j]= this.computerList[j].id!;
      //console.log(this.listIdPage[j]);
    }
    
  }

  testIdInDeleteList(id: number) : boolean {
    //console.log("deleteList "+this.deleteListId)
    for(let j = 0; j<this.deleteListId.length; j++){
      if(this.deleteListId[j]== id){
        return true;
      }
    }
    return false;
  }

  changeValueCheckbox(id: number){
    //console.log("change value"+id)
    let inList = -1;
    for(let j = 0; j<this.deleteListId.length; j++){
      if(this.deleteListId[j]== id){
        inList = j;
      }
    }
    if(inList != -1){
      this.deleteListId = this.deleteListId.slice(0,inList-1).concat(this.deleteListId.slice(inList+1,this.deleteListId.length));
    }else {
      this.deleteListId.push(id)
    }
  }

  testAllCheckboxtrue(){
    if(this.deleteListId.length == this.listIdPage.length) {
      this.selectAllCheckbox = true;
    }
  }
  
  selectAllCheckboxs(){
    this.deleteListId = [];
    this.selectAllCheckbox=!this.selectAllCheckbox
    if(this.selectAllCheckbox){
      for(let i=0; i<this.listIdPage.length; i++){
        this.deleteListId.push(this.listIdPage[i])
      }
    }
    
    //console.log(this.deleteListId)
  }

  
  deleteComputers(){
    const dialogRef = this.dialog.open(DialogContent, {
      width: '250px',
      data :{value: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
      for(let i=0; i< this.deleteListId.length; i++){
        //console.log(this.deleteListId[i]);
        this.computerService.deleteComputer(this.deleteListId[i]).subscribe(
          response => {
            this.getData();
            this.intialisationListCheckbox(this.computerList.length);
            this.deleteListId =  [];
          } ,
           error => {
             console.log("delete not worked");
           }
        );
      } 
    }
    });

    
  }

    addComputer(){
      this.searchword='';
      this.getData();
      this.intialisationListCheckbox(this.computerList.length);
      this.setAdminRights();
     this.displayedColumns = this.adminRights ? ['id','name','introduced','discontinued','company'] :['name','introduced','discontinued','company'];
 
      this.router.navigateByUrl('/computer/add');
  }

  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  computerList : Computer[] = [];

  length = 0;
  pageSize = 10; 
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 50, 100];
  widthSearch = (window.innerWidth - 400 )/2;
  widthTable = 400;

  order = 'computer.id';
  direction = 'asc';
  searchword = '';

  displayedColumns: any;

  constructor(public dialog: MatDialog, private authInfo: AuthInfos, private computerService: ComputerService, private router: Router) { }
 

  ngOnInit(): void {
    this.searchword='';
    this.getData();
    this.intialisationListCheckbox(this.computerList.length);
    this.setAdminRights();
    this.displayedColumns = this.adminRights ? ['id','name','introduced','discontinued','company'] :['name','introduced','discontinued','company'];
  }

 


 getData() {
  this.computerService.getComputers(this.pageSize, this.pageIndex+1, this.direction, this.order, this.searchword).subscribe(
    (result: Computer[]) => {
      //console.log("J'ai reçu les computers suivantes ", result);
        this.computerList = result;
    },
    (error) => {
      console.log("Il y a eu une erreur lors du chargement des données")
  }
  );

  this.computerService.countComputersSearch(this.searchword).subscribe(
    (result: Number) => {this.length = result.valueOf();}
  );
}


// MatPaginator Output
  pageEvent?: PageEvent;

  public getServerData(pageEvent:PageEvent) : PageEvent{
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.length = pageEvent.length;
    this.getData();
    this.intialisationListCheckbox(this.computerList.length);
    this.deleteListId = [];
    this.selectAllCheckbox = false;
    return pageEvent;
  }

  setOrderBy(direction: string, order: string) {
    //console.log("je veux order");
    this.pageIndex = 0;
    this.direction = direction;
    this.order = order;
    this.computerService.getComputersOrdered(direction, order, this.pageSize).subscribe(
      (result: Computer[]) => {
        //console.log("J'ai reçu les computers suivantes order", result);
          this.computerList = result;
      },
      (error) => {
        console.log("Il y a eu une erreur lors du chargement des données avec order")
    }
    );
    this.computerService.countComputersSearch(this.searchword).subscribe(
      (result: Number) => {this.length = result.valueOf();}
    );
    switch(order){
      case 'computer.name': {
        if(direction == 'asc'){
          this.CpNameASC = true;
          this.CpNameDESC = false, this.CpIntASC = false, this.CpIntDESC = false;
          this.CpDiscASC = false, this.CpDiscDESC = false, this.CnyNameASC = false, this.CnyNameDESC = false;
        } else {
          this.CpNameDESC = true
          this.CpNameASC = false, this.CpIntASC = false, this.CpIntDESC = false;
          this.CpDiscASC = false, this.CpDiscDESC = false, this.CnyNameASC = false, this.CnyNameDESC = false;
        }
        break;
      }
      case 'computer.introduced':{
        if(direction == 'asc'){
          this.CpIntASC = true;
          this.CpNameASC = false, this.CpNameDESC = false, this.CpIntDESC = false;
          this.CpDiscASC = false, this.CpDiscDESC = false, this.CnyNameASC = false, this.CnyNameDESC = false;
        } else {
          this.CpIntDESC = true
          this.CpNameASC = false, this.CpNameDESC = false, this.CpIntASC = false,
          this.CpDiscASC = false, this.CpDiscDESC = false, this.CnyNameASC = false, this.CnyNameDESC = false;
        }
        break;
      }
      case 'computer.discontinued':{
        if(direction == 'asc'){
          this.CpDiscASC = true;
          this.CpNameASC = false, this.CpNameDESC = false, this.CpIntASC = false, this.CpIntDESC = false;
          this.CpDiscDESC = false, this.CnyNameASC = false, this.CnyNameDESC = false;
        } else {
          this.CpDiscDESC = true
          this.CpNameASC = false, this.CpNameDESC = false, this.CpIntASC = false, this.CpIntDESC = false;
          this.CpDiscASC = false, this.CnyNameASC = false, this.CnyNameDESC = false;
        }
        break;
      }
      case 'company.name':{
        if(direction == 'asc'){
          this.CnyNameASC = true;
          this.CpNameASC = false, this.CpNameDESC = false, this.CpIntASC = false, this.CpIntDESC = false;
          this.CpDiscASC = false, this.CpDiscDESC = false, this.CnyNameDESC = false;
        } else {
          this.CnyNameDESC = true
          this.CpNameASC = false, this.CpNameDESC = false, this.CpIntASC = false, this.CpIntDESC = false;
          this.CpDiscASC = false, this.CpDiscDESC = false, this.CnyNameASC = false;
        }
        break;
      }
    }

  }

  searchThis(){

    if(this.searchword) {
      this.removable = true;
    } else {
      this.removable = false;
    }

    this.intialisationListCheckbox(this.computerList.length);
    this.deleteListId = [];
    this.selectAllCheckbox = false;
    //console.log(this.searchword);
    this.computerService.getComputersSearch(this.searchword).subscribe(
      (result: Computer[]) => {
        //console.log("J'ai reçu les computers suivantes search ", result);
          this.computerList = result;
      },
      (error) => {
        console.log("Il y a eu une erreur lors du chargement des données avec order")
    }
    );
    this.computerService.countComputersSearch(this.searchword).subscribe(
      (result: Number) => {this.length = result.valueOf();}
    );
  }

  //supprimer le mot écrit dans la barre de recherche
  removeSearch(): void {
    this.removable = false;
    this.searchword = '';
    //console.log("je veux tout");
    this.pageIndex=0;
    this.pageSize=10;
    this.computerService.getComputersSearch(this.searchword).subscribe(
      (result: Computer[]) => {
        //console.log("J'ai reçu les computers suivantes search ", result);
          this.computerList = result;
      },
      (error) => {
        console.log("Il y a eu une erreur lors du chargement des données avec order")
    }
    );
    this.computerService.countComputersSearch(this.searchword).subscribe(
      (result: Number) => {this.length = result.valueOf();}
    );
    }


    CpNameASC = false;
    CpNameDESC = false;
    CpIntASC = false;
    CpIntDESC = false;
    CpDiscASC = false;
    CpDiscDESC = false;
    CnyNameASC = false;
    CnyNameDESC = false;



}
