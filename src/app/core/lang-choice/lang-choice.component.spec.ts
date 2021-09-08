import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangChoiceComponent } from './lang-choice.component';

describe('LangChoiceComponent', () => {
  let component: LangChoiceComponent;
  let fixture: ComponentFixture<LangChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
