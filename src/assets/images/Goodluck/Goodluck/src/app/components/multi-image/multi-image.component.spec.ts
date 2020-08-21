import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultiImageComponent } from './multi-image.component';

describe('MultiImageComponent', () => {
  let component: MultiImageComponent;
  let fixture: ComponentFixture<MultiImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiImageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultiImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
