import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogTypesComponent } from './dog-types.component';

describe('DogTypesComponent', () => {
  let component: DogTypesComponent;
  let fixture: ComponentFixture<DogTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
