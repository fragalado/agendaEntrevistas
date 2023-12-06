import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCitaComponent } from './detalle-cita.component';

describe('DetalleCitaComponent', () => {
  let component: DetalleCitaComponent;
  let fixture: ComponentFixture<DetalleCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleCitaComponent]
    });
    fixture = TestBed.createComponent(DetalleCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
