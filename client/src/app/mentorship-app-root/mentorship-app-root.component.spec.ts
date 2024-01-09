import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipAppRootComponent } from './mentorship-app-root.component';

describe('MentorshipAppRootComponent', () => {
  let component: MentorshipAppRootComponent;
  let fixture: ComponentFixture<MentorshipAppRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorshipAppRootComponent]
    });
    fixture = TestBed.createComponent(MentorshipAppRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
