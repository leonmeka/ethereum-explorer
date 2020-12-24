import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinInformationComponent } from './coin-information.component';

describe('CoinInformationComponent', () => {
  let component: CoinInformationComponent;
  let fixture: ComponentFixture<CoinInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
