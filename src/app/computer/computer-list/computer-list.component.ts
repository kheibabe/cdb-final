import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ComputerService } from 'src/app/services/computer.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Computer } from '../../model/computer.model';
import { style } from '@angular/animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  adminRights = true;
  setAdminRights(){
    this.adminRights = true;
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
    console.log("deleteList "+this.deleteListId)
    for(let j = 0; j<this.deleteListId.length; j++){
      if(this.deleteListId[j]== id){
        return true;
      }
    }
    return false;
  }

  changeValueCheckbox(id: number){
    console.log("change value"+id)
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
    
    console.log(this.deleteListId)
  }

  deleteComputers(){
    console.log("delete "+this.deleteListId)
    for(let i=0; i< this.deleteListId.length; i++){
      console.log(this.deleteListId[i]);
      this.computerService.deleteComputer(this.deleteListId[i]).subscribe(
        response => {
          this.getData();
          this.intialisationListCheckbox(this.computerList.length);
          this.deleteListId =  [];
        } ,
         error => {
           console.log("delete not worked0");
         }
      );
    }
  }

  addComputer(){
    this.router.navigateByUrl('/computer/add');
  }

  displayedColumns = this.adminRights ? ['id','name','introduced','discontinued','company'] :['name','introduced','discontinued','company'];

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

  constructor(private computerService: ComputerService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
    this.intialisationListCheckbox(this.computerList.length);
  }


 getData() {
  this.computerService.getComputers(this.pageSize, this.pageIndex+1, this.direction, this.order, this.searchword).subscribe(
    (result: Computer[]) => {
      //console.log("J'ai reçu les computers suivantes ", result);
        this.computerList = result;
    },
    (error) => {
      console.log("Il y a eu une erreur lors du chragement des données")
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
        console.log("Il y a eu une erreur lors du chragement des données avec order")
    }
    );
    this.computerService.countComputersSearch(this.searchword).subscribe(
      (result: Number) => {this.length = result.valueOf();}
    );
  }

  searchThis(){
    this.removable=true;
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
        console.log("Il y a eu une erreur lors du chragement des données avec order")
    }
    );
    this.computerService.countComputersSearch(this.searchword).subscribe(
      (result: Number) => {this.length = result.valueOf();}
    );
  }

  //supprimer le mot écrit dans la barre de recherche
  removeChips(): void {
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
        console.log("Il y a eu une erreur lors du chragement des données avec order")
    }
    );
    this.computerService.countComputersSearch(this.searchword).subscribe(
      (result: Number) => {this.length = result.valueOf();}
    );
    }




}
