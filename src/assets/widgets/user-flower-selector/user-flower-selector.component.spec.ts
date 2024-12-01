import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFlowerSelectorComponent } from './user-flower-selector.component';

describe('UserFlowerSelectorComponent', () => {
  let component: UserFlowerSelectorComponent;
  let fixture: ComponentFixture<UserFlowerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFlowerSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFlowerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
