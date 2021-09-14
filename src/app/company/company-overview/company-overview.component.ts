import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyAddComponent } from '../company-add/company-add.component';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit, OnChanges {

  companyList: Company[] = [];
  // sortedData: Company[];
  displayedColumns: string[] = ['id', 'name', 'add'];
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  
  @Input()
  company!: Company;


  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  
  
  
  constructor( private readonly companyService: CompanyService, public dialog: MatDialog) {
    //this.sortedData = this.companyList.slice();
   }

  
  ngOnInit(): void {
    this.getCompanies();
    this.getData;
  }
  
  
  ngOnChanges(): void {
  console.log(this.company);
  }
  
  getData() {
    this.companyService.getCompanies(this.pageSize, this.pageIndex+1).subscribe(
      (result: Company[]) => {
        //console.log("J'ai reçu les computers suivantes ", result);
          this.companyList = result;
      },
      (error) => {
        console.log("Il y a eu une erreur lors du chargement des données")
    }
    );
    this.companyService.countCompanies().subscribe(
      (result: Number) => {this.length = result.valueOf();}
    );
  }

  getCompanies(): void {
    this.companyService.getCompanies(this.pageSize, this.pageIndex+1).subscribe(
      (result: Company[]) => {
        this.companyList = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCompanies(id: number): void {
    this.companyService.deleteCompany(id).subscribe(
      response => {
        this.getCompanies();
      },
      error => {
        console.log("je suis nulle");
      }
    )
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(CompanyAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
   
 
    pageEvent!: PageEvent;

    getServerData(pageEvent:PageEvent) : PageEvent{
      this.pageSize = pageEvent.pageSize;
      this.length = pageEvent.length;
      this.getData();
      return pageEvent;
    } }
     /*
    sortData(sort: Sort) {
    const data = this.companyList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
  
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

   


    <mat-paginator [length]="length" //nbre companie
  [pageIndex]="pageIndex" // l'index de la page courante
  [pageSize]="pageSize" // taille de la page actuelle
  [pageSizeOptions]="pageSizeOptions"
  (page)="pageEvent = getServerData($event)" // pageevent event qui permet d'actualiser les données suite à une action de l'utilisateur
  aria-label="Select page">

matSort (matSortChange)="sortData($event)"

</mat-paginator>
*/

  

