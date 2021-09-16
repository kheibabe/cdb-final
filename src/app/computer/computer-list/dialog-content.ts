import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'dialog-content',
    templateUrl: 'dialog-content.html',
  })
  export class DialogContent implements OnInit {

    
    
    constructor(public dialogRef : MatDialogRef<DialogContent>){}
   
    ngOnInit(): void {        
    }

    onClickCancel(){
        this.dialogRef.close(false);
    }

    onClickDelete(){
        this.dialogRef.close(true);
    }
  }
  