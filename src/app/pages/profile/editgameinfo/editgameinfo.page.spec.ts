import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgameinfoPage } from './editgameinfo.page';

describe('EditgameinfoPage', () => {
  let component: EditgameinfoPage;
  let fixture: ComponentFixture<EditgameinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditgameinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgameinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
