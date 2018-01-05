import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteptabsComponent } from './steptabs.component';

describe('SteptabsComponent', () => {
  let component: SteptabsComponent;
  let fixture: ComponentFixture<SteptabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteptabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteptabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
