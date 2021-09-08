import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ComputerService } from 'src/app/services/computer.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Computer } from '../model/computer.model';
import { style } from '@angular/animations';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {
  hiddenId = false;

  displayedColumns = this.hiddenId ? ['id','name','introduced','discontinued','company'] :['name','introduced','discontinued','company'];

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


  constructor(private computerService: ComputerService) { }

  ngOnInit(): void {
    this.getData();
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
    return pageEvent;
  }

  setOrderBy(direction: string, order: string) {
    console.log("je veux order");
    this.pageIndex = 0;
    this.direction = direction;
    this.order = order;
    this.computerService.getComputersOrdered(direction, order).subscribe(
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
    console.log(this.searchword);
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
