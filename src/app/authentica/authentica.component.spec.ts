import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticaComponent } from './authentica.component';

describe('AuthenticaComponent', () => {
  let component: AuthenticaComponent;
  let fixture: ComponentFixture<AuthenticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
