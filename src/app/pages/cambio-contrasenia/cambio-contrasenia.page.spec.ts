import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioContraseniaPage } from './cambio-contrasenia.page';

describe('CambioContraseniaPage', () => {
  let component: CambioContraseniaPage;
  let fixture: ComponentFixture<CambioContraseniaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CambioContraseniaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
