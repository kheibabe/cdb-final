import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/computer.service';
import { Computer } from '../model/computer.model';

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent implements OnInit {

  computer!: Computer;

  constructor(private route : ActivatedRoute, private computerService : ComputerService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.computerService.getComputerById(id).subscribe(
      (result: Computer) => {
        console.log("J'ai reçu les recettes suivantes ", result);
          this.computer = result;
      },
      (error) => {
          console.log("Il y a eu une erreur lors du chragement des données")
      }
    );
  }
}
