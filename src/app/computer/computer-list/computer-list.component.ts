import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../services/computer.service';
import { Computer } from '../model/computer.model';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  computerList : Computer[] = [];

  constructor(private computerService: ComputerService) { }

  ngOnInit(): void {
    this.computerService.getComputers().subscribe(
      (result: Computer[]) => {
        console.log("J'ai reçu les computers suivantes ", result);
          this.computerList = result;
      },
      (error) => {
        console.log("Il y a eu une erreur lors du chragement des données")
    }
    );
  }

}
