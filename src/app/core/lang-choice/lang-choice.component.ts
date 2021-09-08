import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-choice',
  templateUrl: './lang-choice.component.html',
  styleUrls: ['./lang-choice.component.scss']
})
export class LangChoiceComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
