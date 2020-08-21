import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchproductComponent } from './searchproduct.component';

describe('SearchproductComponent', () => {
  let component: SearchproductComponent;
  let fixture: ComponentFixture<SearchproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchproductComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
