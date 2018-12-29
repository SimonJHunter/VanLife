import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNosuchsiteComponent } from './site-nosuchsite.component';

describe('SiteNosuchsiteComponent', () => {
  let component: SiteNosuchsiteComponent;
  let fixture: ComponentFixture<SiteNosuchsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteNosuchsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteNosuchsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
