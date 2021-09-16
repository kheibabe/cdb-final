import { AfterViewInit, Component, EventEmitter, HostListener, Inject, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { AuthInfos } from 'src/app/shared/auth-infos.model';
import { CompanyAddComponent } from '../company-add/company-add.component';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit, AfterViewInit, OnChanges {

  companyList: Company[] = [];
  
  
  // sortedData: Company[];
  displayedColumns: any;
  dataSource = new MatTableDataSource(this.companyList)

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  
  @Input()
  company!: Company;

 
  adminRights = false;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  searchword = '';
  removable = false;
  order = 'company.id';
  direction = 'asc';
  
 
  
  constructor( private readonly companyService: CompanyService, public dialog: MatDialog, private authInfos : AuthInfos) {
    // const company = Array.from({length: 100}, (_, k) => this.createNewCompany(k + 1));
    //this.dataSource = new MatTableDataSource(this.companyList);
    //this.sortedData = this.companyList.slice();
   }

  

  ngOnInit(): void {
    this.getCompanies();
    this.getData();
    console.log(this.authInfos.authenticated);
    console.log(this.authInfos.user?.authority);
    console.log(this.dataSource.sort)
    this.setAdminRights();
    this.displayedColumns = !this.adminRights ? ['name'] : ['id','name','add']; 

  }

   ngAfterViewInit() {
     console.log(this.dataSource.sort);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnChanges(): void {
  console.log(this.company);
  }

  setAdminRights() {
    let infos = this.authInfos.user?.authority;
    if (infos == 'ADMIN') {
      this.adminRights = true;
    } 
    else {
      this.adminRights = false;
    }
  }

  
  getData() {
    this.companyService.getCompanies(this.pageSize, this.pageIndex+1).subscribe(
      (result: Company[]) => {
        console.log("J'ai reçu les computers suivantes ", result);
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

  pageEvent!: PageEvent;

    getServerData(pageEvent:PageEvent) : PageEvent{
      this.pageIndex = pageEvent.pageIndex;
      this.pageSize = pageEvent.pageSize;
      this.length = pageEvent.length;
      this.getData();
      return pageEvent;
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
      console.log(`Dialog result: ${result}`)
    });
    this.getCompanies();
  }
   
 

    applyFilter() {
      if(this.searchword){
        this.removable = true;
      } else {
        this.removable = false ;
      }

      this.companyService.getCompaniesSearch(this.searchword).subscribe(
        (result: Company[]) => {
          console.log("Tadaaaam: ", result);
            this.companyList = result;
        },
        (error) => {
          console.log("Il y a eu une erreur lors du chargement des données avec le filter")
      }
      );
      this.companyService.countCompaniesSearch(this.searchword).subscribe(
        (result: Number) => {this.length = result.valueOf();}
      );
    }

    removeSearch(){
      this.removable = false;
      this.searchword = '';

      this.pageIndex = 0;
      this.pageSize = 10;

      this.companyService.getCompaniesSearch(this.searchword).subscribe(
        (result: Company[]) => {
          console.log("Tadaaaam: ", result);
            this.companyList = result;
        },
        (error) => {
          console.log("Il y a eu une erreur lors du chargement des données avec le remove")
      }
      );
    }

    setOrderBy(direction: string, order: string) {
      this.pageIndex = 0;
      this.direction = direction;
      this.order = order;
      this.companyService.getCompaniesOrdered(direction, order, this.pageSize).subscribe(
        (result: Company[]) => {
            this.companyList = result;
        },
        (error) => {
          console.log("Souci avec order")
      }
      );
      this.companyService.countCompaniesSearch(this.searchword).subscribe(
        (result: Number) => {this.length = result.valueOf();}
      );
    }
    
  }

  

