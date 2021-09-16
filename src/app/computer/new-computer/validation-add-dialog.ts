import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'validation-add-dialog',
    templateUrl: 'validation-add-dialog.html',
  })
  export class ValidationAddDialogContent implements OnInit {

    
    
    constructor(public dialogRef : MatDialogRef<ValidationAddDialogContent>){}
   
    ngOnInit(): void {        
    }

    onClickCancel(){
        this.dialogRef.close(false);
    }

    onClickAdd(){
        this.dialogRef.close(true);
    }
  }
  