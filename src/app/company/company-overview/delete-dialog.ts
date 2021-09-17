import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.html',
  })
  export class DeleteDialog implements OnInit {

    
    
    constructor(public dialogRef : MatDialogRef<DeleteDialog>){}
   
    ngOnInit(): void {        
    }

    onClickCancel(){
        this.dialogRef.close(false);
    }

    onClickDelete(){
        this.dialogRef.close(true);
    }
  }
  