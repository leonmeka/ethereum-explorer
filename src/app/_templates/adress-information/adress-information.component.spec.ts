import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressInformationComponent } from './adress-information.component';

describe('AdressInformationComponent', () => {
  let component: AdressInformationComponent;
  let fixture: ComponentFixture<AdressInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
