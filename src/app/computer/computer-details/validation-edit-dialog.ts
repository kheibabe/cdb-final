import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'validation-edit-dialog',
    templateUrl: 'validation-edit-dialog.html',
  })
  export class ValidationEditDialogContent implements OnInit {

    
    
    constructor(public dialogRef : MatDialogRef<ValidationEditDialogContent>){}
   
    ngOnInit(): void {        
    }

    onClickCancel(){
        this.dialogRef.close(false);
    }

    onClickEdit(){
        this.dialogRef.close(true);
    }
  }
  