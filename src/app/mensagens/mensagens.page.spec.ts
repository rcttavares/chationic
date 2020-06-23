import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MensagensPage } from './mensagens.page';

describe('MensagensPage', () => {
  let component: MensagensPage;
  let fixture: ComponentFixture<MensagensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MensagensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
