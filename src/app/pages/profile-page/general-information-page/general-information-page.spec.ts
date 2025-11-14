import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationPage } from './general-information-page';

describe('GeneralInformationPage', () => {
  let component: GeneralInformationPage;
  let fixture: ComponentFixture<GeneralInformationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInformationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
